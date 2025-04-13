import { describe, it, expect } from "vitest";
import { renderWithFormAndRouter } from "../../testUtils/useReactHookForm";
import NetworkRelationship from "./NetworkRelationship";

describe("NetworkRelationship", () => {
  it("should render correctly and match snapshot", () => {
    const { container } = renderWithFormAndRouter(<NetworkRelationship />);
    expect(container).toMatchSnapshot();
  });
});
