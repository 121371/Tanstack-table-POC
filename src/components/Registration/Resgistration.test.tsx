import { describe, it, expect } from "vitest";
import { renderWithFormAndRouter } from "../../testUtils/useReactHookForm";
import Registration from "./Registration";

describe("Registration", () => {
  it("should render correctly and match snapshot", () => {
    const { container } = renderWithFormAndRouter(<Registration />);
    expect(container).toMatchSnapshot();
  });
});
