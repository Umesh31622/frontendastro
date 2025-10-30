// import React, { useState } from "react";
// import TemplateEditor from "./TemplateEditor";
// import Messages from "./Messages";
// import Triggers from "./Triggers";

// export default function CommunicationCenter() {
//   const [activeTab, setActiveTab] = useState("templates");

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Communication Center</h1>
//       <div style={{ marginBottom: 20 }}>
//         <button onClick={() => setActiveTab("templates")}>Templates</button>
//         <button onClick={() => setActiveTab("messages")}>Manual Messages</button>
//         <button onClick={() => setActiveTab("triggers")}>Automated Triggers</button>
//       </div>

//       <div>
//         {activeTab === "templates" && <TemplateEditor />}
//         {activeTab === "messages" && <Messages />}
//         {activeTab === "triggers" && <Triggers />}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import TemplateEditor from "./TemplateEditor";
import Messages from "./Messages";
import Triggers from "./Triggers";

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ marginBottom: 20 }}>🗨️ Communication Center</h1>

      {/* Tab Buttons */}
      <div style={{ marginBottom: 30 }}>
        <button
          onClick={() => setActiveTab("templates")}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === "templates" ? "#3b82f6" : "#e2e8f0",
            color: activeTab === "templates" ? "#fff" : "#000",
          }}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === "messages" ? "#3b82f6" : "#e2e8f0",
            color: activeTab === "messages" ? "#fff" : "#000",
          }}
        >
          Manual Messages
        </button>
        <button
          onClick={() => setActiveTab("triggers")}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === "triggers" ? "#3b82f6" : "#e2e8f0",
            color: activeTab === "triggers" ? "#fff" : "#000",
          }}
        >
          Automated Triggers
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "templates" && <TemplateEditor />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "triggers" && <Triggers />}
      </div>
    </div>
  );
}

const styles = {
  tabButton: {
    padding: "10px 20px",
    marginRight: 10,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
};
