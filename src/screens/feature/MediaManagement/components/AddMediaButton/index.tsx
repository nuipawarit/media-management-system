import React, { ChangeEvent, FC, useRef } from "react";
import { Fab } from "react-tiny-fab";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onFileChange?: (files: FileList) => void;
};

const AddMediaButton: FC<Props> = ({ onFileChange = () => {} }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (!hiddenFileInput.current) return;

    hiddenFileInput.current.click();
  };

  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files;

    if (fileUploaded !== null) onFileChange(fileUploaded);
  };

  return (
    <>
      <Fab
        icon={<FontAwesomeIcon icon={["fas", "plus"]} />}
        onClick={onClickHandler}
        style={{ bottom: 24, right: 18, zIndex: 1000 }}
        text="Add new media"
      />
      <input
        accept=".jpg,.jpeg,.png,.mp4"
        multiple
        ref={hiddenFileInput}
        onChange={onFileChangeHandler}
        style={{ display: "none" }}
        type="file"
      />
    </>
  );
};

export default AddMediaButton;
