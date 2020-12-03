import React, { ComponentProps, FC } from "react";
import { Card as BsCard } from "react-bootstrap";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileSize from "filesize";
import styled from "styled-components";

import MEDIA from "config/app/media";
import { shortDateFormat } from "helpers/datetime";
import { MediaFile } from "types/media";

const Box = styled(BsCard)`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  position: relative;
  transition: all 0.3s ease-in-out;
  width: calc(12rem + 2px);

  :hover {
    cursor: pointer;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    transform: scale(1.02, 1.02);
  }
`;

const Image = styled(BsCard.Img)`
  object-fit: cover;
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
  onClick?: (data: MediaFile) => void;
};

const Card: FC<Props> = ({ data, onClick = () => {}, ...restProps }) => {
  const { author, extension, name, size, thumbnail, uploadTime } = data;
  const imageSrc = `${MEDIA.mediaManagement.path}/${thumbnail}`;
  const uploadDate = uploadTime ? shortDateFormat(uploadTime) : "";
  const uploadFileSize = fileSize(size, { round: 0 });

  const icon: IconProp = ["mp4"].includes(extension)
    ? ["fas", "video"]
    : ["far", "image"];

  const onClickHandler = () => onClick(data);

  return (
    <Box {...restProps} onClick={onClickHandler}>
      <Image variant="top" src={imageSrc} />
      <Body>
        <FontAwesomeIcon
          className="pt-1 mr-1"
          icon={icon}
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
