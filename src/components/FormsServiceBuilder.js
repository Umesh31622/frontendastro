import React, { useState } from "react";
import Forms from "./Forms";
import Services from "./Services";
import Submissions from "./Submissions";
import "./styles/builder.css"; // CSS file for styling

export default function FormsServiceBuilder({ token }) {
  const [selectedType, setSelectedType] = useState("");

  const renderComponent = () => {
    switch (selectedType) {
      case "form":
        return <Forms token={token} />;
      case "service":
        return <Services token={token} />;
      case "submission":
        return <Submissions token={token} />;
      default:
        return <p className="placeholder-text">Please select a type from the dropdown above.</p>;
    }
  };

  return (
    <div className="builder-container">
      <h2>Forms & Service Builder</h2>

      <div className="dropdown-wrapper">
        <label htmlFor="builderSelect">Select Type:</label>
        <select
          id="builderSelect"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">--Choose--</option>
          <option value="form">Form</option>
          <option value="service">Service</option>
          <option value="submission">Submission</option>
        </select>
      </div>

      <div className="builder-content">{renderComponent()}</div>
    </div>
  );
}
