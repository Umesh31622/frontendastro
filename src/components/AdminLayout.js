
// // import React, { useState, useRef, useEffect } from "react";
// // import Dashboard from "./Dashboard";
// // import Orders from "./Orders";
// // import Clients from "./Clients";
// // import Astrologers from "./Astrologers";
// // import Reports from "./Reports";
// // import Remedies from "./Remedies";
// // import ConsultationManagement from "./ConsultationManagement";
// // import FeedbackPage from "./FeedbackPage";

// // // Forms & Services
// // import Services from "./Services";
// // import Forms from "./Forms";
// // import Submissions from "./Submissions";

// // // Content Vault
// // import ContentVaultManager from "./ContentVaultManager";

// // // Calculators
// // import KundliCalculator from "./calculators/KundliCalculator";
// // import NumerologyCalculator from "./calculators/NumerologyCalculator";
// // import CompatibilityCalculator from "./calculators/CompatibilityCalculator";
// // import TransitCalculator from "./calculators/TransitCalculator";
// // import DashaCalculator from "./calculators/DashaCalculator";
// // import ZodiacCalculator from "./calculators/ZodiacCalculator";
// // import NakshatraCalculator from "./calculators/NakshatraCalculator";
// // import PlanetaryCalculator from "./calculators/PlanetaryCalculator";
// // import DailyPredictionCalculator from "./calculators/DailyPredictionCalculator";
// // import HoroscopeCalculator from "./calculators/HoroscopeCalculator";
// // import ManglikCalculator from "./calculators/ManglikCalculator";
// // import PanchangCalculator from "./calculators/PanchangCalculator";
// // import GemstoneCalculator from "./calculators/GemstoneCalculator";
// // import TransitRemedyCalculator from "./calculators/TransitRemedyCalculator";

// // // Communication
// // import Templates from "./communication/Templates";
// // import SendEmail from "./communication/SendEmail";
// // import SendWhatsApp from "./communication/SendWhatsApp";
// // import TriggerAutomation from "./communication/TriggerAutomation";

// // // Wallet / Subscription
// // import WalletPage from "./WalletPage";

// // // ✅ Global Search dependencies
// // import Modal from "react-modal";
// // import axios from "axios";

// // Modal.setAppElement("#root");

// // export default function AdminLayout({ user, token, onLogout }) {
// //   const [active, setActive] = useState("dashboard");
// //   const [activeCalculator, setActiveCalculator] = useState("kundli");
// //   const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
// //   const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
// //   const [showCommDropdown, setShowCommDropdown] = useState(false);

// //   const builderRef = useRef(null);
// //   const calculatorRef = useRef(null);
// //   const commRef = useRef(null);

// //   // 🔍 Global Search States
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState({
// //     clients: [],
// //     orders: [],
// //     reports: [],
// //     remedies: [],
// //   });
// //   const [showSearchModal, setShowSearchModal] = useState(false);
// //   const API_URL = "https://adminastrotalk-1.onrender.com/api";

// //   // 🔍 Handle Global Search
// //   const handleGlobalSearch = async (e) => {
// //     e.preventDefault();
// //     if (!searchQuery.trim()) return;

// //     try {
// //       const res = await axios.get(
// //         `${API_URL}/search?query=${encodeURIComponent(searchQuery)}`
// //       );
// //       if (res.data.success && res.data.data) {
// //         setSearchResults(res.data.data);
// //         setShowSearchModal(true);
// //       } else {
// //         setSearchResults({ clients: [], orders: [], reports: [], remedies: [] });
// //         setShowSearchModal(true);
// //       }
// //     } catch (err) {
// //       console.error("Search error:", err);
// //     }
// //   };

// //   // 🧩 Close modal
// //   const closeModal = () => {
// //     setShowSearchModal(false);
// //     setSearchQuery("");
// //   };

// //   // 🧮 Calculators
// //   const calculatorOptions = [
// //     { key: "kundli", name: "Kundli", component: KundliCalculator },
// //     { key: "numerology", name: "Numerology", component: NumerologyCalculator },
// //     { key: "compatibility", name: "Compatibility", component: CompatibilityCalculator },
// //     { key: "transit", name: "Transit Calculator", component: TransitCalculator },
// //     { key: "dasha", name: "Dasha Calculator", component: DashaCalculator },
// //     { key: "zodiac", name: "Zodiac Calculator", component: ZodiacCalculator },
// //     { key: "nakshatra", name: "Nakshatra Calculator", component: NakshatraCalculator },
// //     { key: "planetary", name: "Planetary Calculator", component: PlanetaryCalculator },
// //     { key: "daily-prediction", name: "Daily Predictions", component: DailyPredictionCalculator },
// //     { key: "horoscope", name: "Horoscope Calculator", component: HoroscopeCalculator },
// //     { key: "manglik", name: "Manglik Calculator", component: ManglikCalculator },
// //     { key: "panchang", name: "Panchang Calculator", component: PanchangCalculator },
// //     { key: "gemstone", name: "Gemstone Calculator", component: GemstoneCalculator },
// //     { key: "transit-remedy", name: "Transit Remedies", component: TransitRemedyCalculator },
// //   ];

// //   const renderCalculator = () => {
// //     const calc = calculatorOptions.find((c) => c.key === activeCalculator);
// //     if (!calc) return <p>No calculator selected.</p>;
// //     const Component = calc.component;
// //     return <Component token={token} />;
// //   };

// //   // Hide dropdowns if clicked outside
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (builderRef.current && !builderRef.current.contains(e.target)) setShowBuilderDropdown(false);
// //       if (calculatorRef.current && !calculatorRef.current.contains(e.target)) setShowCalculatorDropdown(false);
// //       if (commRef.current && !commRef.current.contains(e.target)) setShowCommDropdown(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="admin-root">
// //       {/* Sidebar */}
// //       <aside className="sidebar">
// //         <div className="brand" onClick={() => setActive("dashboard")}>AstroAdmin</div>
// //         <nav>
// //           <button className={active === "dashboard" ? "active" : ""} onClick={() => setActive("dashboard")}>Dashboard</button>
// //           <button className={active === "client management" ? "active" : ""} onClick={() => setActive("client management")}>Client Management</button>
// //           <button className={active === "astrologer management" ? "active" : ""} onClick={() => setActive("astrologer management")}>Astrologer Management</button>
// //           <button className={active === "orders" ? "active" : ""} onClick={() => setActive("orders")}>Orders</button>
// //           <button className={active === "reports" ? "active" : ""} onClick={() => setActive("reports")}>Reports</button>
// //           <button className={active === "remedies" ? "active" : ""} onClick={() => setActive("remedies")}>Remedies</button>
// //           <button className={active === "consultation management" ? "active" : ""} onClick={() => setActive("consultation management")}>Consultation Management</button>

// //           {/* Forms & Services */}
// //           <div className="builder-dropdown-container" ref={builderRef}>
// //             <button className="builder-btn" onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}>
// //               Forms & Service Builder ▼
// //             </button>
// //             {showBuilderDropdown && (
// //               <div className="builder-dropdown">
// //                 <button onClick={() => setActive("forms")}>Forms</button>
// //                 <button onClick={() => setActive("services")}>Services</button>
// //                 <button onClick={() => setActive("submissions")}>Submissions</button>
// //               </div>
// //             )}
// //           </div>

// //           {/* Communication */}
// //           <div className="builder-dropdown-container" ref={commRef}>
// //             <button className="builder-btn" onClick={() => setShowCommDropdown(!showCommDropdown)}>
// //               Communication Center ▼
// //             </button>
// //             {showCommDropdown && (
// //               <div className="builder-dropdown">
// //                 <button onClick={() => setActive("templates")}>Templates</button>
// //                 <button onClick={() => setActive("send-email")}>Send Email</button>
// //                 <button onClick={() => setActive("send-whatsapp")}>Send WhatsApp</button>
// //                 <button onClick={() => setActive("trigger-automation")}>Trigger Automation</button>
// //               </div>
// //             )}
// //           </div>

// //           {/* Calculators */}
// //           <div className="calculator-dropdown-container" ref={calculatorRef}>
// //             <button className="calculator-btn" onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}>
// //               Calculators ▼
// //             </button>
// //             {showCalculatorDropdown && (
// //               <div className="calculator-dropdown">
// //                 {calculatorOptions.map((calc) => (
// //                   <button
// //                     key={calc.key}
// //                     className={activeCalculator === calc.key ? "active" : ""}
// //                     onClick={() => {
// //                       setActiveCalculator(calc.key);
// //                       setActive("calculators");
// //                       setShowCalculatorDropdown(false);
// //                     }}
// //                   >
// //                     {calc.name}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <button onClick={() => setActive("wallet & payment")}>Wallet & Payment</button>
// //           <button onClick={() => setActive("feedback")}>Feedback</button>
// //           <button onClick={() => setActive("content-vault")}>Content & Learning Vault</button>
// //           <button className="logout" onClick={onLogout}>Logout</button>
// //         </nav>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="main-content">
// //         <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //           <h1>
// //             {active === "calculators"
// //               ? `Calculators - ${calculatorOptions.find((c) => c.key === activeCalculator)?.name}`
// //               : active.charAt(0).toUpperCase() + active.slice(1)}
// //           </h1>

// //           {/* 🔍 Search Bar */}
// //           <form onSubmit={handleGlobalSearch} style={{ width: "40%" }}>
// //             <input
// //               type="text"
// //               placeholder="🔍 Search clients, orders, reports, remedies..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               style={{
// //                 width: "100%",
// //                 padding: "8px 12px",
// //                 borderRadius: "8px",
// //                 border: "1px solid #ccc",
// //               }}
// //             />
// //           </form>

// //           <div className="user-box">{user?.email}</div>
// //         </header>

// //         {/* ✅ Search Modal */}
// //         <Modal
// //           isOpen={showSearchModal}
// //           onRequestClose={closeModal}
// //           style={{ content: { width: "70%", margin: "auto", borderRadius: "12px" } }}
// //         >
// //           <button
// //             onClick={closeModal}
// //             style={{
// //               float: "right",
// //               background: "crimson",
// //               color: "#fff",
// //               border: "none",
// //               padding: "5px 10px",
// //               borderRadius: "6px",
// //             }}
// //           >
// //             Close ✖
// //           </button>
// //           <h2>Search Results for "{searchQuery}"</h2>

// //           {["clients", "orders", "reports", "remedies"].map((section) => (
// //             <div key={section} style={{ marginTop: "1rem" }}>
// //               <h3>{section.toUpperCase()}</h3>
// //               {searchResults[section]?.length > 0 ? (
// //                 <ul>
// //                   {searchResults[section].map((item) => (
// //                     <li
// //                       key={item._id}
// //                       style={{
// //                         padding: "5px 0",
// //                         cursor: "pointer",
// //                         color: "blue",
// //                         textDecoration: "underline",
// //                       }}
// //                       onClick={() => {
// //                         // Set active page based on search section
// //                         if (section === "clients") setActive("client management");
// //                         if (section === "orders") setActive("orders");
// //                         if (section === "reports") setActive("reports");
// //                         if (section === "remedies") setActive("remedies");
// //                         closeModal();
// //                       }}
// //                     >
// //                       {section === "clients" && `${item.name} - ${item.email} (${item.phone})`}
// //                       {section === "orders" && `${item.clientName || "N/A"} - ₹${item.amount || 0}`}
// //                       {section === "reports" && `${item.title || item.reportType || "Report"}`}
// //                       {section === "remedies" && `${item.name || item.remedyType || "Remedy"}`}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p>No results found in {section}</p>
// //               )}
// //             </div>
// //           ))}
// //         </Modal>

// //         {/* Page Content */}
// //         <section className="content-area">
// //           {active === "dashboard" && <Dashboard token={token} />}
// //           {active === "client management" && <Clients token={token} />}
// //           {active === "orders" && <Orders token={token} />}
// //           {active === "astrologer management" && <Astrologers token={token} />}
// //           {active === "reports" && <Reports token={token} />}
// //           {active === "remedies" && <Remedies token={token} />}
// //           {active === "consultation management" && <ConsultationManagement token={token} />}
// //           {active === "feedback" && <FeedbackPage token={token} />}
// //           {active === "forms" && <Forms token={token} />}
// //           {active === "services" && <Services token={token} />}
// //           {active === "submissions" && <Submissions token={token} />}
// //           {active === "calculators" && renderCalculator()}
// //           {active === "content-vault" && <ContentVaultManager token={token} />}
// //           {active === "wallet & payment" && <WalletPage user={user} />}
// //           {active === "templates" && <Templates token={token} />}
// //           {active === "send-email" && <SendEmail token={token} />}
// //           {active === "send-whatsapp" && <SendWhatsApp token={token} />}
// //           {active === "trigger-automation" && <TriggerAutomation token={token} />}
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from "react";
// import Dashboard from "./Dashboard";
// import Orders from "./Orders";
// import Clients from "./Clients";
// import Astrologers from "./Astrologers";
// import Reports from "./Reports";
// import Remedies from "./Remedies";
// import ConsultationManagement from "./ConsultationManagement";
// import FeedbackPage from "./FeedbackPage";

// // Forms & Services
// import Services from "./Services";
// import Forms from "./Forms";
// import Submissions from "./Submissions";

// // Content Vault
// import ContentVaultManager from "./ContentVaultManager";

// // Calculators
// import KundliCalculator from "./calculators/KundliCalculator";
// import NumerologyCalculator from "./calculators/NumerologyCalculator";
// import CompatibilityCalculator from "./calculators/CompatibilityCalculator";
// import TransitCalculator from "./calculators/TransitCalculator";
// import DashaCalculator from "./calculators/DashaCalculator";
// import ZodiacCalculator from "./calculators/ZodiacCalculator";
// import NakshatraCalculator from "./calculators/NakshatraCalculator";
// import PlanetaryCalculator from "./calculators/PlanetaryCalculator";
// import DailyPredictionCalculator from "./calculators/DailyPredictionCalculator";
// import HoroscopeCalculator from "./calculators/HoroscopeCalculator";
// import ManglikCalculator from "./calculators/ManglikCalculator";
// import PanchangCalculator from "./calculators/PanchangCalculator";
// import GemstoneCalculator from "./calculators/GemstoneCalculator";
// import TransitRemedyCalculator from "./calculators/TransitRemedyCalculator";

// // Communication
// import Templates from "./communication/Templates";
// import SendEmail from "./communication/SendEmail";
// import SendWhatsApp from "./communication/SendWhatsApp";
// import TriggerAutomation from "./communication/TriggerAutomation";

// // Wallet / Subscription
// import WalletPage from "./WalletPage";

// // ✅ Global Search dependencies
// import Modal from "react-modal";
// import axios from "axios";

// Modal.setAppElement("#root");

// export default function AdminLayout({ user, token, onLogout }) {
//   const [active, setActive] = useState("dashboard");
//   const [activeCalculator, setActiveCalculator] = useState("kundli");
//   const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
//   const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
//   const [showCommDropdown, setShowCommDropdown] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null); // For passing clicked search item

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const builderRef = useRef(null);
//   const calculatorRef = useRef(null);
//   const commRef = useRef(null);

//   // 🔍 Global Search States
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState({
//     clients: [],
//     orders: [],
//     reports: [],
//     remedies: [],
//   });
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const API_URL = "https://adminastrotalk-1.onrender.com/api";

//   const handleGlobalSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;

//     try {
//       const res = await axios.get(
//         `${API_URL}/search?query=${encodeURIComponent(searchQuery)}`
//       );
//       if (res.data.success && res.data.data) {
//         setSearchResults(res.data.data);
//         setShowSearchModal(true);
//       } else {
//         setSearchResults({ clients: [], orders: [], reports: [], remedies: [] });
//         setShowSearchModal(true);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     }
//   };

//   const closeModal = () => {
//     setShowSearchModal(false);
//     setSearchQuery("");
//   };

//   const calculatorOptions = [
//     { key: "kundli", name: "Kundli", component: KundliCalculator },
//     { key: "numerology", name: "Numerology", component: NumerologyCalculator },
//     { key: "compatibility", name: "Compatibility", component: CompatibilityCalculator },
//     { key: "transit", name: "Transit Calculator", component: TransitCalculator },
//     { key: "dasha", name: "Dasha Calculator", component: DashaCalculator },
//     { key: "zodiac", name: "Zodiac Calculator", component: ZodiacCalculator },
//     { key: "nakshatra", name: "Nakshatra Calculator", component: NakshatraCalculator },
//     { key: "planetary", name: "Planetary Calculator", component: PlanetaryCalculator },
//     { key: "daily-prediction", name: "Daily Predictions", component: DailyPredictionCalculator },
//     { key: "horoscope", name: "Horoscope Calculator", component: HoroscopeCalculator },
//     { key: "manglik", name: "Manglik Calculator", component: ManglikCalculator },
//     { key: "panchang", name: "Panchang Calculator", component: PanchangCalculator },
//     { key: "gemstone", name: "Gemstone Calculator", component: GemstoneCalculator },
//     { key: "transit-remedy", name: "Transit Remedies", component: TransitRemedyCalculator },
//   ];

//   const renderCalculator = () => {
//     const calc = calculatorOptions.find((c) => c.key === activeCalculator);
//     if (!calc) return <p>No calculator selected.</p>;
//     const Component = calc.component;
//     return <Component token={token} />;
//   };

//   // Hide dropdowns if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (builderRef.current && !builderRef.current.contains(e.target)) setShowBuilderDropdown(false);
//       if (calculatorRef.current && !calculatorRef.current.contains(e.target)) setShowCalculatorDropdown(false);
//       if (commRef.current && !commRef.current.contains(e.target)) setShowCommDropdown(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle responsive sidebar
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) setSidebarCollapsed(true);
//       else setSidebarCollapsed(false);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className={`admin-root ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="brand" onClick={() => setActive("dashboard")}>AstroAdmin</div>
//         <nav>
//           <button className={active === "dashboard" ? "active" : ""} onClick={() => setActive("dashboard")}>Dashboard</button>
//           <button className={active === "client management" ? "active" : ""} onClick={() => setActive("client management")}>Client Management</button>
//           <button className={active === "astrologer management" ? "active" : ""} onClick={() => setActive("astrologer management")}>Astrologer Management</button>
//           <button className={active === "orders" ? "active" : ""} onClick={() => setActive("orders")}>Orders</button>
//           <button className={active === "reports" ? "active" : ""} onClick={() => setActive("reports")}>Reports</button>
//           <button className={active === "remedies" ? "active" : ""} onClick={() => setActive("remedies")}>Remedies</button>
//           <button className={active === "consultation management" ? "active" : ""} onClick={() => setActive("consultation management")}>Consultation Management</button>

//           {/* Forms & Services */}
//           <div className="builder-dropdown-container" ref={builderRef}>
//             <button className="builder-btn" onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}>
//               Forms & Service Builder ▼
//             </button>
//             {showBuilderDropdown && (
//               <div className="builder-dropdown">
//                 <button onClick={() => setActive("forms")}>Forms</button>
//                 <button onClick={() => setActive("services")}>Services</button>
//                 <button onClick={() => setActive("submissions")}>Submissions</button>
//               </div>
//             )}
//           </div>

//           {/* Communication */}
//           <div className="builder-dropdown-container" ref={commRef}>
//             <button className="builder-btn" onClick={() => setShowCommDropdown(!showCommDropdown)}>
//               Communication Center ▼
//             </button>
//             {showCommDropdown && (
//               <div className="builder-dropdown">
//                 <button onClick={() => setActive("templates")}>Templates</button>
//                 <button onClick={() => setActive("send-email")}>Send Email</button>
//                 <button onClick={() => setActive("send-whatsapp")}>Send WhatsApp</button>
//                 <button onClick={() => setActive("trigger-automation")}>Trigger Automation</button>
//               </div>
//             )}
//           </div>

//           {/* Calculators */}
//           <div className="calculator-dropdown-container" ref={calculatorRef}>
//             <button className="calculator-btn" onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}>
//               Calculators ▼
//             </button>
//             {showCalculatorDropdown && (
//               <div className="calculator-dropdown">
//                 {calculatorOptions.map((calc) => (
//                   <button
//                     key={calc.key}
//                     className={activeCalculator === calc.key ? "active" : ""}
//                     onClick={() => {
//                       setActiveCalculator(calc.key);
//                       setActive("calculators");
//                       setShowCalculatorDropdown(false);
//                     }}
//                   >
//                     {calc.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button onClick={() => setActive("wallet & payment")}>Wallet & Payment</button>
//           <button onClick={() => setActive("feedback")}>Feedback</button>
//           <button onClick={() => setActive("content-vault")}>Content & Learning Vault</button>
//           <button className="logout" onClick={onLogout}>Logout</button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
//           <h1>
//             {active === "calculators"
//               ? `Calculators - ${calculatorOptions.find((c) => c.key === activeCalculator)?.name}`
//               : active.charAt(0).toUpperCase() + active.slice(1)}
//           </h1>

//           {/* 🔍 Search Bar */}
//           <form onSubmit={handleGlobalSearch} style={{ flex: "1 1 100%", margin: "0.5rem 0" }}>
//             <input
//               type="text"
//               placeholder="🔍 Search clients, orders, reports, remedies..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "8px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//               }}
//             />
//           </form>

//           <div className="user-box">{user?.email}</div>
//         </header>

//         {/* Search Modal */}
//         <Modal
//           isOpen={showSearchModal}
//           onRequestClose={closeModal}
//           style={{ content: { width: "90%", maxWidth: "800px", margin: "auto", borderRadius: "12px", maxHeight: "80vh", overflowY: "auto" } }}
//         >
//           <button
//             onClick={closeModal}
//             style={{
//               float: "right",
//               background: "crimson",
//               color: "#fff",
//               border: "none",
//               padding: "5px 10px",
//               borderRadius: "6px",
//             }}
//           >
//             Close ✖
//           </button>
//           <h2>Search Results for "{searchQuery}"</h2>

//           {["clients", "orders", "reports", "remedies"].map((section) => (
//             <div key={section} style={{ marginTop: "1rem" }}>
//               <h3>{section.toUpperCase()}</h3>
//               {searchResults[section]?.length > 0 ? (
//                 <ul>
//                   {searchResults[section].map((item) => (
//                     <li
//                       key={item._id}
//                       style={{ padding: "5px 0", cursor: "pointer", color: "blue", textDecoration: "underline" }}
//                       onClick={() => {
//                         setSelectedItem(item); // pass selected item
//                         if (section === "clients") setActive("client management");
//                         if (section === "orders") setActive("orders");
//                         if (section === "reports") setActive("reports");
//                         if (section === "remedies") setActive("remedies");
//                         closeModal();
//                       }}
//                     >
//                       {section === "clients" && `${item.name} - ${item.email} (${item.phone})`}
//                       {section === "orders" && `${item.clientName || "N/A"} - ₹${item.amount || 0}`}
//                       {section === "reports" && `${item.title || item.reportType || "Report"}`}
//                       {section === "remedies" && `${item.name || item.remedyType || "Remedy"}`}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No results found in {section}</p>
//               )}
//             </div>
//           ))}
//         </Modal>

//         {/* Page Content */}
//         <section className="content-area">
//           {active === "dashboard" && <Dashboard token={token} />}
//           {active === "client management" && <Clients token={token} selectedItem={selectedItem} />}
//           {active === "orders" && <Orders token={token} selectedItem={selectedItem} />}
//           {active === "astrologer management" && <Astrologers token={token} />}
//           {active === "reports" && <Reports token={token} selectedItem={selectedItem} />}
//           {active === "remedies" && <Remedies token={token} selectedItem={selectedItem} />}
//           {active === "consultation management" && <ConsultationManagement token={token} />}
//           {active === "feedback" && <FeedbackPage token={token} />}
//           {active === "forms" && <Forms token={token} />}
//           {active === "services" && <Services token={token} />}
//           {active === "submissions" && <Submissions token={token} />}
//           {active === "calculators" && renderCalculator()}
//           {active === "content-vault" && <ContentVaultManager token={token} />}
//           {active === "wallet & payment" && <WalletPage user={user} />}
//           {active === "templates" && <Templates token={token} />}
//           {active === "send-email" && <SendEmail token={token} />}
//           {active === "send-whatsapp" && <SendWhatsApp token={token} />}
//           {active === "trigger-automation" && <TriggerAutomation token={token} />}
//         </section>
//       </main>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import "./AdminLayout.css";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Clients from "./Clients";
import Astrologers from "./Astrologers";
import Reports from "./Reports";
import Remedies from "./Remedies";
import ConsultationManagement from "./ConsultationManagement";
import FeedbackPage from "./FeedbackPage";

// Forms & Services
import Services from "./Services";
import Forms from "./Forms";
import Submissions from "./Submissions";

// Content Vault
import ContentVaultManager from "./ContentVaultManager";

// Calculators
import KundliCalculator from "./calculators/KundliCalculator";
import NumerologyCalculator from "./calculators/NumerologyCalculator";
import CompatibilityCalculator from "./calculators/CompatibilityCalculator";
import TransitCalculator from "./calculators/TransitCalculator";
import DashaCalculator from "./calculators/DashaCalculator";
import ZodiacCalculator from "./calculators/ZodiacCalculator";
import NakshatraCalculator from "./calculators/NakshatraCalculator";
import PlanetaryCalculator from "./calculators/PlanetaryCalculator";
import DailyPredictionCalculator from "./calculators/DailyPredictionCalculator";
import HoroscopeCalculator from "./calculators/HoroscopeCalculator";
import ManglikCalculator from "./calculators/ManglikCalculator";
import PanchangCalculator from "./calculators/PanchangCalculator";
import GemstoneCalculator from "./calculators/GemstoneCalculator";
import TransitRemedyCalculator from "./calculators/TransitRemedyCalculator";

// Communication
import Templates from "./communication/Templates";
import SendEmail from "./communication/SendEmail";
import SendWhatsApp from "./communication/SendWhatsApp";
import TriggerAutomation from "./communication/TriggerAutomation";

// Wallet / Subscription
import WalletPage from "./WalletPage";

// Global Search
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function AdminLayout({ user, token, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [activeCalculator, setActiveCalculator] = useState("kundli");
  const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
  const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
  const [showCommDropdown, setShowCommDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const builderRef = useRef(null);
  const calculatorRef = useRef(null);
  const commRef = useRef(null);

  // Global Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    clients: [],
    orders: [],
    reports: [],
    remedies: [],
  });
  const [showSearchModal, setShowSearchModal] = useState(false);
  const API_URL = "https://adminastrotalk-1.onrender.com/api";

  const handleGlobalSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.get(`${API_URL}/search?query=${encodeURIComponent(searchQuery)}`);
      if (res.data.success && res.data.data) {
        setSearchResults(res.data.data);
        setShowSearchModal(true);
      } else {
        setSearchResults({ clients: [], orders: [], reports: [], remedies: [] });
        setShowSearchModal(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const closeModal = () => {
    setShowSearchModal(false);
    setSearchQuery("");
  };

  const calculatorOptions = [
    { key: "kundli", name: "Kundli", component: KundliCalculator },
    { key: "numerology", name: "Numerology", component: NumerologyCalculator },
    { key: "compatibility", name: "Compatibility", component: CompatibilityCalculator },
    { key: "transit", name: "Transit Calculator", component: TransitCalculator },
    { key: "dasha", name: "Dasha Calculator", component: DashaCalculator },
    { key: "zodiac", name: "Zodiac Calculator", component: ZodiacCalculator },
    { key: "nakshatra", name: "Nakshatra Calculator", component: NakshatraCalculator },
    { key: "planetary", name: "Planetary Calculator", component: PlanetaryCalculator },
    { key: "daily-prediction", name: "Daily Predictions", component: DailyPredictionCalculator },
    { key: "horoscope", name: "Horoscope Calculator", component: HoroscopeCalculator },
    { key: "manglik", name: "Manglik Calculator", component: ManglikCalculator },
    { key: "panchang", name: "Panchang Calculator", component: PanchangCalculator },
    { key: "gemstone", name: "Gemstone Calculator", component: GemstoneCalculator },
    { key: "transit-remedy", name: "Transit Remedies", component: TransitRemedyCalculator },
  ];

  const renderCalculator = () => {
    const calc = calculatorOptions.find((c) => c.key === activeCalculator);
    if (!calc) return <p>No calculator selected.</p>;
    const Component = calc.component;
    return <Component token={token} />;
  };

  // Hide dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (builderRef.current && !builderRef.current.contains(e.target)) setShowBuilderDropdown(false);
      if (calculatorRef.current && !calculatorRef.current.contains(e.target)) setShowCalculatorDropdown(false);
      if (commRef.current && !commRef.current.contains(e.target)) setShowCommDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Responsive sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarCollapsed(true);
      else setSidebarCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`admin-root ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{
        width: sidebarCollapsed ? "60px" : "250px",
        transition: "all 0.3s",
        overflowY: "auto",
        position: window.innerWidth < 768 ? "fixed" : "relative",
        height: "100%",
        zIndex: 1000,
        background: "#1f2937",
        color: "#fff"
      }}>
        <div className="brand" onClick={() => setActive("dashboard")} style={{ padding: "1rem", fontWeight: "bold", cursor: "pointer" }}>
          {sidebarCollapsed ? "AA" : "AstroAdmin"}
        </div>

        {/* Hamburger toggle for mobile */}
        <button className="hamburger" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
          display: window.innerWidth < 768 ? "block" : "none",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: "1.5rem",
          margin: "0.5rem 1rem",
          cursor: "pointer"
        }}>☰</button>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          <button className={active === "dashboard" ? "active" : ""} onClick={() => setActive("dashboard")}>Dashboard</button>
          <button className={active === "client management" ? "active" : ""} onClick={() => setActive("client management")}>Client Management</button>
          <button className={active === "astrologer management" ? "active" : ""} onClick={() => setActive("astrologer management")}>Astrologer Management</button>
          <button className={active === "orders" ? "active" : ""} onClick={() => setActive("orders")}>Orders</button>
          <button className={active === "reports" ? "active" : ""} onClick={() => setActive("reports")}>Reports</button>
          <button className={active === "remedies" ? "active" : ""} onClick={() => setActive("remedies")}>Remedies</button>
          <button className={active === "consultation management" ? "active" : ""} onClick={() => setActive("consultation management")}>Consultation Management</button>

          {/* Forms & Services Dropdown */}
          <div className="builder-dropdown-container" ref={builderRef}>
            <button className="builder-btn" onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}>
              Forms & Service Builder ▼
            </button>
            {showBuilderDropdown && (
              <div className="builder-dropdown" style={{ maxHeight: "40vh", overflowY: "auto" }}>
                <button onClick={() => setActive("forms")}>Forms</button>
                <button onClick={() => setActive("services")}>Services</button>
                <button onClick={() => setActive("submissions")}>Submissions</button>
              </div>
            )}
          </div>

          {/* Communication Dropdown */}
          <div className="builder-dropdown-container" ref={commRef}>
            <button className="builder-btn" onClick={() => setShowCommDropdown(!showCommDropdown)}>
              Communication Center ▼
            </button>
            {showCommDropdown && (
              <div className="builder-dropdown" style={{ maxHeight: "40vh", overflowY: "auto" }}>
                <button onClick={() => setActive("templates")}>Templates</button>
                <button onClick={() => setActive("send-email")}>Send Email</button>
                <button onClick={() => setActive("send-whatsapp")}>Send WhatsApp</button>
                <button onClick={() => setActive("trigger-automation")}>Trigger Automation</button>
              </div>
            )}
          </div>

          {/* Calculators Dropdown */}
          <div className="calculator-dropdown-container" ref={calculatorRef}>
            <button className="calculator-btn" onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}>
              Calculators ▼
            </button>
            {showCalculatorDropdown && (
              <div className="calculator-dropdown" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                {calculatorOptions.map((calc) => (
                  <button
                    key={calc.key}
                    className={activeCalculator === calc.key ? "active" : ""}
                    onClick={() => {
                      setActiveCalculator(calc.key);
                      setActive("calculators");
                      setShowCalculatorDropdown(false);
                    }}
                  >
                    {calc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setActive("wallet & payment")}>Wallet & Payment</button>
          <button onClick={() => setActive("feedback")}>Feedback</button>
          <button onClick={() => setActive("content-vault")}>Content & Learning Vault</button>
          <button className="logout" onClick={onLogout}>Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        <header style={{
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem"
        }}>
          <h1 style={{ margin: "0.5rem 0" }}>
            {active === "calculators"
              ? `Calculators - ${calculatorOptions.find((c) => c.key === activeCalculator)?.name}`
              : active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>

          <form onSubmit={handleGlobalSearch} style={{ flex: "1 1 100%", margin: "0.5rem 0" }}>
            <input
              type="text"
              placeholder="🔍 Search clients, orders, reports, remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </form>

          <div className="user-box" style={{ marginTop: "0.5rem" }}>{user?.email}</div>
        </header>

        {/* Search Modal */}
        <Modal
          isOpen={showSearchModal}
          onRequestClose={closeModal}
          style={{
            content: { width: "90%", maxWidth: "800px", margin: "auto", borderRadius: "12px", maxHeight: "80vh", overflowY: "auto" },
          }}
        >
          <button
            onClick={closeModal}
            style={{
              float: "right",
              background: "crimson",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "6px",
            }}
          >
            Close ✖
          </button>
          <h2>Search Results for "{searchQuery}"</h2>

          {["clients", "orders", "reports", "remedies"].map((section) => (
            <div key={section} style={{ marginTop: "1rem" }}>
              <h3>{section.toUpperCase()}</h3>
              {searchResults[section]?.length > 0 ? (
                <ul>
                  {searchResults[section].map((item) => (
                    <li
                      key={item._id}
                      style={{ padding: "5px 0", cursor: "pointer", color: "blue", textDecoration: "underline" }}
                      onClick={() => {
                        setSelectedItem(item);
                        if (section === "clients") setActive("client management");
                        if (section === "orders") setActive("orders");
                        if (section === "reports") setActive("reports");
                        if (section === "remedies") setActive("remedies");
                        closeModal();
                      }}
                    >
                      {section === "clients" && `${item.name} - ${item.email} (${item.phone})`}
                      {section === "orders" && `${item.clientName || "N/A"} - ₹${item.amount || 0}`}
                      {section === "reports" && `${item.title || item.reportType || "Report"}`}
                      {section === "remedies" && `${item.name || item.remedyType || "Remedy"}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results found in {section}</p>
              )}
            </div>
          ))}
        </Modal>

        {/* Page Content */}
        <section className="content-area">
          {active === "dashboard" && <Dashboard token={token} />}
          {active === "client management" && <Clients token={token} selectedItem={selectedItem} />}
          {active === "orders" && <Orders token={token} selectedItem={selectedItem} />}
          {active === "astrologer management" && <Astrologers token={token} />}
          {active === "reports" && <Reports token={token} selectedItem={selectedItem} />}
          {active === "remedies" && <Remedies token={token} selectedItem={selectedItem} />}
          {active === "consultation management" && <ConsultationManagement token={token} />}
          {active === "feedback" && <FeedbackPage token={token} />}
          {active === "forms" && <Forms token={token} />}
          {active === "services" && <Services token={token} />}
          {active === "submissions" && <Submissions token={token} />}
          {active === "calculators" && renderCalculator()}
          {active === "content-vault" && <ContentVaultManager token={token} />}
          {active === "wallet & payment" && <WalletPage user={user} />}
          {active === "templates" && <Templates token={token} />}
          {active === "send-email" && <SendEmail token={token} />}
          {active === "send-whatsapp" && <SendWhatsApp token={token} />}
          {active === "trigger-automation" && <TriggerAutomation token={token} />}
        </section>
      </main>
    </div>
  );
}
