// BankAccounts.test.tsx
import { renderWithFormAndRouter } from "../../testUtils/useReactHookForm";
import AdditionalAddresses from "./AdditionalAddresses";

describe("AdditionalAddresses Snapshot", () => {
  it("matches the snapshot", () => {
    const { container } = renderWithFormAndRouter(<AdditionalAddresses />);
    expect(container).toMatchSnapshot();
  });
});
