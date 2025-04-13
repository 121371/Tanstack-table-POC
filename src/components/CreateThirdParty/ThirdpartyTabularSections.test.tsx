import ThirdPartyTabularSections from "./ThirdPartyTabularSections";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock all child components
vi.mock("../NetworkRelationship/NetworkRelationship", () => ({
  default: () => (
    <div data-testid="network-relationship">NetworkRelationship</div>
  ),
}));

vi.mock("../AdditionalAddresses/AdditionalAddresses", () => ({
  default: () => (
    <div data-testid="additional-addresses">AdditionalAddresses</div>
  ),
}));

vi.mock("../Registration/Registration", () => ({
  default: () => <div data-testid="add-registration">AddRegistration</div>,
}));

vi.mock("../BankAccounts/BankAccounts", () => ({
  default: () => <div data-testid="bank-accounts">BankAccounts</div>,
}));

vi.mock("../Ratings/Ratings", () => ({
  default: () => <div data-testid="ratings">Ratings</div>,
}));

describe("ThirdPartyTabularSections", () => {
  it("renders all tabular section components", () => {
    render(<ThirdPartyTabularSections />);

    expect(screen.getByTestId("network-relationship")).toBeInTheDocument();
    expect(screen.getByTestId("additional-addresses")).toBeInTheDocument();
    expect(screen.getByTestId("add-registration")).toBeInTheDocument();
    expect(screen.getByTestId("bank-accounts")).toBeInTheDocument();
    expect(screen.getByTestId("ratings")).toBeInTheDocument();
  });
});
