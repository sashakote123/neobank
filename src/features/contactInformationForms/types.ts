import { IFormFields } from "@/src/shared/types/types";

export interface IForms {
  name: keyof IFormFields;
  title: string;
  placeholder: string;
  required: boolean;

  type?: "selector" | "calendar" | "input";
  selectorArray?: number[];
  validate?: (data: string | number | undefined) => boolean;
  errorAlert: string;
  requiredAlert?: string;
}
