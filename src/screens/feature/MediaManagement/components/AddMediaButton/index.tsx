import React, { FC } from "react";
import { Fab } from "react-tiny-fab";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClick?: () => void;
};

const AddMediaButton: FC<Props> = ({ onClick }) => {
  return (
    <Fab
      icon={<FontAwesomeIcon icon={["fas", "plus"]} />}
      onClick={onClick}
      style={{ bottom: 24, right: 18, zIndex: 1000 }}
      text="Add new media"
    />
  );
};

export default AddMediaButton;
