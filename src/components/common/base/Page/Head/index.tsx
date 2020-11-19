import React, { FC } from "react";
import { Helmet } from "react-helmet";

type Props = {
  title?: string;
};

const Head: FC<Props> = ({ children, title = "" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {children}
    </Helmet>
  );
};

export default Head;
