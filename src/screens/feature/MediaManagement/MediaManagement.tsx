import React, { FC, useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import InfiniteScroll from "react-infinite-scroller";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "components/common/base/Button";
import { Body, Document, Head } from "components/common/base/Page";
import SearchInput from "components/common/base/SearchInput";
import ToggleableButton from "components/common/base/ToggleableButton";
import { MediaFile } from "types/media";

import Card from "./components/Card";
import Loader from "./components/Loader";

type Props = {
  clearResult: () => void;
  data: MediaFile[] | null;
  hasMore: boolean;
  load: (criteria: { page: number }) => void;
  loading: boolean;
  page: number;
  reset: () => void;
};

const MediaManagement: FC<Props> = ({
  clearResult,
  data,
  hasMore,
  load,
  loading,
  page,
  reset,
}) => {
  const [isInitialedList, setIsInitialedList] = useState(false);

  useEffect(() => {
    setIsInitialedList(true);
    clearResult();

    return () => {
      reset();
    };
  }, [clearResult, load, reset]);

  const loadMore = () => {
    console.log(page);
    if (loading || !hasMore) return;

    load({ page: page + 1 });
  };

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
          <div className="flex-fill overflow-auto">
            <InfiniteScroll
              className="d-flex flex-wrap justify-content-between"
              hasMore={hasMore}
              initialLoad={!isInitialedList}
              loader={<Loader key="loader">Loading ...</Loader>}
              loadMore={loadMore}
              useWindow={false}
            >
              {(data ?? []).map((mediaFile) => (
                <Card
                  key={mediaFile.id}
                  className="mb-3"
                  data={mediaFile}
                  style={{ width: "12rem" }}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </Body>
    </Document>
  );
};

export default MediaManagement;
