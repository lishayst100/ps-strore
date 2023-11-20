import * as yup from "yup";
import { passwordRegex } from "./utils";


export const initialValues = {
  email: "",
  password: "",
};



export const validationSchema = yup.object({
 
  email: yup.string().email("Type a Valid Email").required("Email is Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 charecters")
    .matches(
      passwordRegex,
      "Password must contain A-Z and a-z letters ,min 4 numbers and min 1 special letter"
    )
    .required("Password is Required"),
});  
