import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define the Registration interface
interface Registration {
  registrationTypeCode: string;
  code: string;
  validityStart?: string;
  validityEnd?: string;
}

function Registrations() {
  // Dummy options for the Registration Type dropdown
  const dummyRegistrationTypes = [
    { label: "Registration Type A", value: "R001" },
    { label: "Registration Type B", value: "R002" },
    { label: "Registration Type C", value: "R003" },
  ];

  // Define the fetchDataHandler to get mock data for the registrations
  const fetchDataHandler = (): Registration[] => {
    return [
      {
        registrationTypeCode: "R001",
        code: "Code 123",
        validityStart: "2023-01-01",
        validityEnd: "2023-12-31",
      },
      {
        registrationTypeCode: "R002",
        code: "Code 456",
        validityStart: "2023-03-01",
        validityEnd: "2023-08-31",
      },
    ];
  };

  // Define form fields for registrations with dynamic types (using HTMLElementType enum)
  const formFields = [
    {
      name: "registrationTypeCode",
      label: "Registration Type",
      type: HTMLElementType.select,
      options: dummyRegistrationTypes,
    },
    {
      name: "code",
      label: "Code",
      type: HTMLElementType.text,
    },
    {
      name: "validityStart",
      label: "Validity Start (Optional)",
      type: HTMLElementType.datePicker, // Change to text or datePicker if needed
    },
    {
      name: "validityEnd",
      label: "Validity End (Optional)",
      type: HTMLElementType.datePicker, // Change to text or datePicker if needed
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <AddTableComponent<Registration>
        heading="Registrations"
        title="registrations"
        formFields={formFields} // Pass formFields without index
        columns={[
          { key: "registrationTypeCode", label: "Registration Type" },
          { key: "code", label: "Code" },
          { key: "validityStart", label: "Validity Start" },
          { key: "validityEnd", label: "Validity End" },
        ]}
        fetchDataHandler={fetchDataHandler}
      />
    </div>
  );
}

export default Registrations;
