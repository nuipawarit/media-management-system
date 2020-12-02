import React, { ComponentProps, FC } from "react";
import { Card as BsCard } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileSize from "filesize";
import styled from "styled-components";

import MEDIA from "config/app/media";
import { shortDateFormat } from "helpers/datetime";
import { MediaFile } from "types/media";

const Box = styled(BsCard)`
  width: calc(12rem + 2px);
`;

const Image = styled(BsCard.Img)`
  height: 6.75rem;
  width: 12rem;
`;

const Body = styled(BsCard.Body)`
  display: flex;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

type Props = ComponentProps<typeof BsCard> & {
  data: MediaFile;
};

const Card: FC<Props> = ({
  data: { author, extension, name, size, thumbnail, uploadTime },
  ...restProps
}) => {
  const imageSrc = `${MEDIA.mediaManagement.path}/${thumbnail}`;
  const uploadDate = shortDateFormat(uploadTime);
  const uploadFileSize = fileSize(size, { round: 0 });

  return (
    <Box {...restProps}>
      <Image variant="top" src={imageSrc} />
      <Body>
        <FontAwesomeIcon
          className="pt-1 mr-1"
          icon={["far", "image"]}
          fixedWidth
          size="lg"
        />
        <Detail>
          <small className="text-truncate" title={`${name}.${extension}`}>
            {name}.{extension}
          </small>
          <small className="text-muted text-truncate">
            {uploadFileSize} | {uploadDate}
          </small>
          <small className="text-muted text-truncate">{author}</small>
        </Detail>
      </Body>
    </Box>
  );
};

export default Card;
