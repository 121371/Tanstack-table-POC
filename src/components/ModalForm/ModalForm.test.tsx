import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import ModalForm from "./ModalForm";

describe("ModalForm", () => {
  it("should render correctly when open and match snapshot", () => {
    const { container } = render(
      <ModalForm isOpen={true} onClose={vi.fn()} title="Test Modal">
        <form>
          <label htmlFor="test">Test Field</label>
          <input id="test" name="test" />
        </form>
      </ModalForm>
    );
    expect(container).toMatchSnapshot();
  });
});
