import { useState } from "react";
import { useFormContext, useFieldArray, FieldValues } from "react-hook-form";
import DataTable from "../DataTable";
import ModalForm from "../ModalForm";
import { addButton, containerStyle, headerStyle } from "../styles";

const AddTableComponent = <T extends FieldValues>({
  title,
  heading,
  formFields,
  columns,
  fetchDataHandler,
  handleFormSubmitCallback,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const { control } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    name: title.toLowerCase(),
    control,
  });

  const openModalForAdding = () => {
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    console.log("Edit mode");
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3>{heading}</h3>
        <button onClick={openModalForAdding} style={addButton}>
          + Add
        </button>
      </div>

      <DataTable
        columns={columns}
        data={fields}
        onEdit={handleEdit}
        onDelete={(id: string | number) => {
          const indexToDelete = fields.findIndex((f) => f.id === id);
          if (indexToDelete > -1) remove(indexToDelete);
        }}
      />

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formFields={formFields}
        title={title} // This title is used in useFieldArray and create object list such as registrations, Bank Accounts etc..
        append={append}
        fetchDataHandler={fetchDataHandler}
        handleFormSubmitCallback={handleFormSubmitCallback}
      />
    </div>
  );
};

export default AddTableComponent;
