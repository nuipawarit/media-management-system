import { customAlphabet } from "nanoid";

export const getRandomId = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  10
);
