import { IForms } from "./types";

const inputsArray: IForms[] = [
  {
    name: "lastName",
    title: "Your last name",
    placeholder: "For Example Doe",
    required: true,
    type: "input",
    validate: (data: string | number | undefined) =>
      /^[A-Za-zА-Яа-яЁё\s-]+$/.test(String(data)),
    errorAlert: "Incorrect last name",
    requiredAlert: "Enter your last name",
  },
  {
    name: "firstName",
    title: "Your first name",
    placeholder: "For Example Jhon",
    required: true,
    type: "input",
    validate: (data: string | number | undefined) =>
      /^[A-Za-zА-Яа-яЁё\s-]+$/.test(String(data)),
    errorAlert: "Incorrect first name",
    requiredAlert: "Enter your rirst name",
  },
  {
    name: "patronymic",
    title: "Your patronymic",
    placeholder: "For Example Victorovich",
    required: false,
    type: "input",
    validate: (data: string | number | undefined) =>
      /^[A-Za-zА-Яа-яЁё\s-]+$/.test(String(data)),
    requiredAlert: "Enter your first name",
    errorAlert: "Incorrect patronymic",
  },
  {
    name: "term",
    title: "Select term",
    placeholder: "6 month",
    required: true,
    type: "selector",
    selectorArray: [1, 2, 3, 4, 5, 6],
    errorAlert: "Incorrect term",
    requiredAlert: "Enter term",
  },
  {
    name: "email",
    title: "Your email",
    placeholder: "test@gmail.com",
    required: true,
    type: "input",
    validate: (data: string | number | undefined) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data)),
    errorAlert: "Incorrect email address",
    requiredAlert: "Enter your email address",
  },
  {
    name: "birth",
    title: "Your date of birth",
    placeholder: "Select Date and Time",
    required: true,
    validate: (data: string | number | undefined) => {
      const date = new Date(String(data));

      return !(+Date.now().toFixed() - date.valueOf() <= 568025136000);
    },
    type: "calendar",
    errorAlert: "You must be 18 and older",
    requiredAlert: "Enter your date of birth",
  },
  {
    name: "passportSeries",
    title: "Your passport series",
    placeholder: "0000",
    required: true,
    type: "input",
    validate: (data: string | number | undefined) =>
      /^\d{4}$/.test(String(data)),
    errorAlert: "The series must be 4 digits",
    requiredAlert: "Enter your passport series",
  },
  {
    name: "passportNumber",
    title: "Your passport number",
    placeholder: "000000",
    required: true,
    type: "input",
    validate: (data: string | number | undefined) =>
      /^\d{6}$/.test(String(data)),
    errorAlert: "The series must be 6 digits",
    requiredAlert: "Enter your passport number",
  },
];
export default inputsArray;
