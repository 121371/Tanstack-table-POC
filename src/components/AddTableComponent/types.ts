import { HTMLElementType } from "../../html-element-type";

// Used for each form field in the modal
export type FormField = {
  name: string;
  label: string;
  type: HTMLElementType;
  tooltip?: string;
  options?: { label: string; value: string | number }[];
};

// Used for DataTable column headers
export type Column = {
  key: string;
  label: string;
  tooltip?: string;
};

type Option = { label: string; value: string | number };
export type Field = {
  name: string;
  label: string;
  type: HTMLElementType;
  tooltip?: string;
  options?: Option[];
  required?: boolean;
};
