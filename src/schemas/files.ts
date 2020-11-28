import * as Yup from "yup";

export default Yup.object({
  files: Yup.mixed().when("files", {
    is: (val) => true,
    then: Yup.mixed(),
    otherwise: Yup.mixed(),
  }),
});
