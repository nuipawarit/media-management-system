import React, { ComponentProps, FC } from "react";
import { Card as BsCard } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MediaFile } from "types/media";

type Props = ComponentProps<typeof BsCard> & {
  data: MediaFile;
};

const Card: FC<Props> = ({ data: { id }, ...restProps }) => {
  return (
    <BsCard {...restProps}>
      <BsCard.Img variant="top" src="holder.js/100px180" />
      <BsCard.Body>
        <div className="d-flex ">
          <FontAwesomeIcon
            className="pt-1 mr-1"
            icon={["far", "image"]}
            fixedWidth
            size="lg"
          />
          <div className="d-flex flex-column">
            <small>media-name.jpg</small>
            <small className="text-muted">167kB | 25 Dec</small>
            <small className="text-muted">administrator</small>
          </div>
        </div>
      </BsCard.Body>
    </BsCard>
  );
};

export default Card;
