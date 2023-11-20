import * as yup from "yup"
import { passwordRegex, phoneRegex } from "./utils";

export const initialValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
}


export const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username is Too Short")
    .required("Username is Required"),
  email: yup.string().email("Type a Valid Email").required("Email is Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 charecters")
    .matches(
      passwordRegex,
      "Password must contain at least one Capital letter , one lower letter, at least 4 numbers and at least one special letter (!@#$%^&*)"
    ).required('Password is Required'),
  phone: yup
    .string()
    .min(8, "Invalid Phone Number")
    .max(11, "Invalid Phone Number")
    .matches(phoneRegex, "Please enter valid phone number")
    .required("Phone is Required"),
});  