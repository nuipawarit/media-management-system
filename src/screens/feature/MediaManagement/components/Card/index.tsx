import React, { ComponentProps, FC } from "react";
import { Card as BsCard } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileSize from "filesize";

import MEDIA from "config/app/media";
import { shortDateFormat } from "helpers/datetime";
import { MediaFile } from "types/media";

type Props = ComponentProps<typeof BsCard> & {
  data: MediaFile;
};

const Card: FC<Props> = ({
  data: { author, name, size, thumbnail, uploadTime },
  ...restProps
}) => {
  const imageSrc = `${MEDIA.mediaManagement.path}/${thumbnail}`;
  const uploadDate = shortDateFormat(uploadTime);
  const uploadFileSize = fileSize(size, { round: 0 });

  return (
    <BsCard {...restProps}>
      <BsCard.Img variant="top" src={imageSrc} />
      <BsCard.Body>
        <div className="d-flex ">
          <FontAwesomeIcon
            className="pt-1 mr-1"
            icon={["far", "image"]}
            fixedWidth
            size="lg"
          />
          <div className="d-flex flex-column">
            <small>{name}</small>
            <small className="text-muted">
              {uploadFileSize} | {uploadDate}
            </small>
            <small className="text-muted">{author}</small>
          </div>
        </div>
      </BsCard.Body>
    </BsCard>
  );
};

export default Card;
