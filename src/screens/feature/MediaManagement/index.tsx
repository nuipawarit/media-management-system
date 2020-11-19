import React, { FC } from "react";
import { Body, Document, Head } from "components/common/base/Page";

const MediaManagement: FC = () => {
  return (
    <Document>
      <Head title="Media Management System" />
      <Body>
        <h1 className="h6 mb-3">headline</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Body>
    </Document>
  );
};

export default MediaManagement;
