import React, { ComponentProps, FC } from "react";
import { Card as BsCard } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileSize from "filesize";
import styled from "styled-components";

import MEDIA from "config/app/media";
import { shortDateFormat } from "helpers/datetime";
import { MediaFile } from "types/media";

const Box = styled(BsCard)`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  position: relative;
  translation: box-shadow 0.3s ease-in-out;
  width: calc(12rem + 2px);

  ::before {
    bottom: 0;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    content: "";
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s;
  }

  :hover::before {
    cursor: pointer;
    opacity: 1;
  }
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
  const uploadDate = uploadTime ? shortDateFormat(uploadTime) : "";
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
