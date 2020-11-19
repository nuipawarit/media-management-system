import React, { FC } from "react";

import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper: FC = ({ children }) => (
  <Box data-testid="division" id="wrapper">
    {children}
  </Box>
);

export default Wrapper;
