import { FormProvider, useForm } from "react-hook-form";
import NetworkRelationship from "./components/NetworkRelationship/NetworkRelationship";
import Registrations from "./components/Registrations/Registrations";
import AdditionalAddresses from "./components/AdditionalAddresses/AdditionalAddresses";
import AddRegistration from "./components/AddRegistration/AddRegistration";
import BankAccounts from "./components/BankAccounts/BankAccounts";
import Ratings from "./components/Ratings/Ratings";

const App = () => {
  const methods = useForm({
    defaultValues: {
      clientName: "",
      tempForm: {}, // To prevent RHF from auto-triggering validation
    },
    mode: "onChange", // ← this ensures validation errors show only after submit
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Final Form Submission:", data);
  };

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

          {/* Network Relationships Component */}
          <NetworkRelationship />

          {/* Registrations Component */}
          <Registrations />

          {/* Additional Addresses Component */}
          <AdditionalAddresses />

          {/* Add Registration Component */}
          <AddRegistration />

          {/* Bank Accounts Component */}
          <BankAccounts />

          {/* Ratings Component */}
          <Ratings />

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
