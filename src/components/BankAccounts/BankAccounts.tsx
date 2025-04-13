import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define form fields for modal
const formFields = [
  {
    name: "bankName",
    label: "Bank Name",
    type: HTMLElementType.text,
    tooltip: "The name of the bank, e.g., BPCE Group",
    required: true,
  },
  {
    name: "label",
    label: "Label",
    type: HTMLElementType.text,
    tooltip: "The label used to identify the bank account",
    required: true,
  },
  {
    name: "type",
    label: "Type",
    type: HTMLElementType.text,
    tooltip: "The type of the bank account",
    required: true,
  },
  {
    name: "bic",
    label: "BIC",
    type: HTMLElementType.text,
    tooltip: "The Bank Identifier Code",
    required: true,
  },
  {
    name: "iban",
    label: "IBAN",
    type: HTMLElementType.text,
    tooltip: "The International Bank Account Number",
    required: true,
  },
  {
    name: "accountNumber",
    label: "Account Number",
    type: HTMLElementType.text,
    required: true,
  },
  {
    name: "accountNumberType",
    label: "Account Number Type",
    type: HTMLElementType.select,
    tooltip: "Select between IBAN or LOCAL",
    options: [
      { label: "IBAN", value: "IBAN" },
      { label: "LOCAL", value: "LOCAL" },
    ],
    required: true,
  },
  {
    name: "sortCode",
    label: "Sort Code (Optional)",
    type: HTMLElementType.text,
    tooltip: "Domestic code to identify the bank",
  },
  {
    name: "validityStart",
    label: "Validity Start (Optional)",
    type: HTMLElementType.datePicker,
    tooltip: "The start date of bank account validity",
  },
  {
    name: "validityEnd",
    label: "Validity End (Optional)",
    type: HTMLElementType.datePicker,
    tooltip: "The date after which the bank account is invalid",
  },
  {
    name: "automatedPaymentMethod",
    label: "Automated Payment Method (Optional)",
    type: HTMLElementType.text,
    tooltip: "The automated payment method of the bank account",
  },
  {
    name: "isPrimary",
    label: "Is Primary (Optional)",
    type: HTMLElementType.checkbox,
    tooltip: "Indicates if this bank account is primary",
  },
  {
    name: "currency.iso3Code",
    label: "Currency ISO3 Code",
    type: HTMLElementType.text,
    tooltip: "The ISO3 currency code (optional)",
    required: true,
  },
  {
    name: "currency.englishLabel",
    label: "Currency English Label",
    type: HTMLElementType.text,
    tooltip: "The English label of the currency (optional)",
    required: true,
  },
];

// Define table columns
const columns = [
  { key: "bankName", label: "Bank Name" },
  { key: "label", label: "Label" },
  { key: "type", label: "Type" },
  { key: "bic", label: "BIC" },
  { key: "iban", label: "IBAN" },
  { key: "accountNumber", label: "Account Number" },
  { key: "accountNumberType", label: "Account Number Type" },
  { key: "sortCode", label: "Sort Code" },
  { key: "validityStart", label: "Validity Start" },
  { key: "validityEnd", label: "Validity End" },
  { key: "automatedPaymentMethod", label: "Automated Payment Method" },
  { key: "isPrimary", label: "Is Primary" },
  { key: "currency.iso3Code", label: "Currency ISO3 Code" },
  { key: "currency.englishLabel", label: "Currency English Label" },
  { key: "createdBy", label: "Created By" },
  { key: "createdOn", label: "Created On" },
  { key: "updatedBy", label: "Updated By" },
  { key: "updatedOn", label: "Updated On" },
];

const BankAccounts = () => {
  return (
    <div style={{ padding: 40 }}>
      <AddTableComponent
        title="bankAccounts"
        heading="Bank Accounts"
        formFields={formFields}
        columns={columns}
      />
    </div>
  );
};

export default BankAccounts;
