import { useFormContext } from "react-hook-form";
import { renderField } from "../AddTableComponent/fieldRenderer";
import { labelStyle, tooltipStyle, errorStyle } from "../styles";
import { HTMLElementType } from "../../html-element-type";
import { FormattedMessage } from "react-intl";

const clientFields = [
  {
    name: "shortName.english",
    label: "Short Name",
    tooltip: "Enter the short name in English",
    type: HTMLElementType.text,
  },
  {
    name: "longName.english",
    label: "Long Name",
    tooltip: "Enter the long name in English",
    type: HTMLElementType.text,
  },
  {
    name: "shortName.local",
    label: "Local Short Name (Optional)",
    tooltip: "Enter the short name in local language",
    type: HTMLElementType.text,
  },
  {
    name: "longName.local",
    label: "Local Long Name (Optional)",
    tooltip: "Enter the long name in local language",
    type: HTMLElementType.text,
  },
  {
    name: "regulatoryCatoryCode",
    label: "Regulatory Category",
    tooltip: "Select the regulatory category",
    type: HTMLElementType.select,
    options: [
      { label: "Regulatory Category 1", value: "1" },
      { label: "Regulatory Category 2", value: "2" },
    ],
  },
  {
    name: "clientTypeCode",
    label: "Client Type",
    tooltip: "Select the client type",
    type: HTMLElementType.select,
    options: [{ label: "Client Type 1", value: "1" }],
  },
  {
    name: "clientName5",
    label: "Client Name 5",
    tooltip: "Enter the name for Client 5",
    type: HTMLElementType.text,
  },
];

const ClientInfo = () => {
  const { register, formState } = useFormContext();

  return (
    <div
      style={{
        padding: "0px 20px 20px 20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        <FormattedMessage id="clientInfo.title" defaultMessage="Client Form" />
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {clientFields.map((field) => (
          <div
            key={field.name}
            style={{
              flex: "1 1 0",
              minWidth: "250px",
              maxWidth: "350px",
              marginRight: "10px",
            }}
          >
            <label
              htmlFor={field.name}
              style={{
                ...labelStyle,
                display: "inline-block",
                marginBottom: "8px",
              }}
            >
              <FormattedMessage id={field.label} defaultMessage={field.label} />
              <span
                title={field.tooltip}
                style={{
                  ...tooltipStyle,
                  marginLeft: "8px",
                }}
              >
                ℹ️
              </span>
            </label>
            {renderField({
              field: {
                name: field.name,
                label: field.label,
                type: field.type,
                options: field.options,
              },
              register,
              error: formState.errors[field.name],
            })}
            {formState.errors[field.name]?.message && (
              <p style={{ ...errorStyle, marginTop: "4px" }}>
                {String(formState.errors[field.name]?.message)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientInfo;
