import React, {ComponentProps, FC } from "react";
import Button from "../Button";

type Props = ComponentProps<typeof Button> & {
  active: boolean;
};

const ToggleButton: FC<Props> = ({ children, ...props }) => {
  return (
    <Button variant="light" {...props}>
      {children}
    </Button>
  );
};

export default ToggleButton;
