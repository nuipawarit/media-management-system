import * as Yup from "yup";

import { MediaFile } from "types/media";

export default Yup.object({
  files: Yup.array<MediaFile>().of(
    Yup.object({
      author: Yup.string().trim().required("Author is required"),
      extension: Yup.string()
        .trim()
        .required("Extension is required")
        .oneOf(
          ["jpg", "jpeg", "png", "mp4"],
          "File type must be jpg, jpeg, png or mp4"
        ),
      file: Yup.mixed(),
      id: Yup.string(),
      name: Yup.string().trim().required("Name is required"),
      size: Yup.number()
        .required("Size is required")
        .max(52428800, "File size must be less than 50 Mb"),
      thumbnail: Yup.string(),
      uploadTime: Yup.number(),
    })
  ),
});
