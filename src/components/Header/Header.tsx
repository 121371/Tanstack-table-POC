import { FormattedMessage } from "react-intl";

const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#1976d2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "20px",
          }}
        >
          <li>
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "normal",
              }}
            >
              <FormattedMessage
                id="header.createThirdParty"
                defaultMessage="Create Third Party"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "normal",
              }}
            >
              <FormattedMessage
                id="header.dashboard"
                defaultMessage="Dashboard"
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "normal",
              }}
            >
              <FormattedMessage
                id="header.settings"
                defaultMessage="Settings"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
