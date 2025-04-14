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
}: AddTableComponentProps<T>) => {
  const { control, setValue, getValues, resetField, clearErrors } =
    useFormContext<T>();

  const { fields, append, remove, update } = useFieldArray<T>({
    name: title as any,
    control,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the row being edited

  const handleOpenModal = (index?: number) => {
    if (index !== undefined) {
      // Populate tempForm with the selected row's data for editing
      const rowData = fields[index];
      setValue("tempForm" as any, rowData as any); // Set tempForm with the selected row's data
      setEditIndex(index); // Set the index of the row being edited
    } else {
      resetField("tempForm" as any); // Reset tempForm to clear previous data
      clearErrors("tempForm" as any); // Clear any errors associated with tempForm
      setEditIndex(null); // Clear edit index
    }
    setIsModalOpen(true);
  };

  const onValidSubmit = (data: T) => {
    const tempFormData = data?.tempForm; // Extract tempForm data directly
    console.log("Submitted Data:", tempFormData);

    if (!tempFormData || Object.keys(tempFormData)?.length === 0) {
      console.error("No valid data found in tempForm for:", tempFormData);
      return;
    }

    const newEntry = {
      ...tempFormData, // Use the extracted tempForm data directly
      createdBy: editIndex !== null ? (fields[editIndex] as any).createdBy : "Admin",
      createdOn:
        editIndex !== null
          ? (fields[editIndex] as any).createdOn
          : new Date().toISOString(),
      updatedBy: "Admin",
      updatedOn: new Date().toISOString(),
    };

    if (editIndex !== null) {
      update(editIndex, newEntry); // Update the existing row
    } else {
      append(newEntry); // Add the new entry to the field array
    }

    resetField("tempForm" as any); // Reset only the specific tempForm
    clearErrors("tempForm" as any); // Clear any errors associated with tempForm
    setIsModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          ...headerStyle,
          paddingTop: "10px",
        }}
      >
        <h3>{heading}</h3>
        <button onClick={() => handleOpenModal()} style={addButton}>
          + Add
        </button>
      </div>

      <div
        style={{
          overflowX: "auto",
          marginRight: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <DataTable
          columns={columns}
          data={fields}
          onEdit={(row, index) => handleOpenModal(index)} // Pass index to handleOpenModal
          onDelete={(id) => {
            const index = fields.findIndex((f) => f.id === id);
            if (index > -1) remove(index);
          }}
        />
      </div>

      <AddModalForm<T>
        title={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formFields={formFields}
        onSubmit={onValidSubmit}
        defaultValues={getValues("tempForm" as any)} // Pass the current tempForm values
      />
    </div>
  );
};

export default AddTableComponent;
