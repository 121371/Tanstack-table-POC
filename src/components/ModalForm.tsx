import {
  Controller,
  SubmitHandler,
  useForm,
  FieldErrors,
} from "react-hook-form";
import Modal from "react-modal";
import { modalStyle, inputStyle, cancelButton, submitButton } from "./styles";
import { HTMLElementType } from "../html-element-type";

type FormFieldBase = {
  name: string;
  label: string;
  type: HTMLElementType;
  tooltip?: string; // optional tooltip
};

type TextField = FormFieldBase & { type: HTMLElementType.text };
type CheckboxField = FormFieldBase & { type: HTMLElementType.checkbox };
type SelectField = FormFieldBase & {
  type: HTMLElementType.select;
  options: { label: string; value: string | number }[];
};
type DateField = FormFieldBase & { type: HTMLElementType.datePicker };

type FormField = TextField | CheckboxField | SelectField | DateField;

type FormValues = {
  tempForm: {
    [key: string]: string | boolean;
  };
};

type FormEntry = {
  id: number;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
} & FormValues["tempForm"];

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formFields: FormField[];
  append: (value: FormEntry) => void;
  fetchDataHandler?: () => void;
  handleFormSubmitCallback?: (data: FormEntry) => void;
};

const ModalForm = ({
  isOpen,
  onClose,
  title,
  formFields,
  append,
  fetchDataHandler,
  handleFormSubmitCallback,
}: ModalFormProps) => {
  const {
    control,
    handleSubmit,
    resetField,
    clearErrors,
    trigger,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>(); // Using useForm here

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newEntry: any = {
      id: Date.now(),
      ...data.tempForm,
      createdBy: "Admin",
      createdOn: new Date().toISOString(),
      updatedBy: "",
      updatedOn: "",
    };

    append(newEntry);

    const currentData = JSON.parse(localStorage.getItem("tableData") || "[]");
    localStorage.setItem(
      "tableData",
      JSON.stringify([...currentData, newEntry])
    );

    if (handleFormSubmitCallback) handleFormSubmitCallback(newEntry);
    if (fetchDataHandler) fetchDataHandler();

    resetField("tempForm");
    clearErrors("tempForm");
    onClose();
  };

  const handleValidation = async () => {
    const isValid = await trigger("tempForm");

    if (!isValid && errors?.tempForm) {
      // Find the first invalid key in tempForm
      const firstInvalidKey = Object.keys(errors.tempForm)[0];

      if (firstInvalidKey) {
        setFocus(`tempForm.${firstInvalidKey}`);
      }
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={modalStyle}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "transparent",
          fontSize: "18px",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        &times;
      </button>

      <h3 style={{ marginBottom: 20 }}>Add New {title}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px 24px",
        }}
      >
        {formFields.map((field) => (
          <div
            key={field.name}
            style={{
              marginBottom: "24px", // Increased spacing
              minWidth: "280px", // Ensures inputs have a good base width
              paddingRight: "12px", // Extra spacing to prevent tight columns
              flexShrink: 0, // Don't shrink in horizontal scroll
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "6px",
                fontWeight: 500,
              }}
            >
              {field.label}
              {field.tooltip && (
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#888",
                  }}
                  title={field.tooltip}
                >
                  ℹ️
                </span>
              )}
            </label>

            <Controller
              name={`tempForm.${field.name}`}
              control={control}
              rules={
                !field.label.toLowerCase().includes("optional")
                  ? { required: `${field.label} is required` }
                  : {}
              }
              render={({ field: controllerField }) => {
                const hasError = (
                  errors?.tempForm as FieldErrors<FormValues["tempForm"]>
                )?.[field.name];
                const inputStyles = {
                  ...inputStyle,
                  borderColor: hasError ? "red" : "#ccc", // Highlight error field
                };

                switch (field.type) {
                  case HTMLElementType.text:
                    return (
                      <input
                        type="text"
                        style={inputStyles}
                        value={controllerField.value?.toString() ?? ""}
                        onChange={controllerField.onChange}
                      />
                    );
                  case HTMLElementType.checkbox:
                    return (
                      <input
                        type="checkbox"
                        checked={
                          typeof controllerField.value === "boolean"
                            ? controllerField.value
                            : false
                        }
                        onChange={(e) =>
                          controllerField.onChange(e.target.checked)
                        }
                      />
                    );
                  case HTMLElementType.select:
                    return (
                      <select
                        style={inputStyles}
                        value={
                          typeof controllerField.value === "string"
                            ? controllerField.value
                            : ""
                        }
                        onChange={controllerField.onChange}
                      >
                        <option value="">-- Select --</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    );
                  case HTMLElementType.datePicker:
                    return (
                      <input
                        type="date"
                        style={inputStyles}
                        value={
                          typeof controllerField.value === "string"
                            ? controllerField.value
                            : ""
                        }
                        onChange={controllerField.onChange}
                      />
                    );
                  default:
                    return (
                      <input
                        type="text"
                        style={inputStyles}
                        value={controllerField.value?.toString() ?? ""}
                        onChange={controllerField.onChange}
                      />
                    );
                }
              }}
            />

            {(errors?.tempForm as FieldErrors<FormValues["tempForm"]>)?.[
              field.name
            ]?.message && (
              <p style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {
                  (errors.tempForm as Record<string, { message?: string }>)[
                    field.name
                  ]?.message
                }
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 30,
        }}
      >
        <button onClick={onClose} style={cancelButton}>
          Cancel
        </button>
        <button onClick={handleValidation} style={submitButton}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default ModalForm;
