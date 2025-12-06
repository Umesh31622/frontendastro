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
import Services from "./Services";
import Forms from "./Forms";
import Submissions from "./Submissions";
import ContentVaultManager from "./ContentVaultManager";
import AboutUsAdmin from "./AboutUsAdmin";
import CareersAdmin from "./CareersAdmin";
import UserManagement from "./UserManagement";
import EnergyServicesForm from "./EnergyServicesForm";
import ManifestationAdmin from "./ManifestationAdmin";
import KnowMoreAdmin from "./KnowMoreAdmin";



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
import ContactMessages from "./ContactMessages";
import OurCilents from "./OurCilents";



// Communication
import Templates from "./communication/Templates";
import SendEmail from "./communication/SendEmail";
import SendWhatsApp from "./communication/SendWhatsApp";
import TriggerAutomation from "./communication/TriggerAutomation";

// Wallet
import WalletPage from "./WalletPage";

// Modal
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function AdminLayout({ user, token, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [activeCalculator, setActiveCalculator] = useState("kundli");
  const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
  const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
  const [showCommDropdown, setShowCommDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const builderRef = useRef(null);
  const calculatorRef = useRef(null);
  const commRef = useRef(null);
  const sidebarRef = useRef(null);

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

  // Handle global search
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

  const renderCalculator = () => {
    const calc = calculatorOptions.find((c) => c.key === activeCalculator);
    if (!calc) return <p>No calculator selected.</p>;
    const Component = calc.component;
    return <Component token={token} />;
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle navigation
  const handleNavigation = (page) => {
    setActive(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle calculator selection
  const handleCalculatorSelect = (calcKey) => {
    setActiveCalculator(calcKey);
    setActive("calculators");
    setShowCalculatorDropdown(false);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Close sidebar when clicking overlay
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (builderRef.current && !builderRef.current.contains(e.target)) {
        setShowBuilderDropdown(false);
      }
      if (calculatorRef.current && !calculatorRef.current.contains(e.target)) {
        setShowCalculatorDropdown(false);
      }
      if (commRef.current && !commRef.current.contains(e.target)) {
        setShowCommDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-root">
      {/* Hamburger Button */}
      <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Menu">
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Overlay for mobile */}
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={handleOverlayClick} />

      {/* Sidebar */}
      <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand" onClick={() => handleNavigation("dashboard")}>
          <span>AstroAdmin</span>
        </div>

        <nav>
          <button 
            className={active === "dashboard" ? "active" : ""} 
            onClick={() => handleNavigation("dashboard")}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </button>
          
          <button 
            className={active === "client management" ? "active" : ""} 
            onClick={() => handleNavigation("client management")}
          >
            <span>👥</span>
            <span>Client Management</span>
          </button>
          <button 
  className={active === "energy-services" ? "active" : ""} 
  onClick={() => handleNavigation("energy-services")}
>
  <span>⚡</span>
  <span>Energy Services Form</span>
</button>
<button
  className={active === "manifestation-admin" ? "active" : ""}
  onClick={() => handleNavigation("manifestation-admin")}
>
  <span>✨</span>
  <span>Manifestation Admin</span>
</button>
<button
  className={active === "know-more" ? "active" : ""}
  onClick={() => handleNavigation("know-more")}
>
  <span>📘</span>
  <span>Know More PDFs</span>
</button>



{/* USER DASHBOARD DROPDOWN */}
<div className="builder-dropdown-container">
  <button 
    className={showUserDropdown ? "active" : ""} 
    onClick={() => setShowUserDropdown(!showUserDropdown)}
  >
    <span>📊</span>
    <span>User </span>
    <span>{showUserDropdown ? "▲" : "▼"}</span>
  </button>

  {showUserDropdown && (
    <div className="builder-dropdown">

      {/* --- User Dashboard (Profile Panel) --- */}
      <button
        className={active === "user-dashboard" ? "active" : ""}
        onClick={() => handleNavigation("user-dashboard")}
      >
        <span>📝</span>
        <span>User Dashboard</span>
      </button>

      {/* --- User Management --- */}
      <button 
        className={active === "user management" ? "active" : ""} 
        onClick={() => handleNavigation("user management")}
      >
        <span>🧑‍💼</span>
        <span>User Management</span>
      </button>

      {/* --- User History --- */}
      <button 
        className={active === "user history" ? "active" : ""} 
        onClick={() => handleNavigation("user history")}
      >
        <span>📜</span>
        <span>User History</span>
      </button>

    </div>
  )}
</div>



          
          <button 
            className={active === "astrologer management" ? "active" : ""} 
            onClick={() => handleNavigation("astrologer management")}
          >
            <span>🔮</span>
            <span>Astrologer Management</span>
          </button>
          
          <button 
            className={active === "orders" ? "active" : ""} 
            onClick={() => handleNavigation("orders")}
          >
            <span>📦</span>
            <span>Orders</span>
          </button>
          
          <button 
            className={active === "reports" ? "active" : ""} 
            onClick={() => handleNavigation("reports")}
          >
            <span>📄</span>
            <span>Reports</span>
          </button>
          
          <button 
            className={active === "remedies" ? "active" : ""} 
            onClick={() => handleNavigation("remedies")}
          >
            <span>🌿</span>
            <span>Remedies</span>
          </button>
          
          <button 
            className={active === "consultation management" ? "active" : ""} 
            onClick={() => handleNavigation("consultation management")}
          >
            <span>💬</span>
            <span>Consultation Management</span>
          </button>

          {/* Forms & Services Dropdown */}
          <div className="builder-dropdown-container" ref={builderRef}>
            <button 
              className="builder-btn" 
              onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}
            >
              <span>🧱 Forms & Service Builder</span>
              <span>{showBuilderDropdown ? "▲" : "▼"}</span>
            </button>
            {showBuilderDropdown && (
              <div className="builder-dropdown">
                <button onClick={() => handleNavigation("forms")}>
                  <span>📝</span>
                  <span>Forms</span>
                </button>
                <button onClick={() => handleNavigation("services")}>
                  <span>⚙️</span>
                  <span>Services</span>
                </button>
                <button onClick={() => handleNavigation("submissions")}>
                  <span>📨</span>
                  <span>Submissions</span>
                </button>
              </div>
            )}
          </div>

          {/* Communication Dropdown */}
          <div className="builder-dropdown-container" ref={commRef}>
            <button 
              className="calculator-btn" 
              onClick={() => setShowCommDropdown(!showCommDropdown)}
            >
              <span>📨 Communication Center</span>
              <span>{showCommDropdown ? "▲" : "▼"}</span>
            </button>
            {showCommDropdown && (
              <div className="calculator-dropdown">
                <button onClick={() => handleNavigation("templates")}>
                  <span>📋</span>
                  <span>Templates</span>
                </button>
                <button onClick={() => handleNavigation("send-email")}>
                  <span>📧</span>
                  <span>Send Email</span>
                </button>
                <button onClick={() => handleNavigation("send-whatsapp")}>
                  <span>💬</span>
                  <span>Send WhatsApp</span>
                </button>
                <button onClick={() => handleNavigation("trigger-automation")}>
                  <span>🤖</span>
                  <span>Trigger Automation</span>
                </button>
              </div>
            )}
          </div>

          {/* Calculators Dropdown */}
          <div className="calculator-dropdown-container" ref={calculatorRef}>
            <button 
              className="calculator-btn" 
              onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}
            >
              <span>🧮 Calculators</span>
              <span>{showCalculatorDropdown ? "▲" : "▼"}</span>
            </button>
            {showCalculatorDropdown && (
              <div className="calculator-dropdown">
                {calculatorOptions.map((calc) => (
                  <button
                    key={calc.key}
                    className={activeCalculator === calc.key ? "active" : ""}
                    onClick={() => handleCalculatorSelect(calc.key)}
                  >
                    <span>✨</span>
                    <span>{calc.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className={active === "about-us" ? "active" : ""} 
            onClick={() => handleNavigation("about-us")}
          >
            <span>ℹ️</span>
            <span>About Us</span>
          </button>
          <button 
  className={active === "our-cilents" ? "active" : ""} 
  onClick={() => handleNavigation("our-cilents")}
>
  <span>🏢</span>
  <span>Our Esteemed Clients</span>
</button>

          
          <button 
            className={active === "careers" ? "active" : ""} 
            onClick={() => handleNavigation("careers")}
          >
            <span>💼</span>
            <span>Careers</span>
          </button>
          
          <button 
            className={active === "wallet & payment" ? "active" : ""} 
            onClick={() => handleNavigation("wallet & payment")}
          >
            <span>💰</span>
            <span>Wallet & Payment</span>
          </button>
          
          <button 
            className={active === "feedback" ? "active" : ""} 
            onClick={() => handleNavigation("feedback")}
          >
            <span>⭐</span>
            <span>Feedback</span>
          </button>
          <button
  className={active === "contact-messages" ? "active" : ""}
  onClick={() => handleNavigation("contact-messages")}
>
  <span>📩</span>
  <span>Contact Messages</span>
</button>

          <button 
            className={active === "content-vault" ? "active" : ""} 
            onClick={() => handleNavigation("content-vault")}
          >
            <span>📚</span>
            <span>Content & Learning Vault</span>
          </button>
          
          <button className="logout" onClick={onLogout}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>
            {active === "calculators"
              ? `${calculatorOptions.find((c) => c.key === activeCalculator)?.name || "Calculator"}`
              : active.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </h1>

          <form onSubmit={handleGlobalSearch}>
            <input
              type="text"
              placeholder="Search clients, orders, reports, remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="user-box">{user?.email || "Admin"}</div>
        </header>

        {/* Search Modal */}
        <Modal
          isOpen={showSearchModal}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "90%",
              maxWidth: "800px",
              margin: "auto",
              maxHeight: "80vh",
              overflowY: "auto",
            },
          }}
        >
          <button onClick={closeModal}>Close ✖</button>
          <h2>Search Results for "{searchQuery}"</h2>

          {["clients", "orders", "reports", "remedies"].map((section) => (
            <div key={section}>
              <h3>{section.toUpperCase()}</h3>
              {searchResults[section]?.length > 0 ? (
                <ul>
                  {searchResults[section].map((item) => (
                    <li
                      key={item._id}
                      onClick={() => {
                        setSelectedItem(item);
                        if (section === "clients") handleNavigation("client management");
                        if (section === "orders") handleNavigation("orders");
                        if (section === "reports") handleNavigation("reports");
                        if (section === "remedies") handleNavigation("remedies");
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
          {active === "about-us" && <AboutUsAdmin token={token} />}
          {active === "careers" && <CareersAdmin token={token} />}
          {active === "contact-messages" && <ContactMessages />}
          {active === "our-cilents" && <OurCilents token={token} />}
          {active === "user management" && <UserManagement token={token} />}
          {active === "energy-services" && <EnergyServicesForm token={token} />}
          {active === "manifestation-admin" && <ManifestationAdmin />}
          {active === "know-more" && <KnowMoreAdmin />}





        </section>
      </main>
    </div>
  );
}
