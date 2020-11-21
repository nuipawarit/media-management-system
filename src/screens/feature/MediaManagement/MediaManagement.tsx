import React, { FC, useEffect } from "react";
import { Body, Document, Head } from "components/common/base/Page";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ToggleableButton from "components/common/base/ToggleableButton";
import Button from "components/common/base/Button";
import SearchInput from "components/common/base/SearchInput";
import { MediaFile } from "types/media";

type Props = {
  clearResult: () => void;
  media: MediaFile[] | null;
  hasMore: boolean;
  load: (criteria: { page: number }) => void;
  loading: boolean;
  page: number;
  reset: () => void;
};

const MediaManagement: FC<Props> = ({
  clearResult,
  media,
  hasMore,
  load,
  loading,
  page,
  reset,
}) => {
  useEffect(() => {
    const initialCriteria = { page: 0 };

    clearResult();
    load(initialCriteria);

    return () => {
      reset();
    };
  }, [clearResult, load, reset]);

  return (
    <Document>
      <Head title="Media Management System" />
      <Body>
        <div className="container d-flex h-100 flex-column">
          <h1 className="display-4 pt-4 pb-3">Media Management</h1>
          <div className="d-flex mb-3">
            <ToggleableButton active={false}>
              <FontAwesomeIcon icon={["fas", "image"]} fixedWidth /> Image
            </ToggleableButton>
            <ToggleableButton active={false} className="ml-2">
              <FontAwesomeIcon icon={["fas", "video"]} fixedWidth /> Video
            </ToggleableButton>
            <DateRangePicker>
              <Button variant="light" className="ml-2">
                <FontAwesomeIcon icon={["far", "calendar-alt"]} fixedWidth />{" "}
                Upload Date/Time
              </Button>
            </DateRangePicker>
            <SearchInput
              className="d-block w-auto ml-auto has-search"
              placeholder="Search by media name"
            />
          </div>
          <div className="d-flex flex-fill flex-wrap justify-content-between overflow-auto">
            {(media ?? []).map(({ id }) => (
              <Card key={id} className="mb-3" style={{ width: "12rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
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
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </Body>
    </Document>
  );
};

export default MediaManagement;
