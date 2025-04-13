import { useForm, FieldError, FieldValues } from "react-hook-form";
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
};

const AddModalForm = <T extends FieldValues>({
  title,
  isOpen,
  onClose,
  formFields,
  onSubmit,
}: Props<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    setFocus,
  } = useForm<T>({
    mode: "onChange",
  });

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

    onSubmit(data);
    reset();
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
            const error = (errors?.tempForm as any)?.[field.name] as
              | FieldError
              | undefined;
            return (
              <div key={field.name} style={fieldContainer}>
                <label htmlFor={field.name} style={labelStyle}>
                  {field.label}
                  {field.tooltip && (
                    <span title={field.tooltip} style={tooltipStyle}>
                      ℹ️
                    </span>
                  )}
                </label>
                {renderField({ field, register, error })}
                {error?.message && <p style={errorStyle}>{error.message}</p>}
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
