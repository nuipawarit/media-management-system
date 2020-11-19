import React, { FC } from "react";
import { hot } from "react-hot-loader/root";

import Body from "components/core/document/Body";
import Wrapper from "components/core/layout/Wrapper";
import { MediaManagement } from "screens";

const App: FC = () => (
  <Wrapper>
    <Body>
      <MediaManagement />
    </Body>
  </Wrapper>
);

export default hot(App);
