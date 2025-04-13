import { describe, it, expect } from "vitest";
import { renderWithFormAndRouter } from "../../testUtils/useReactHookForm";
import Ratings from "./Ratings";

describe("ratings", () => {
  it("should render correctly and match snapshot", () => {
    const { container } = renderWithFormAndRouter(<Ratings />);
    expect(container).toMatchSnapshot();
  });
});
