import * as yup from "yup";
import { creditcardNumberRegex, cvcRegex, fullnameRegex } from "./utils";


export const initialValues = {
    creditCardNumber: '',
    CVC:'',
    creditCardName:'',
    address: ''
}




export const validationSchema = yup.object({
  creditCardNumber: yup
    .string()
    .required("Credit Card Number is Required")
    .min(13, "Credit Card Number Should be at least 13 digits")
    .max(17, "Credit Card Number Should be max 16 digits")
    .matches(creditcardNumberRegex, "Enter Only Digits"),
  CVC: yup
    .string()
    .matches(cvcRegex, "Please Enter 3-4 Digits")
    .min(3)
    .max(4)
    .required("CVC is Required"),
  creditCardName: yup
    .string()
    .required("Full name is Required")
    .matches(fullnameRegex, "Please Enter Your Name"),
    address: yup.string().required('Address is Required')
});  
