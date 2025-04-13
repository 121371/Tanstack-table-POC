// ModalForm.tsx
import Modal from "react-modal";
import { modalStyle } from "../styles";

import { ReactNode } from "react";

export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formFields?: any[]; // optional, if you're not using dynamic fields in this case
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  append?: (value: any) => void;
  fetchDataHandler?: () => void;
  handleFormSubmitCallback?: () => void;
  children?: ReactNode; // 🔥 this is the missing piece
}

const ModalForm = ({ isOpen, onClose, title, children }: ModalFormProps) => {
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
      {title && <h3 style={{ marginBottom: 20 }}>{title}</h3>}
      {children}
    </Modal>
  );
};

export default ModalForm;
