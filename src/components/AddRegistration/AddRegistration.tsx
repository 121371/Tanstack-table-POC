import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define form fields for modal
const formFields = [
  {
    name: "registrationType",
    label: "Registration Type",
    type: HTMLElementType.select,
    tooltip: "Select the type of registration from the available options",
    options: [
      { label: "GST", value: "GST" },
      { label: "PAN", value: "PAN" },
      { label: "TAN", value: "TAN" },
      { label: "Other", value: "OTHER" },
    ],
  },
  {
    name: "code",
    label: "Code",
    type: HTMLElementType.text,
    tooltip: "Enter the registration code or identifier",
  },
  {
    name: "validityStart",
    label: "Validity Start (Optional)",
    type: HTMLElementType.datePicker,
    tooltip: "Select the start date for this registration's validity",
  },
  {
    name: "validityEnd",
    label: "Validity End (Optional)",
    type: HTMLElementType.datePicker,
    tooltip: "Select the end date for this registration's validity",
  },
];

// Define table columns
const columns = [
  { key: "registrationType", label: "Registration Type" },
  { key: "code", label: "Code" },
  { key: "validityStart", label: "Validity Start" },
  { key: "validityEnd", label: "Validity End" },
  { key: "createdBy", label: "Created By" },
  { key: "createdOn", label: "Created On" },
  { key: "updatedBy", label: "Updated By" },
  { key: "updatedOn", label: "Updated On" },
];

const AddRegistration = () => {
  return (
    <div style={{ padding: 40 }}>
      <AddTableComponent
        title="Registration"
        heading="Registrations"
        formFields={formFields}
        columns={columns}
      />
    </div>
  );
};

export default AddRegistration;
