// Validation schema for form fields

import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),

  altPhone: Yup.string()
    .matches(/^\d{10}$/, "Alt. Phone must be exactly 10 digits")
    .required("Alt. Phone is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  altEmail: Yup.string().email("Invalid alt. email format").required("Alt. Email is required"),

  status: Yup.object().nullable().required("Status is required"),

  qualification: Yup.object().nullable().required("Qualification is required"),

  interestField: Yup.object().nullable().required("Interest field is required"),

  source: Yup.object().nullable().required("Source is required"),

  assignedTo: Yup.object().nullable().required("Assigned To is required"),

  jobInterest: Yup.string().trim().required("Job interest is required"),

  state: Yup.string().trim().required("State is required"),

  city: Yup.string().trim().required("City is required"),

  passoutYear: Yup.number()
    .typeError("Passout year must be a number")
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Passout year is required"),

  heardFrom: Yup.string().trim().required("Heard From is required"),
});

export default validationSchema;
