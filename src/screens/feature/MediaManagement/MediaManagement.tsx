import React, { FC, useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import InfiniteScroll from "react-infinite-scroller";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "components/common/base/Button";
import { Body, Document, Head } from "components/common/base/Page";
import SearchInput from "components/common/base/SearchInput";
import ToggleableButton from "components/common/base/ToggleableButton";
import { MediaFile } from "types/media";

import AddMediaButton from "./components/AddMediaButton";
import Card from "./components/Card";
import Loader from "./components/Loader";
import MediaDialog from "./components/MediaDialog";

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
  const [mediaDialogState, setMediaDialogState] = useState<{
    method?: "add" | "edit";
    files?: FileList | MediaFile;
    show: boolean;
  }>({ show: false });

  useEffect(() => {
    setIsInitialedList(true);
    clearResult();

    return () => {
      reset();
    };
  }, [clearResult, load, reset]);

  const loadMore = () => {
    if (loading || !hasMore) return;

    load({ page: page + 1 });
  };

  const onClickCardHandler = (files: MediaFile) => {
    setMediaDialogState({ method: "edit", files, show: true });
  };

  const onFileChangeHandler = (files: FileList) => {
    if (files.length > 0)
      setMediaDialogState({ method: "add", files, show: true });
  };

  const onHildeMediaDialogHandler = () => {
    setMediaDialogState({ show: false });
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
          <div
            className="flex-fill"
            style={{ overflowX: "hidden", overflowY: "auto" }}
          >
            <InfiniteScroll
              className="d-flex flex-wrap justify-content-between"
              hasMore={hasMore}
              initialLoad={!isInitialedList}
              loader={
                <Loader key="loader" className="w-100">
                  Loading ...
                </Loader>
              }
              loadMore={loadMore}
              useWindow={false}
            >
              {(data ?? []).map((mediaFile) => (
                <Card
                  key={mediaFile.id}
                  className="mb-3"
                  data={mediaFile}
                  onClick={onClickCardHandler}
                />
              ))}
            </InfiniteScroll>
          </div>
          <AddMediaButton onFileChange={onFileChangeHandler} />
          <MediaDialog
            files={mediaDialogState.files}
            method={mediaDialogState.method}
            onHide={onHildeMediaDialogHandler}
            show={mediaDialogState.show}
          />
        </div>
      </Body>
    </Document>
  );
};

export default MediaManagement;
