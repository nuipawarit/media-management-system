import React, { ComponentProps, FC } from "react";

import styled from "styled-components";

import Button from "../Button";

const Box = styled(Button)`
  &.active {
    background-color: #939393 !important;
    border-color: #939393 !important;
    color: #f1f1f1 !important;
  }
  
  &.active:hover {
    background-color: #b6b6b6 !important;
    border-color: #b6b6b6 !important;
    color: #f1f1f1 !important;
  }
`;

type Props = ComponentProps<typeof Button> & {
  active?: boolean;
  name: string;
  onClick?: (name: string, value: boolean) => void;
};

const ToggleableButton: FC<Props> = ({
  active,
  name,
  children,
  onClick = () => {},
  ...props
}) => {
  const onClickHandler = () => onClick(name, !active);

  return (
    <Box active={active} variant="light" onClick={onClickHandler} {...props}>
      {children}
    </Box>
  );
};

export default ToggleableButton;
