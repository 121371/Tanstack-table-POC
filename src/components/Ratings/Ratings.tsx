import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define form fields for modal
const formFields = [
  {
    name: "validityStart",
    label: "Validity Start",
    type: HTMLElementType.datePicker,
    tooltip: "The validity start date of the ratings",
    required: true,
  },
  {
    name: "validityEnd",
    label: "Validity End (Optional)",
    type: HTMLElementType.datePicker,
    tooltip: "The date after which rating is not valid",
  },
  {
    name: "comment",
    label: "Comment (Optional)",
    type: HTMLElementType.text,
    tooltip: "Cmment for the rating",
  },
  {
    name: "ratingValue",
    label: "Rating Value",
    type: HTMLElementType.text,
    required: true,
  },
  {
    name: "ratingSubValues",
    label: "Rating Sub Values (Optional)",
    type: HTMLElementType.select,
    options: [{ label: "Test Label", value: "test Value" }],
  },
  {
    name: "ratingTypeCode",
    label: "Rating Type Code",
    type: HTMLElementType.text,
    tooltip: "The code of rating type",
    required: true,
  },
];

// Define table columns
const columns = [
  { key: "validityStart", label: "Validity Start" },
  { key: "validityEnd", label: "Validity End" },
  { key: "comment", label: "Comment" },
  { key: "ratingValue", label: "Rating Value" },
  { key: "ratingSubValues", label: "Rating Sub Values" },
  { key: "ratingTypeCode", label: "Rating Type Code" },
  { key: "createdBy", label: "Created By" },
  { key: "createdOn", label: "Created On" },
  { key: "updatedBy", label: "Updated By" },
  { key: "updatedOn", label: "Updated On" },
];

const Ratings = () => {
  return (
    <AddTableComponent
      title="ratings"
      heading="Ratings"
      formFields={formFields}
      columns={columns}
    />
  );
};

export default Ratings;
