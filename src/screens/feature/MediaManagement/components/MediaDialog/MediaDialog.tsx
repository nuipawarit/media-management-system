import React, { FC } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileSize from "filesize";
import { useFormik } from "formik";
import { has, isObject, map } from "lodash";
import styled from "styled-components";

import fileSchema from "schemas/files";
import { MediaFile } from "types/media";
import { CommonAsyncState } from "types/state";

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
  const isShow = method !== undefined;
  const title = method === "add" ? "Add new media" : "Edit media";

  let initialValues: { files: MediaFile[] } = { files: [] };

  if (files instanceof FileList) {
    initialValues = {
      files: map(files, (file) => ({
        author: DEFAULT_AUTHOR,
        extension: file.name.substr(file.name.lastIndexOf(".") + 1),
        file,
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
  };

  const renderSubmitButton = () => {
    let btnText = "";
    let disabled = false;

    if (status?.add.loading || status?.update.loading) {
      btnText = "Submitting....";
      disabled = true;
    } else if (method === "add") {
      btnText = "Save";
    } else if (method === "edit") {
      btnText = "Save";
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

  const renderFileDetail = (index: number, src: string) => {
    const handleChange = formik.handleChange;
    const handleBlur = formik.handleBlur;
    const values = (formik.values.files || [])[index];
    const errors = (formik.errors.files || [])[index];
    const errorMessage = map(errors, (error: string) => (
      <div key={error}>{error}</div>
    ));

    const feedbackDisplay = errorMessage ? "block" : undefined;
    const uploadFileSize = fileSize(formik.values.files[index].size, {
      round: 0,
    });

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
              value={values.name}
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
              value={values.author}
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

  const renderFileList = () => {
    return formik.values.files.map(({ file }, index) => {
      const fileSrc = URL.createObjectURL(file);
      return renderFileDetail(index, fileSrc);
    });
  };

  return (
    <FullscreenModal
      animation={false}
      backdrop="static"
      centered
      contentwidth="620px"
      onHide={onHideHandler}
      show={isShow}
    >
      <Form
        className="min-vh-100 d-flex flex-column"
        onSubmit={formik.handleSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderFileList()}</Modal.Body>
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
