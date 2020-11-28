import React, { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useFormik } from "formik";
import { map } from "lodash";
import styled from "styled-components";

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
  files?: FileList | MediaFile;
  onHide: () => void;
  method?: "add" | "edit";
  status?: {
    add: CommonAsyncState;
    update: CommonAsyncState;
  };
};

const MediaDialog: FC<Props> = ({ files, onHide, method, status }) => {
  const isShow = method !== undefined;
  const title = method === "add" ? "Add new media" : "Edit media";

  let initialValues: MediaFile[] = [];

  if (files instanceof FileList) {
    initialValues = map(files, (file) => ({
      author: DEFAULT_AUTHOR,
      extension: file.name.substr(file.name.lastIndexOf(".") + 1),
      file,
      name: file.name,
      size: file.size,
      uploadTime: file.lastModified,
    }));
  } else if (files) {
    initialValues = [files];
  }
  console.log(initialValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (value) => {
      if (method === "add") {
        // add(value);
      } else if (method === "edit") {
        // update(value);
      }
    },
    // validationSchema: filesValidators,
  });

  const onHideHandler = () => onHide();

  const renderSubmitButton = () => {
    let btnText = "";
    let disabled = false;

    // if (status.add.loading || status.update.loading) {
    //   btnText = "Submitting....";
    //   disabled = true;
    // } else
    if (method === "add") {
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
        <Modal.Body>xxx</Modal.Body>
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
