import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Body, Document, Head } from "components/common/base/Page";
import { Card } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ToggleButton from "components/common/base/ToggleButton";
import Button from "components/common/base/Button";
import SearchInput from "components/common/base/SearchInput";

const MediaManagement: FC = () => {
  return (
    <Document>
      <Head title="Media Management System" />
      <Body>
        <div className="container d-flex h-100 flex-column">
          <h1 className="display-4 pt-4 pb-3">Media Management</h1>
          <div className="d-flex mb-3">
            <ToggleButton active={false}>
              <FontAwesomeIcon icon={["fas", "image"]} fixedWidth /> Image
            </ToggleButton>
            <ToggleButton active={false} className="ml-2">
              <FontAwesomeIcon icon={["fas", "video"]} fixedWidth /> Video
            </ToggleButton>
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
            {Array.from(Array(100).keys()).map((key) => (
              <Card key={key} className="mb-3" style={{ width: "12rem" }}>
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
