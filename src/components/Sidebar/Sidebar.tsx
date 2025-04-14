import React from "react";

interface SidebarProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  return (
    <div
      style={{
        width: "250px",
        padding: "20px",
        borderRight: "1px solid #ddd",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>Sections</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sections.map((section) => (
          <li
            key={section}
            onClick={() => onSectionChange(section)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor:
                activeSection === section ? "#ddd" : "transparent",
              borderRadius: "4px",
              marginBottom: "5px",
            }}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
