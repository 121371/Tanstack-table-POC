import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define form fields for modal
const formFields = [
  {
    name: "purpose",
    label: "Purpose",
    type: HTMLElementType.text,
    tooltip:
      "LEGAL_ADDRESS for legal address or any other text describing additional address",
    required: true,
  },
  {
    name: "addressLine",
    label: "Address Line",
    type: HTMLElementType.text,
    required: true,
  },
  {
    name: "buildingName",
    label: "Building Name (Optional)",
    type: HTMLElementType.text,
  },
  { name: "street", label: "Street (Optional)", type: HTMLElementType.text },
  {
    name: "specialDelivery ",
    label: "Special Delivery (Optional)",
    type: HTMLElementType.text,
  },
  {
    name: "zipCode",
    label: "Zip Code",
    type: HTMLElementType.text,
    required: true,
  },
  {
    name: "village",
    label: "Village",
    type: HTMLElementType.text,
    required: true,
  },
  {
    name: "country",
    label: "Country",
    type: HTMLElementType.text,
    required: true,
  },
  {
    name: "completeAddress",
    label: "Complete Address (Optional)",
    type: HTMLElementType.text,
  },
  {
    name: "phoneNumber",
    label: "Phone Number (Optional)",
    type: HTMLElementType.text,
  },
];

// Define table columns
const columns = [
  { key: "purpose", label: "Purpose" },
  { key: "addressLine", label: "Address Line" },
  { key: "buildingName", label: "Building Name" },
  { key: "street", label: "Street" },
  { key: "specialDelivery", label: "Special Delivery" },
  { key: "zipCode", label: "Zip Code" },
  { key: "village", label: "Village" },
  { key: "country", label: "Country" },
  { key: "completeAddress", label: "Complete Address" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "createdBy", label: "Created By" },
  { key: "createdOn", label: "Created On" },
  { key: "updatedBy", label: "Updated By" },
  { key: "updatedOn", label: "Updated On" },
];

const AdditionalAddresses = () => {
  return (
    <AddTableComponent
      title="additionalAddresses" // Ensure this matches the desired casing
      heading="Additional Addresses"
      formFields={formFields}
      columns={columns}
    />
  );
};

export default AdditionalAddresses;
