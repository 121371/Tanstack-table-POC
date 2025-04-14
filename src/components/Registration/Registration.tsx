import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define the Registration interface
interface Registration {
  registrationTypeCode: string;
  code: string;
  validityStart?: string;
  validityEnd?: string;
}

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
    required: true,
  },
  {
    name: "code",
    label: "Code",
    type: HTMLElementType.text,
    tooltip: "Enter the registration code or identifier",
    required: true,
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

// Define the fetchDataHandler to get mock data for the registrations
const fetchDataHandler = (): Registration[] => {
  return [
    {
      registrationTypeCode: "R001",
      code: "Code 123",
      validityStart: "2023-01-01",
      validityEnd: "2023-12-31",
    },
    {
      registrationTypeCode: "R002",
      code: "Code 456",
      validityStart: "2023-03-01",
      validityEnd: "2023-08-31",
    },
  ];
};

const Registration = () => {
  return (
    <AddTableComponent<Registration>
      title="registration"
      heading="Registrations"
      formFields={formFields}
      columns={columns}
      fetchDataHandler={fetchDataHandler}
    />
  );
};

export default Registration;
