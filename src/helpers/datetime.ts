export const shortDateFormat = (value: string | number | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

export const localDateFormat = (value: string | number | Date) =>
  new Date(value).toLocaleDateString();
