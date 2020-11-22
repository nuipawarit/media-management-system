import { slice, take } from "lodash";

export const paginate = <T = any>(items: T[], count: number, page: number) => {
  const offset = (page - 1) * count;
  return take(slice(items, offset), count);
};

export const isLatest = <T = any>(items: T[], count: number, page: number) => {
  return count * page >= items.length;
};
