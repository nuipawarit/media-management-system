export type Sort = {
  direction: "asc" | "desc";
  property: string;
};

export type Criteria = {
  [key: string]: any;
};

export interface PaginateCriteria extends Criteria {
  count: number;
  page: number;
  sort?: Sort;
}
