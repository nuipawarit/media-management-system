import React, { FC } from "react";

import styled from "styled-components";

const Box = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Body: FC = ({ children }) => <Box id="body">{children}</Box>;

export default Body;
