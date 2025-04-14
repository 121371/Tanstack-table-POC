import { useForm, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import ModalForm from "../ModalForm/ModalForm";
import { renderField } from "./fieldRenderer";
import {
  fieldContainer,
  labelStyle,
  tooltipStyle,
  errorStyle,
  cancelButton,
  submitButton,
} from "../styles";
import { FormField } from "./types";

type Props<T extends FieldValues> = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  formFields: FormField[];
  onSubmit: (data: T) => void;
  defaultValues?: T; // Add defaultValues prop
};

const AddModalForm = <T extends FieldValues>({
  title,
  isOpen,
  onClose,
  formFields,
  onSubmit,
  defaultValues,
}: Props<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setFocus,
    reset, // Add reset to reset the form state
  } = useForm<T>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues); // Reset the form state with defaultValues when the modal is opened
    }
  }, [isOpen, reset, defaultValues]);

  const handleFormSubmit = async (data: T) => {
    const isValid = await trigger();
    if (!isValid) {
      const firstInvalidKey = Object.keys(errors)[0];
      if (firstInvalidKey) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFocus(firstInvalidKey as any);
      }
      return;
    }
    console.log("Form Data Submitted:", data); // Debugging log to inspect submitted data

    onSubmit(data); // Directly pass the submitted data
    onClose(); // Close the modal after successful submission
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title={`Add New ${title}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px 24px",
          }}
        >
          {formFields.map((field) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = (errors?.tempForm as any)?.[field.name]; // Ensure error is correctly extracted
            return (
              <div
                key={field.name}
                style={{
                  ...fieldContainer,
                  marginRight: "10px", // Add margin between fields
                }}
              >
                <label htmlFor={field.name} style={labelStyle}>
                  {field.label}
                  {field.tooltip && (
                    <span title={field.tooltip} style={tooltipStyle}>
                      ℹ️
                    </span>
                  )}
                </label>
                {renderField({
                  field,
                  register,
                  error,
                  isTabularField: true,
                })}
                {error?.message && <p style={errorStyle}>{error.message}</p>}{" "}
                {/* Display error message */}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 30,
          }}
        >
          <button type="button" onClick={onClose} style={cancelButton}>
            Cancel
          </button>
          <button type="submit" style={submitButton}>
            Submit
          </button>
        </div>
      </form>
    </ModalForm>
  );
};

export default AddModalForm;
