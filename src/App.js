

// import React, { useState, useEffect } from "react";
// import AuthPage from "./components/AuthPage";
// import AdminLayout from "./components/AdminLayout";
// import API, { loginUser } from "./api/api";

// export default function App() {
//   const [user, setUser] = useState(null);

//   // On mount, check localStorage for existing user
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // ================== Razorpay Payment ==================
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handlePayment = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) return alert("❌ Razorpay SDK failed to load.");

//     try {
//       const { data } = await API.post("/payments/create-order", { amount: 500 });
//       if (!data.success) return alert("Order creation failed!");

//       const { id: order_id, amount, currency } = data.order;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_7m8iz2GqqZ6H9C",
//         amount: amount.toString(),
//         currency,
//         name: "Astrology Admin Panel",
//         description: "Astrology Payment",
//         order_id,
//         handler: async (response) => {
//           alert("✅ Payment Successful: " + response.razorpay_payment_id);
//           await API.post("/payments/save-transaction", {
//             paymentId: response.razorpay_payment_id,
//             orderId: response.razorpay_order_id,
//             amount: amount / 100,
//             status: "success",
//           });
//         },
//         prefill: {
//           name: user?.name || "User",
//           email: user?.email || "user@example.com",
//           contact: user?.contact || "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("❌ Payment Error:", err);
//       alert("Payment initialization failed!");
//     }
//   };

//   return (
//     <div className="app-root">
//       {!user ? (
//         <AuthPage
//           onAuth={(userData) => {
//             setUser(userData);
//             localStorage.setItem("user", JSON.stringify(userData));
//           }}
//         />
//       ) : (
//         <AdminLayout
//           user={user}
//           onLogout={() => {
//             setUser(null);
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//           }}
//           handlePayment={handlePayment}
//         />
//       )}
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./components/AuthPage";
// import FeedbackPage from "./components/FeedbackPage";
// import AdminFeedbackList from "./components/AdminFeedbackList";
// import api, { setToken } from "./api";

// export default function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   const handleAuthSuccess = (userData, token) => {
//     setUser(userData);
//     setToken(token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={!user ? <AuthPage onAuth={handleAuthSuccess} /> : <Navigate to="/admin-feedback" />} />
//         <Route path="/feedback" element={<FeedbackPage />} />

//         {/* Admin Routes */}
//         <Route path="/admin-feedback" element={user ? <AdminFeedbackList /> : <Navigate to="/login" />} />

//         {/* Redirect any unknown route to /feedback */}
//         <Route path="*" element={<Navigate to="/feedback" />} />
//       </Routes>
//     </Router>
//   );
// }

// import React, { useState, useEffect } from "react";
// import AuthPage from "./components/AuthPage";
// import AdminLayout from "./components/AdminLayout";
// import UserWebApp from "./userweb/UserWebApp";
// import API, { getAllFeedbacks, submitFeedback, getAllFeedbacksAdmin, deleteFeedbackAdmin, updateFeedbackAdmin } from "./api";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", message: "", rating: 5 });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Check if user already logged in
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//     fetchFeedbacks();
//   }, []);

//   // ================== Feedback Functions ==================
//   const fetchFeedbacks = async () => {
//     setLoading(true);
//     try {
//       if (localStorage.getItem("token")) {
//         const data = await getAllFeedbacksAdmin();
//         setFeedbacks(Array.isArray(data) ? data : data.feedbacks || []);
//       } else {
//         const data = await getAllFeedbacks();
//         setFeedbacks(Array.isArray(data) ? data : data.feedbacks || []);
//       }
//       setMsg("");
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to load feedbacks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFeedbackChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await submitFeedback(form);
//       setMsg("✅ Feedback submitted successfully!");
//       setForm({ name: "", email: "", message: "", rating: 5 });
//       fetchFeedbacks();
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Error submitting feedback");
//     }
//   };

//   const handleFeedbackDelete = async (id) => {
//     if (!window.confirm("Delete this feedback?")) return;
//     try {
//       await deleteFeedbackAdmin(id);
//       setMsg("✅ Feedback deleted");
//       fetchFeedbacks();
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to delete feedback");
//     }
//   };

//   const handleFeedbackUpdate = async (id, data) => {
//     try {
//       await updateFeedbackAdmin(id, data);
//       setMsg("✅ Feedback updated");
//       fetchFeedbacks();
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to update feedback");
//     }
//   };

//   // ================== Razorpay Payment ==================
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handlePayment = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) return alert("❌ Razorpay SDK failed to load.");

//     try {
//       const { data } = await API.post("/payments/create-order", { amount: 500 });
//       if (!data.success) return alert("Order creation failed!");

//       const { id: order_id, amount, currency } = data.order;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_7m8iz2GqqZ6H9C",
//         amount: amount.toString(),
//         currency,
//         name: "Astrology Admin Panel",
//         description: "Astrology Payment",
//         order_id,
//         handler: async (response) => {
//           alert("✅ Payment Successful: " + response.razorpay_payment_id);
//           await API.post("/payments/save-transaction", {
//             paymentId: response.razorpay_payment_id,
//             orderId: response.razorpay_order_id,
//             amount: amount / 100,
//             status: "success",
//           });
//         },
//         prefill: {
//           name: user?.name || "User",
//           email: user?.email || "user@example.com",
//           contact: user?.contact || "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("❌ Payment Error:", err);
//       alert("Payment initialization failed!");
//     }
//   };

//   return (
//     <div className="app-root">
//       {!user ? (
//         <AuthPage
//           onAuth={(userData) => {
//             setUser(userData);
//             localStorage.setItem("user", JSON.stringify(userData));
//           }}
//         />
//       ) : (
//         <AdminLayout
//           user={user}
//           onLogout={() => {
//             setUser(null);
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//           }}
//           handlePayment={handlePayment}
//           feedbackSection={{
//             feedbacks,
//             form,
//             msg,
//             loading,
//             handleFeedbackChange,
//             handleFeedbackSubmit,
//             handleFeedbackDelete,
//             handleFeedbackUpdate,
//           }}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./components/AuthPage";
import AdminLayout from "./components/AdminLayout";

// USER WEBSITE
import UserWebApp from "./userweb/UserWebApp";

import API, {
  getAllFeedbacks,
  submitFeedback,
  getAllFeedbacksAdmin,
  deleteFeedbackAdmin,
  updateFeedbackAdmin,
} from "./api";

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // ================== CHECK ADMIN LOGIN ==================
  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) setAdmin(JSON.parse(stored));

    fetchFeedbacks();
  }, []);

  // ================== FEEDBACK FUNCTIONS ==================
  const fetchFeedbacks = async () => {
    setLoading(true);

    try {
      if (localStorage.getItem("token")) {
        const data = await getAllFeedbacksAdmin();
        setFeedbacks(Array.isArray(data) ? data : data.feedbacks || []);
      } else {
        const data = await getAllFeedbacks();
        setFeedbacks(Array.isArray(data) ? data : data.feedbacks || []);
      }
      setMsg("");
    } catch (err) {
      setMsg("❌ Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(form);
      setMsg("✅ Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "", rating: 5 });
      fetchFeedbacks();
    } catch (err) {
      setMsg("❌ Error submitting feedback");
    }
  };

  const handleFeedbackDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await deleteFeedbackAdmin(id);
      setMsg("✅ Feedback deleted");
      fetchFeedbacks();
    } catch {
      setMsg("❌ Failed to delete feedback");
    }
  };

  const handleFeedbackUpdate = async (id, data) => {
    try {
      await updateFeedbackAdmin(id, data);
      setMsg("✅ Feedback updated");
      fetchFeedbacks();
    } catch {
      setMsg("❌ Failed to update feedback");
    }
  };

  // ================== RAZORPAY PAYMENT ==================
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert("❌ Razorpay SDK failed to load.");

    try {
      const { data } = await API.post("/payments/create-order", {
        amount: 500,
      });

      if (!data.success) return alert("Order creation failed!");

      const { id: order_id, amount, currency } = data.order;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: amount.toString(),
        currency,
        name: "Astrology Admin Panel",
        description: "Astrology Payment",
        order_id,
        handler: async (response) => {
          alert("Payment Successful!");

          await API.post("/payments/save-transaction", {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: amount / 100,
            status: "success",
          });
        },
        prefill: {
          name: admin?.name || "Admin",
          email: admin?.email || "admin@example.com",
          contact: "9999999999",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment failed!");
    }
  };

  // ==========================================================
  //                    FINAL ROUTER SETUP
  // ==========================================================
  return (
    <BrowserRouter>
      <Routes>
        {/* USER WEBSITE */}
        <Route path="/admin/*" element={<UserWebApp />} />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin"
          element={
            !admin ? (
              <AuthPage
                onAuth={(data) => {
                  setAdmin(data);
                  localStorage.setItem("admin", JSON.stringify(data));
                }}
              />
            ) : (
              <AdminLayout
                user={admin}
                onLogout={() => {
                  setAdmin(null);
                  localStorage.removeItem("admin");
                  localStorage.removeItem("token");
                }}
                handlePayment={handlePayment}
                feedbackSection={{
                  feedbacks,
                  form,
                  msg,
                  loading,
                  handleFeedbackChange,
                  handleFeedbackSubmit,
                  handleFeedbackDelete,
                  handleFeedbackUpdate,
                }}
              />
            )
          }
        />

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/user" />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: 50, textAlign: "center", color: "#999" }}>
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
