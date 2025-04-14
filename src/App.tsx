/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";
import Sidebar from "./components/Sidebar/Sidebar";
import AdditionalAddresses from "./components/AdditionalAddresses/AdditionalAddresses";
import BankAccounts from "./components/BankAccounts/BankAccounts";
import NetworkRelationship from "./components/NetworkRelationship/NetworkRelationship";
import Ratings from "./components/Ratings/Ratings";
import Registration from "./components/Registration/Registration";
import React from "react";
import Summary from "./components/Summary/Summary";
import ClientInfo from "./components/ClientInfo/ClientInfo";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import { IntlProvider, FormattedMessage } from "react-intl";

const messages = {
  en: {
    "summary.title": "Summary",
    "summary.field": "Field",
    "summary.value": "Value",
    "summary.clientName1": "Client Name 1",
    "summary.clientName2": "Client Name 2",
    "summary.clientName3": "Client Name 3",
    "summary.clientName4": "Client Name 4",
    "summary.clientName5": "Client Name 5",
    "summary.registration": "Registration",
    "summary.ratings": "Ratings",
    "summary.bankAccounts": "Bank Accounts",
    "summary.networkRelationships": "Network Relationships",
    "summary.additionalAddresses": "Additional Addresses",
    "summary.tempForm": "Temporary Form Data",
    "summary.iso3Code": "ISO Code",
    "summary.englishLabel": "English Label",
    "summary.accountNumber": "Account Number",
    "summary.bankName": "Bank Name",
    "summary.currency": "Currency",
  },
};

const App = () => {
  const methods = useForm({
    defaultValues: {
      registration: [],
      ratings: [],
      bankAccounts: [],
      networkRelationships: [],
      additionalAddresses: [],
      tempForm: {}, // To prevent RHF from auto-triggering validation
    },
    mode: "onChange", // ← this ensures validation errors show only after submit
  });

  const [activeSection, setActiveSection] = React.useState("Client Info");
  const [isLoading, setIsLoading] = React.useState(false); // State to manage loader

  console.log("watch", methods?.watch());
  console.log("Watched data:", methods.watch()); // Debugging log
  const sections = [
    "Client Info",
    "Network Relationships",
    "Additional Addresses",
    "Registrations",
    "Bank Accounts",
    "Ratings",
    "Summary",
  ];

  const handleCreate = async () => {
    if (window.confirm("Are you sure you want to submit the data?")) {
      setIsLoading(true); // Show loader
      const formData = methods.getValues(); // Collect all form data
      console.log("Final Form Data:", formData); // Debugging log
      setTimeout(() => {
        setIsLoading(false); // Hide loader after 2 seconds
        alert("Data submitted successfully! (Dummy)");
      }, 2000); // 2-second delay
    }
  };

  const handleNext = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const isCreateDisabled = React.useMemo(() => {
    const values = methods.getValues() as any;
    const mandatoryFields = ["clientName1", "clientName2"]; // Add mandatory fields here
    return mandatoryFields.some((field) => !values[field]?.trim());
  }, [methods]); // Include methods in the dependency array

  const formData = methods.getValues() || {}; // Ensure formData is always an object

  const renderSection = () => {
    switch (activeSection) {
      case "Client Info":
        return <ClientInfo />;
      case "Network Relationships":
        return <NetworkRelationship />;
      case "Additional Addresses":
        return <AdditionalAddresses />;
      case "Registrations":
        return <Registration />;
      case "Bank Accounts":
        return <BankAccounts />;
      case "Ratings":
        return <Ratings />;
      case "Summary":
        return <Summary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <IntlProvider locale="en" messages={messages.en}>
      {isLoading && <Loader />}
      <Header />
      <FormProvider {...methods}>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "60px auto", // Header and main content
            gridTemplateColumns: "1fr", // Full width for header
            height: "100vh",
            marginTop: "60px", // Adjust for header height
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "250px 1fr", // Sidebar collapses on small screens
              height: "calc(100vh - 60px)", // Full height minus header
              transition: "grid-template-columns 0.3s ease", // Smooth transition
            }}
          >
            <aside
              style={{
                backgroundColor: "#f4f4f4",
                padding: "20px",
                boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
                overflowY: "auto", // Scrollable sidebar
              }}
            >
              <Sidebar
                sections={sections}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </aside>
            <main
              style={{
                padding: "20px",
                overflowY: "auto", // Scrollable content for the main section
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                height: "100%", // Full height to position buttons at the bottom
                position: "relative", // Ensure buttons are positioned relative to the main content
              }}
            >
              <form
                onSubmit={methods.handleSubmit((data) => console.log(data))}
                style={{ width: "100%", flexGrow: 1 }}
              >
                {renderSection()}
              </form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end", // Align buttons to the right
                  alignItems: "center",
                  padding: "10px 20px",
                  backgroundColor: "#fff",
                  position: "fixed", // Ensure buttons are fixed at the bottom of the main content
                  bottom: "0px", // Further increased spacing from the bottom of the screen
                  right: "20px", // Add spacing from the right of the screen
                  zIndex: 1000,
                  gap: "10px", // Added spacing between buttons
                }}
              >
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={sections.indexOf(activeSection) === 0} // Disable when on the first section
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      sections.indexOf(activeSection) === 0
                        ? "#ccc"
                        : "#581d74", // Disabled state color
                    color: "#fff",
                    border: "none", // Removed border
                    borderRadius: "4px",
                    cursor:
                      sections.indexOf(activeSection) === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <FormattedMessage
                    id="app.previous"
                    defaultMessage="Previous"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={isCreateDisabled || isLoading} // Disable button while loading
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      isCreateDisabled || isLoading ? "#ccc" : "#581d74", // Disabled state color
                    color: "#fff",
                    border: "none", // Removed border
                    borderRadius: "4px",
                    cursor:
                      isCreateDisabled || isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading ? (
                    <FormattedMessage
                      id="app.submitting"
                      defaultMessage="Submitting..."
                    />
                  ) : (
                    <FormattedMessage id="app.create" defaultMessage="Create" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    sections.indexOf(activeSection) === sections.length - 1
                  }
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      sections.indexOf(activeSection) === sections.length - 1
                        ? "#ccc" // Disabled state color
                        : "#581d74", // Updated to match "Add" button
                    color: "#fff",
                    border: "none", // Removed border
                    borderRadius: "4px",
                    cursor:
                      sections.indexOf(activeSection) === sections.length - 1
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <FormattedMessage id="app.next" defaultMessage="Next" />
                </button>
              </div>
            </main>
          </div>
        </div>
      </FormProvider>
    </IntlProvider>
  );
};

export default App;
