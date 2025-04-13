// BankAccounts.test.tsx
import { renderWithFormAndRouter } from "../../testUtils/useReactHookForm";
import BankAccounts from "./BankAccounts";

describe("BankAccounts Snapshot", () => {
  it("matches the snapshot", () => {
    const { container } = renderWithFormAndRouter(<BankAccounts />);
    expect(container).toMatchSnapshot();
  });
});
