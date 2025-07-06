export interface IForms {
  name: keyof IFormFields;
  title: string;
  placeholder: string;
  required: boolean;

  type?: "selector" | "calendar";
  selectorArray?: number[];
  validate?: (data: string | number | undefined) => boolean;
  errorAlert: string;
  requiredAlert?: string;
}

export interface IFormFields {
  lastName: string;
  firstName: string;
  patronymic: string;
  email: string;
  birth: string;
  passportSeries: string;
  passportNumber: string;
  term?: number;
}
