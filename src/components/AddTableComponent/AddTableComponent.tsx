/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFormContext, useFieldArray, FieldValues } from "react-hook-form";
import DataTable from "./DataTable";
import { addButton, containerStyle, headerStyle } from "../styles";
import { FormField } from "./types";
import AddModalForm from "./AddModalForm";

type Column = { key: string; label: string; tooltip?: string };

type AddTableComponentProps<T extends FieldValues> = {
  title: string;
  heading: string;
  formFields: FormField[];
  columns: Column[];
  fetchDataHandler?: () => T[];
  handleFormSubmitCallback?: (data: T) => void;
};

const AddTableComponent = <T extends FieldValues>({
  title,
  heading,
  formFields,
  columns,
  fetchDataHandler,
  handleFormSubmitCallback,
}: AddTableComponentProps<T>) => {
  const {
    control,
    trigger,
    setFocus,
    resetField,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();

  const { fields, append, remove } = useFieldArray<T>({
    name: title.toLowerCase() as any,
    control,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onValidSubmit = async (data: T) => {
    const isValid = await trigger("tempForm" as any);

    if (!isValid) {
      const firstInvalidKey = Object.keys(errors?.tempForm || {})?.[0];
      if (firstInvalidKey) {
        setFocus(`tempForm.${firstInvalidKey}` as any);
      }
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...data.tempForm, // ✅ flatten the modal form data
      createdBy: "Admin",
      createdOn: new Date().toISOString(),
      updatedBy: "",
      updatedOn: "",
    };

    append(newEntry);
    fetchDataHandler?.();
    handleFormSubmitCallback?.(newEntry);
    resetField("tempForm" as any);
    clearErrors("tempForm" as any);
    setIsModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3>{heading}</h3>
        <button onClick={() => setIsModalOpen(true)} style={addButton}>
          + Add
        </button>
      </div>

      <DataTable
        columns={columns}
        data={fields}
        onEdit={() => console.log("Edit Mode")}
        onDelete={(id) => {
          const index = fields.findIndex((f) => f.id === id);
          if (index > -1) remove(index);
        }}
      />

      <AddModalForm<T>
        title={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formFields={formFields}
        onSubmit={onValidSubmit}
      />
    </div>
  );
};

export default AddTableComponent;
