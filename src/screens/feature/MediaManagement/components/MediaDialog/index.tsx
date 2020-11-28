import React, { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import styled from "styled-components";

import { MediaFile } from "types/media";

import { CommonAsyncState } from "../../../../../types/state";

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
  data?: MediaFile;
  hide: () => void;
  isShow: boolean;
  method?: "add" | "edit";
  status?: {
    add: CommonAsyncState;
    update: CommonAsyncState;
  };
};

const MediaDialog: FC<Props> = ({
  data,
  hide,
  isShow,
  method = null,
  status,
}) => {
  const title = method === "add" ? "Add new media" : "Edit media";

  const onHideHandler = () => hide();

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
  };;

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
        // onSubmit={formik.handleSubmit}
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
