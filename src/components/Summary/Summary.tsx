/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormattedMessage } from "react-intl";

interface SummaryProps {
  formData: Record<string, any>;
}

// Mapping of technical field names to message IDs for localization
const fieldLabels: Record<string, string> = {
  clientName1: "summary.clientName1",
  clientName2: "summary.clientName2",
  clientName3: "summary.clientName3",
  clientName4: "summary.clientName4",
  clientName5: "summary.clientName5",
  registration: "summary.registration",
  ratings: "summary.ratings",
  bankAccounts: "summary.bankAccounts",
  networkRelationships: "summary.networkRelationships",
  additionalAddresses: "summary.additionalAddresses",
};

// Mapping of technical column names to message IDs for localization
const columnLabels: Record<string, string> = {
  iso3Code: "summary.iso3Code",
  englishLabel: "summary.englishLabel",
  accountNumber: "summary.accountNumber",
  bankName: "summary.bankName",
  currency: "summary.currency",
  // Add more mappings as needed
};

const Summary: React.FC<SummaryProps> = ({ formData }) => {
  // Filter out tempForm from the formData
  const filteredFormData = Object.entries(formData).reduce(
    (acc, [key, value]) => {
      if (key !== "tempForm") {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <div
          style={{
            overflowX: "auto", // Enable horizontal scrolling for nested tables
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {value.length > 0 &&
                  typeof value[0] === "object" &&
                  Object.keys(value[0]).map((subKey) => (
                    <th
                      key={subKey}
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        backgroundColor: "#f9f9f9",
                        textAlign: "left",
                      }}
                    >
                      <FormattedMessage
                        id={columnLabels[subKey] || subKey}
                        defaultMessage={subKey}
                      />
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {value.map((item, index) => (
                <tr key={index}>
                  {typeof item === "object" ? (
                    Object.entries(item).map(([subKey, subValue]) => (
                      <td
                        key={subKey}
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {renderValue(subValue)}
                      </td>
                    ))
                  ) : (
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      {String(item)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      // Render object properties as key-value pairs
      return (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {Object.entries(value).map(([subKey, subValue]) => (
              <tr key={subKey}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "left",
                  }}
                >
                  <FormattedMessage
                    id={columnLabels[subKey] || subKey}
                    defaultMessage={subKey}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {renderValue(subValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      // Render primitive values as strings
      return String(value);
    }
  };

  return (
    <div
      style={{
        padding: "10px 20px 20px 20px", // Set top padding to 10px
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        marginTop: "10px", // Reduced margin to move the section upward
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        <FormattedMessage id="summary.title" defaultMessage="Summary" />
      </h2>
      <div
        style={{
          overflowX: "auto", // Enable horizontal scrolling
          maxWidth: "100%", // Ensure the container doesn't exceed the screen width
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f4f4f4",
                  textAlign: "left",
                }}
              >
                <FormattedMessage id="summary.field" defaultMessage="Field" />
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f4f4f4",
                  textAlign: "left",
                }}
              >
                <FormattedMessage id="summary.value" defaultMessage="Value" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(filteredFormData).map(([key, value]) => (
              <tr key={key}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    verticalAlign: "top",
                  }}
                >
                  <strong>
                    <FormattedMessage
                      id={fieldLabels[key] || key}
                      defaultMessage={key}
                    />
                  </strong>
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {renderValue(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
