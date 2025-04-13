// test-utils.tsx
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { IntlProvider } from "react-intl";

export function renderWithFormAndRouter(
  ui: React.ReactElement,
  {
    defaultValues = {},
    route = "/",
    formConfig = {},
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues?: Record<string, any>;
    route?: string;
    formConfig?: Parameters<typeof useForm>[0];
  } = {}
) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({ defaultValues, ...formConfig });

    return (
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={[route]}>
          <FormProvider {...methods}>{children}</FormProvider>
        </MemoryRouter>
      </IntlProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
}
