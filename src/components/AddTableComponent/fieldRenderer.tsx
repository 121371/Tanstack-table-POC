// fieldRenderer.tsx
import { FieldError, UseFormRegister } from "react-hook-form";
import { HTMLElementType } from "../../html-element-type";
import { Field } from "./types";

interface RenderFieldProps {
  field: Field;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  isTabularField?: boolean; // Flag to indicate if the field is a tabular field
}

export const renderField = ({
  field,
  register,
  error,
  isTabularField,
}: RenderFieldProps) => {
  const fieldName = isTabularField
    ? `tempForm.${field.name}` // Ensure fields are scoped under tempForm.<title>
    : field.name;

  const commonProps = {
    ...register(fieldName, {
      required: field.required ? `${field.label} is required` : undefined, // Add validation rule for required fields
    }),
    id: fieldName,
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
