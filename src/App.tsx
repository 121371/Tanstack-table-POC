import { FormProvider, useForm } from "react-hook-form";
import ThirdPartyTabularSections from "./components/CreateThirdParty/ThirdPartyTabularSections";

const App = () => {
  const methods = useForm({
    defaultValues: {
      registration: [],
      ratings: [],
      bankAccounts: [],
      networkRelationships: [],
      additionalAddress: [],
      clientName: "",
      tempForm: {}, // To prevent RHF from auto-triggering validation
    },
    mode: "onChange", // ← this ensures validation errors show only after submit
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Final Form Submission:", data);
  };

  console.log("amit", methods?.watch());

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ padding: 40 }}>
          <h2>Client Form</h2>

          {/* Dummy Root-Level Field */}
          <div style={{ marginBottom: 20 }}>
            <label>Client Name:</label>
            <br />
            <input
              {...methods.register("clientName")}
              placeholder="Enter client name"
            />
          </div>

          {/* This is combination of tabulation section of the third party details */}
          <ThirdPartyTabularSections />

          {/* Submit Button */}
          <button type="submit" style={{ marginTop: 30 }}>
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default App;
