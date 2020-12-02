import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileSize from "filesize";
import { useFormik } from "formik";
import { has, isObject, map } from "lodash";
import styled from "styled-components";

import fileSchema from "schemas/files";
import { MediaFile } from "types/media";
import { CommonAsyncState } from "types/state";

import MEDIA from "../../../../../config/app/media";
import { shortDateFormat } from "../../../../../helpers/datetime";

const DEFAULT_AUTHOR = "admin";

const FullscreenModal = styled(Modal)`
  .modal-dialog {
    margin: 0;
    max-width: 100vw;
  }

  .modal-content {
    border: none;
    border-radius: 0;
    min-height: 100vh;
    width: 100vw;
    ${(props) =>
      props.contentwidth
        ? `padding: 0 calc((100vw - ${props.contentwidth}) / 2);`
        : ""}
  }
`;

const ImageBox = styled.div<{ src: string }>`
  background-color: #616161;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 5px;
  padding-top: 56.25%;
  width: 100%;
`;

type Props = {
  add?: (value: { files: MediaFile[] }) => void;
  update?: (value: MediaFile) => void;
  files?: FileList | MediaFile;
  onHide: () => void;
  method?: "add" | "edit";
  status?: {
    add: CommonAsyncState;
    update: CommonAsyncState;
  };
};

const MediaDialog: FC<Props> = ({
  add = () => {},
  files,
  onHide,
  method,
  status,
}) => {
  let title = "";
  let contentWidth = 620;
  let saveBtnLabel = "";

  switch (method) {
    case "add":
      title = "Add new media";
      contentWidth = 620;
      saveBtnLabel = "Save";
      break;

    case "edit":
      title = "Edit media";
      contentWidth = 1024;
      saveBtnLabel = "Save";
      break;
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!!method);
  }, [method]);

  let initialValues: { files: MediaFile[] } = { files: [] };

  if (files instanceof FileList) {
    initialValues = {
      files: map(files, (file) => ({
        author: DEFAULT_AUTHOR,
        blob: file,
        extension: file.name.substr(file.name.lastIndexOf(".") + 1),
        name: file.name.substr(0, file.name.lastIndexOf(".")),
        size: file.size,
      })),
    };
  } else if (files) {
    initialValues = { files: [files] };
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (value) => {
      if (method === "add") {
        add(value);
      } else if (method === "edit") {
        // update(value);
      }
    },
    validationSchema: fileSchema,
  });

  const onHideHandler = () => onHide();

  const onRemoveClickHandler = (index: number) => {
    let files = [...formik.values.files];
    files.splice(index, 1);
    formik.setFieldValue("files", files, true);

    if (files.length === 0) {
      setShow(false);
    }
  };

  const renderSubmitButton = () => {
    let btnText = saveBtnLabel;
    let disabled = false;

    if (status?.add.loading || status?.update.loading) {
      btnText = "Submitting....";
      disabled = true;
    }

    return (
      <Button
        disabled={disabled}
        style={{ minWidth: "100px" }}
        type="submit"
        variant="primary"
      >
        {btnText}
      </Button>
    );
  };

  const renderPreAddFileDetail = (file: MediaFile, index: number) => {
    const handleChange = formik.handleChange;
    const handleBlur = formik.handleBlur;
    const src = URL.createObjectURL(file.blob);
    const uploadFileSize = fileSize(file.size, {
      round: 0,
    });

    const errors = formik.errors.files?.[index];
    const errorMessage = map(errors, (error: string) => (
      <div key={error}>{error}</div>
    ));

    const feedbackDisplay = errorMessage ? "block" : undefined;

    return (
      <Row key={index} className="py-3 border-bottom">
        <Col>
          <Image src={src} thumbnail />
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="small">Name:</Form.Label>
            <Form.Control
              name={`files[${index}].name`}
              type="text"
              isInvalid={isObject(errors) && has(errors, "name")}
              onChange={handleChange}
              onBlur={handleBlur}
              size="sm"
              value={file.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="small">Author:</Form.Label>
            <Form.Control
              name={`files[${index}].author`}
              type="text"
              isInvalid={isObject(errors) && has(errors, "author")}
              onChange={handleChange}
              onBlur={handleBlur}
              size="sm"
              value={file.author}
            />
          </Form.Group>
          <div className="d-flex align-items-center justify-content-between">
            <span className="small text-muted">Size: {uploadFileSize}</span>
            <Button variant="link" onClick={() => onRemoveClickHandler(index)}>
              <FontAwesomeIcon icon={["far", "trash-alt"]} />
            </Button>
          </div>
          <Form.Control.Feedback
            type="invalid"
            style={{ display: feedbackDisplay }}
          >
            {errorMessage}
          </Form.Control.Feedback>
        </Col>
      </Row>
    );
  };

  const renderPreAddFileList = () => {
    return formik.values.files.map((file, index) => {
      return renderPreAddFileDetail(file, index);
    });
  };

  const renderFileDetail = () => {
    const file = formik.values.files[0];
    if (!file) return null;

    const handleChange = formik.handleChange;
    const handleBlur = formik.handleBlur;
    const { author, extension, id, name, size, uploadTime } = file;
    const src = `${MEDIA.mediaManagement.path}/${id}.${extension}`;
    const uploadFileSize = fileSize(size, { round: 0 });
    const uploadDate = uploadTime
      ? new Date(uploadTime).toLocaleDateString()
      : "";

    const errors = formik.errors.files?.[0];
    const errorMessage = map(errors, (error: string) => (
      <div key={error}>{error}</div>
    ));

    const feedbackDisplay = errorMessage ? "block" : undefined;

    return (
      <div>
        <ImageBox className="mb-3" src={src} />
        <div className="d-flex justify-content-between" style={{ gap: "1rem" }}>
          <InputGroup size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name={`files[0].name`}
              type="text"
              isInvalid={isObject(errors) && has(errors, "name")}
              onChange={handleChange}
              onBlur={handleBlur}
              size="sm"
              value={name}
            />
            <InputGroup.Append>
              <InputGroup.Text>{extension}</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon
                  className="mr-1"
                  fixedWidth
                  icon="user"
                  size="xs"
                />
                Author
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name={`files[0].author`}
              type="text"
              isInvalid={isObject(errors) && has(errors, "author")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={author}
            />
          </InputGroup>

          <InputGroup size="sm" style={{ maxWidth: "fit-content" }}>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon
                  className="mr-1"
                  fixedWidth
                  icon="database"
                  size="xs"
                />
                Size
              </InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Append>
              <InputGroup.Text>{uploadFileSize}</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup size="sm" style={{ maxWidth: "fit-content" }}>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon
                  className="mr-1"
                  fixedWidth
                  icon={["far", "calendar-alt"]}
                  size="xs"
                />
                Upload Date
              </InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Append>
              <InputGroup.Text>{uploadDate}</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <Form.Control.Feedback
          type="invalid"
          style={{ display: feedbackDisplay }}
        >
          {errorMessage}
        </Form.Control.Feedback>
      </div>
    );
  };

  const renderBody = () => {
    if (method === "add") return renderPreAddFileList();
    if (method === "edit") return renderFileDetail();

    return null;
  };

  return (
    <FullscreenModal
      animation={false}
      backdrop="static"
      centered
      contentwidth={`${contentWidth}px`}
      onHide={onHideHandler}
      show={show}
    >
      <Form
        className="min-vh-100 d-flex flex-column"
        onSubmit={formik.handleSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderBody()}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onHideHandler}
            type="button"
            variant="outline-secondary"
          >
            Cancel
          </Button>
          {renderSubmitButton()}
        </Modal.Footer>
      </Form>
    </FullscreenModal>
  );
};

export default MediaDialog;
