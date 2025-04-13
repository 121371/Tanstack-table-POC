import { describe, it, vi, expect } from "vitest";
import { renderWithFormAndRouter } from "../../testUtils/useReactHookForm";
import AddModalForm from "./AddModalForm";
import { HTMLElementType } from "../../html-element-type";
import { screen, fireEvent } from "@testing-library/react";

const mockOnClose = vi.fn();
const mockOnSubmit = vi.fn();

const formFields = [
  {
    name: "bankName",
    label: "Bank Name",
    type: HTMLElementType.text,
    required: true,
    tooltip: "Bank name tooltip",
  },
  {
    name: "iban",
    label: "IBAN",
    type: HTMLElementType.text,
    required: true,
    tooltip: "IBAN tooltip",
  },
];

describe("AddModalForm", () => {
  it("renders the form fields and matches snapshot", () => {
    const { container } = renderWithFormAndRouter(
      <AddModalForm
        title="Bank Account"
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        formFields={formFields}
      />
    );
    const input = screen.getByRole("textbox", { name: /bank name/i });
    expect(container).toMatchSnapshot();
    expect(input).toBeInTheDocument();
    // expect(screen.getByLabelText("IBAN")).toBeInTheDocument();
  });

  it("does not submit when required fields are empty", async () => {
    renderWithFormAndRouter(
      <AddModalForm
        title="Bank Account"
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        formFields={formFields}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await new Promise((res) => setTimeout(res, 0));

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/Bank Name is required/i)).toBeInTheDocument();
  });
});
