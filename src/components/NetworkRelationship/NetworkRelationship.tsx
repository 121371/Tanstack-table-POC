import { HTMLElementType } from "../../html-element-type";
import AddTableComponent from "../AddTableComponent/AddTableComponent";

// Define the NetworkRelationship interface
interface NetworkRelationship {
  id: string;
  sgGroupEntity: string;
  type: number;
  startedOn: string;
  endedOn?: string;
  endReason?: string;
  daysPastDue?: string;
  clientMarketSegment?: string;
  selfBill?: string;
  internalMarketingConsent?: string;
  externalMarketingConsent?: string;
  isMain: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

function NetworkRelationship() {
  const dummyEntityList = [
    { label: "Please select", value: "" },
    { value: "entityA", label: "Entity A" },
    { value: "entityB", label: "Entity B" },
    { value: "entityC", label: "Entity C" },
  ];

  // Define the fetchDataHandler to get mock data
  const fetchDataHandler = (): NetworkRelationship[] => {
    return [
      {
        id: "1",
        sgGroupEntity: "entityA",
        type: 0,
        startedOn: "2023-01-01",
        endedOn: "2023-02-01",
        endReason: "Expired",
        daysPastDue: "30",
        clientMarketSegment: "Segment A",
        selfBill: "Y",
        internalMarketingConsent: "N",
        externalMarketingConsent: "Y",
        isMain: true,
        createdBy: "Admin",
        createdOn: "2023-01-01",
        updatedBy: "Admin",
        updatedOn: "2023-02-01",
      },
      // Add more mock data as needed
    ];
  };

  // Define form fields with enum types
  const formFields = [
    {
      name: "sgGroupEntity",
      label: "Entity",
      type: HTMLElementType.select,
      options: dummyEntityList,
      required: true,
    },
    {
      name: "type",
      label: "Relationship type",
      type: HTMLElementType.select,
      tooltip:
        "Relationship Type: 0(Service Holder), 1(Passport Customer), 2(Acting on a service)",
      options: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ],
      required: true,
    },
    {
      name: "startedOn",
      label: "Started on",
      type: HTMLElementType.datePicker,
      required: true,
    },
    {
      name: "endedOn",
      label: "Ended on (Optional)",
      type: HTMLElementType.datePicker,
    },
    {
      name: "endReason",
      label: "End Reason (Optional)",
      type: HTMLElementType.text,
    },
    {
      name: "daysPastDue",
      label: "Days past due (Optional)",
      type: HTMLElementType.datePicker,
    },
    {
      name: "clientMarketSegment",
      label: "Client Market Segment (Optional)",
      type: HTMLElementType.text,
    },
    {
      name: "selfBill",
      label: "Self Bill (Optional)",
      type: HTMLElementType.select,
      options: [
        { label: "N", value: "N" },
        { label: "U", value: "U" },
        { label: "Y", value: "Y" },
      ],
    },
    {
      name: "internalMarketingConsent",
      label: "Internal marketing consent (Optional)",
      type: HTMLElementType.select,
      options: [
        { label: "N", value: "N" },
        { label: "U", value: "U" },
        { label: "Y", value: "Y" },
      ],
    },
    {
      name: "externalMarketingConsent",
      label: "External marketing consent (Optional)",
      type: HTMLElementType.select,
      options: [
        { label: "N", value: "N" },
        { label: "U", value: "U" },
        { label: "Y", value: "Y" },
      ],
    },
    {
      name: "isMain",
      label: "Is Main (Optional)",
      type: HTMLElementType.checkbox,
    },
  ];

  return (
    <AddTableComponent
      title="networkRelationships"
      heading="Network Relationships"
      fetchDataHandler={fetchDataHandler}
      formFields={formFields} // Pass formFields using enum types
      columns={[
        { key: "id", label: "ID" },
        { key: "sgGroupEntity", label: "Entity" },
        {
          key: "type",
          label: "Relationship Type",
          tooltip:
            "Relationship Type: 0(Service Holder), 1(Passport Customer), 2(Acting on a service)",
        },
        { key: "startedOn", label: "Started On" },
        { key: "endedOn", label: "Ended On" },
        { key: "endReason", label: "End Reason" },
        {
          key: "internalMarketingConsent",
          label: "Internal marketing consent",
        },
        {
          key: "externalMarketingConsent",
          label: "External Marketing Consent",
        },
        { key: "selfBill", label: "Self Bill" },
        { key: "daysPastDue", label: "Days Past Due" },
        { key: "clientMarketSegment", label: "Client Market Segment" },
        { key: "isMain", label: "Is Main" },
        { key: "createdBy", label: "Created By" },
        { key: "createdOn", label: "Created On" },
        { key: "updatedBy", label: "Updated By" },
        { key: "updatedOn", label: "Updated On" },
      ]}
    />
  );
}

export default NetworkRelationship;
