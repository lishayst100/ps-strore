const phoneRegex = /^0\d([\d]{0,1})([- ]{0,1})\d{7}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

export const fullnameRegex =    /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/
export const cvcRegex = /\b\d{3,4}\b/
export const creditcardNumberRegex = /\b(?:\d[ -]*?){13,16}\b/
export const baseUrl = "http://localhost:3001/api";


export { phoneRegex, passwordRegex };
