// fieldRenderer.tsx
import { FieldError, UseFormRegister } from "react-hook-form";
import { HTMLElementType } from "../../html-element-type";
import { Field } from "./types";

interface RenderFieldProps {
  field: Field;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const renderField = ({ field, register, error }: RenderFieldProps) => {
  const commonProps = {
    // We use "tempForm" to isolate modal form fields from the main form state.
    // This ensures that temporary input values from the modal don't interfere with the parent form's structure,
    // especially when using useFormContext + useFieldArray in the parent component.
    //Support user has opened the Modal and filled some fields but cancelled it, in this case it will not capture in actual formState until i click on the subkit button of the modal form
    ...register(
      `tempForm.${field.name}`,
      field.required ? { required: `${field.label} is required` } : {}
    ),
    id: field.name,
    style: {
      borderColor: error ? "red" : "#ccc",
      padding: "8px",
      borderRadius: "4px",
      borderWidth: "1px",
      width: "100%",
    },
  };

  switch (field.type) {
    case HTMLElementType.text:
      return <input type="text" {...commonProps} />;
    case HTMLElementType.checkbox:
      return <input type="checkbox" {...commonProps} />;
    case HTMLElementType.select:
      return (
        <select {...commonProps}>
          <option value="">-- Select --</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case HTMLElementType.datePicker:
      return <input type="date" {...commonProps} />;
    default:
      return null;
  }
};
