
// import React, { useState, useEffect } from "react";
// import {
//   getPlans,
//   createPlan,
//   deletePlan,
//   getReferrals,
//   approveReferral,
// } from "../api/subscriptionApi";
// import { createOrder, verifyPayment } from "../api/paymentApi";
// import {
//   getDiscounts,
//   createDiscount,
//   deleteDiscount,
// } from "../api/discountApi";
// import "./WalletPage.css";

// export default function WalletPage({ user }) {
//   const [plans, setPlans] = useState([]);
//   const [newPlan, setNewPlan] = useState({
//     name: "",
//     amount: "",
//     interval: "monthly",
//   });
//   const [referrals, setReferrals] = useState([]);
//   const [discounts, setDiscounts] = useState([]);
//   const [newDiscount, setNewDiscount] = useState({ code: "", percentage: "" });
//   const [payName, setPayName] = useState(user?.name || "");
//   const [payEmail, setPayEmail] = useState(user?.email || "");
//   const [payAmount, setPayAmount] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const plansData = await getPlans();
//       const refs = await getReferrals();
//       const disc = await getDiscounts();
//       setPlans(plansData || []);
//       setReferrals(refs || []);
//       setDiscounts(disc || []);
//     };
//     fetchData();
//   }, []);

//   const handleCreatePlan = async () => {
//     if (!newPlan.name || !newPlan.amount) return alert("Name & Amount required");
//     await createPlan(newPlan);
//     setNewPlan({ name: "", amount: "", interval: "monthly" });
//     const updated = await getPlans();
//     setPlans(updated || []);
//   };

//   const handleDeletePlan = async (id) => {
//     await deletePlan(id);
//     const updated = await getPlans();
//     setPlans(updated || []);
//   };

//   const handleApproveReferral = async (id) => {
//     await approveReferral(id);
//     const updated = await getReferrals();
//     setReferrals(updated || []);
//   };

//   const handleCreateDiscount = async () => {
//     if (!newDiscount.code || !newDiscount.percentage)
//       return alert("Code & Percentage required");
//     await createDiscount({
//       code: newDiscount.code,
//       discountPercentage: newDiscount.percentage,
//     });
//     setNewDiscount({ code: "", percentage: "" });
//     const updated = await getDiscounts();
//     setDiscounts(updated || []);
//   };

//   const handleDeleteDiscount = async (id) => {
//     await deleteDiscount(id);
//     const updated = await getDiscounts();
//     setDiscounts(updated || []);
//   };

//   const handlePayment = async () => {
//     if (!payName || !payEmail || !payAmount) return alert("All fields required");
//     if (!user || !user._id) return alert("User not found — please log in first.");

//     try {
//       const cleanAmount = Number(payAmount);
//       if (isNaN(cleanAmount) || cleanAmount <= 0) return alert("Invalid amount");

//       const response = await createOrder({
//         amount: cleanAmount,
//         userId: user._id,
//       });

//       if (!response?.success || !response?.order)
//         return alert("Order creation failed! Check backend logs.");

//       const order = response.order;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Astrology App",
//         description: "Payment for Astrology Services",
//         order_id: order.id,
//         handler: async function (res) {
//           alert("Payment successful!");
//           await verifyPayment({
//             razorpay_order_id: res.razorpay_order_id,
//             razorpay_payment_id: res.razorpay_payment_id,
//             razorpay_signature: res.razorpay_signature,
//             amount: cleanAmount,
//             userId: user._id,
//           });
//         },
//         prefill: {
//           name: payName,
//           email: payEmail,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", function () {
//         alert("Payment failed. Please try again.");
//       });

//       rzp.open();
//     } catch (err) {
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="wallet-container">
//       <h1>Wallet & Payment Dashboard</h1>

//       <section className="card">
//         <h2>Subscription Plans</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Name"
//             value={newPlan.name}
//             onChange={(e) =>
//               setNewPlan({ ...newPlan, name: e.target.value })
//             }
//           />
//           <input
//             placeholder="Amount"
//             type="number"
//             value={newPlan.amount}
//             onChange={(e) =>
//               setNewPlan({ ...newPlan, amount: e.target.value })
//             }
//           />
//           <select
//             value={newPlan.interval}
//             onChange={(e) =>
//               setNewPlan({ ...newPlan, interval: e.target.value })
//             }
//           >
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//           </select>
//           <button onClick={handleCreatePlan}>Add Plan</button>
//         </div>
//         <ul>
//           {plans.length > 0 ? (
//             plans.map((p) => (
//               <li key={p._id}>
//                 {p.name} - ₹{p.amount}/{p.interval}{" "}
//                 <button onClick={() => handleDeletePlan(p._id)}>Delete</button>
//               </li>
//             ))
//           ) : (
//             <li>No plans available</li>
//           )}
//         </ul>
//       </section>

//       <section className="card">
//         <h2>Referrals</h2>
//         <ul>
//           {referrals.length > 0 ? (
//             referrals.map((r) => (
//               <li key={r._id}>
//                 {r.code} - {r.approved ? "✅ Approved" : "❌ Pending"}{" "}
//                 {!r.approved && (
//                   <button onClick={() => handleApproveReferral(r._id)}>
//                     Approve
//                   </button>
//                 )}{" "}
//                 | User: {r.user?.name} ({r.user?.email})
//               </li>
//             ))
//           ) : (
//             <li>No referrals found.</li>
//           )}
//         </ul>
//       </section>

//       <section className="card">
//         <h2>Discounts</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Code"
//             value={newDiscount.code}
//             onChange={(e) =>
//               setNewDiscount({ ...newDiscount, code: e.target.value })
//             }
//           />
//           <input
//             placeholder="Percentage"
//             type="number"
//             value={newDiscount.percentage}
//             onChange={(e) =>
//               setNewDiscount({ ...newDiscount, percentage: e.target.value })
//             }
//           />
//           <button onClick={handleCreateDiscount}>Add Discount</button>
//         </div>
//         <ul>
//           {discounts.length > 0 ? (
//             discounts.map((d) => (
//               <li key={d._id}>
//                 {d.code} - {d.discountPercentage}%{" "}
//                 <button onClick={() => handleDeleteDiscount(d._id)}>
//                   Delete
//                 </button>
//               </li>
//             ))
//           ) : (
//             <li>No discounts found.</li>
//           )}
//         </ul>
//       </section>

//       <section className="card">
//         <h2>Make Payment</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Name"
//             value={payName}
//             onChange={(e) => setPayName(e.target.value)}
//           />
//           <input
//             placeholder="Email"
//             value={payEmail}
//             onChange={(e) => setPayEmail(e.target.value)}
//           />
//           <input
//             placeholder="Amount"
//             type="number"
//             value={payAmount}
//             onChange={(e) => setPayAmount(e.target.value)}
//           />
//           <button onClick={handlePayment}>Pay Now</button>
//         </div>
//       </section>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   getPlans,
//   createPlan,
//   updatePlan,
//   deletePlan,
//   getReferrals,
//   approveReferral,
//   deleteReferral,
// } from "../api/subscriptionApi";
// import { createOrder, verifyPayment } from "../api/paymentApi";
// import {
//   getDiscounts,
//   createDiscount,
//   updateDiscount,
//   deleteDiscount,
// } from "../api/discountApi";
// import "./WalletPage.css";

// export default function WalletPage({ user }) {
//   const [plans, setPlans] = useState([]);
//   const [newPlan, setNewPlan] = useState({
//     name: "",
//     amount: "",
//     interval: "monthly",
//   });
//   const [editingPlan, setEditingPlan] = useState(null);

//   const [referrals, setReferrals] = useState([]);
//   const [discounts, setDiscounts] = useState([]);
//   const [newDiscount, setNewDiscount] = useState({ code: "", percentage: "" });
//   const [editingDiscount, setEditingDiscount] = useState(null);

//   const [payName, setPayName] = useState(user?.name || "");
//   const [payEmail, setPayEmail] = useState(user?.email || "");
//   const [payAmount, setPayAmount] = useState("");

//   // Fetch all data
//   useEffect(() => {
//     const fetchData = async () => {
//       const [plansData, refsData, discData] = await Promise.all([
//         getPlans(),
//         getReferrals(),
//         getDiscounts(),
//       ]);
//       setPlans(plansData || []);
//       setReferrals(refsData || []);
//       setDiscounts(discData?.discounts || []);
//     };
//     fetchData();
//   }, []);

//   /* =====================================================
//       SUBSCRIPTION PLANS CRUD
//   ===================================================== */
//   const handleCreatePlan = async () => {
//     if (!newPlan.name || !newPlan.amount)
//       return alert("Name & Amount required");
//     await createPlan(newPlan);
//     setNewPlan({ name: "", amount: "", interval: "monthly" });
//     setPlans(await getPlans());
//   };

//   const handleUpdatePlan = async () => {
//     if (!editingPlan) return;
//     await updatePlan(editingPlan._id, editingPlan);
//     setEditingPlan(null);
//     setPlans(await getPlans());
//   };

//   const handleEditPlan = (plan) => setEditingPlan({ ...plan });

//   const handleDeletePlan = async (id) => {
//     if (window.confirm("Delete this plan?")) {
//       await deletePlan(id);
//       setPlans(await getPlans());
//     }
//   };

//   /* =====================================================
//       REFERRALS (Approve / Delete)
//   ===================================================== */
//   const handleApproveReferral = async (id) => {
//     await approveReferral(id);
//     setReferrals(await getReferrals());
//   };

//   const handleDeleteReferral = async (id) => {
//     if (window.confirm("Delete this referral?")) {
//       await deleteReferral(id);
//       setReferrals(await getReferrals());
//     }
//   };

//   /* =====================================================
//       DISCOUNTS CRUD
//   ===================================================== */
//   const handleCreateDiscount = async () => {
//     if (!newDiscount.code || !newDiscount.percentage)
//       return alert("Code & Percentage required");
//     await createDiscount({
//       code: newDiscount.code,
//       discountPercentage: newDiscount.percentage,
//     });
//     setNewDiscount({ code: "", percentage: "" });
//     setDiscounts((await getDiscounts()).discounts || []);
//   };

//   const handleEditDiscount = (discount) => setEditingDiscount({ ...discount });

//   const handleUpdateDiscount = async () => {
//     if (!editingDiscount) return;
//     await updateDiscount(editingDiscount._id, editingDiscount);
//     setEditingDiscount(null);
//     setDiscounts((await getDiscounts()).discounts || []);
//   };

//   const handleDeleteDiscount = async (id) => {
//     if (window.confirm("Delete this discount?")) {
//       await deleteDiscount(id);
//       setDiscounts((await getDiscounts()).discounts || []);
//     }
//   };

//   /* =====================================================
//       RAZORPAY PAYMENT
//   ===================================================== */
//   const handlePayment = async () => {
//     if (!payName || !payEmail || !payAmount)
//       return alert("All fields required");
//     if (!user || !user._id) return alert("User not found — please log in first.");

//     try {
//       const cleanAmount = Number(payAmount);
//       if (isNaN(cleanAmount) || cleanAmount <= 0)
//         return alert("Invalid amount");

//       const response = await createOrder({
//         amount: cleanAmount,
//         userId: user._id,
//       });
//       if (!response?.success || !response?.order)
//         return alert("Order creation failed!");

//       const order = response.order;
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Astrology App",
//         description: "Payment for Astrology Services",
//         order_id: order.id,
//         handler: async function (res) {
//           alert("Payment successful!");
//           await verifyPayment({
//             razorpay_order_id: res.razorpay_order_id,
//             razorpay_payment_id: res.razorpay_payment_id,
//             razorpay_signature: res.razorpay_signature,
//             amount: cleanAmount,
//             userId: user._id,
//           });
//         },
//         prefill: {
//           name: payName,
//           email: payEmail,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", () =>
//         alert("Payment failed. Please try again.")
//       );
//       rzp.open();
//     } catch {
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="wallet-container">
//       <h1>Wallet & Payment Dashboard</h1>

//       {/* ===== PLANS CRUD ===== */}
//       <section className="card">
//         <h2>Subscription Plans</h2>

//         {editingPlan ? (
//           <div className="form-inline">
//             <input
//               value={editingPlan.name}
//               onChange={(e) =>
//                 setEditingPlan({ ...editingPlan, name: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               value={editingPlan.amount}
//               onChange={(e) =>
//                 setEditingPlan({ ...editingPlan, amount: e.target.value })
//               }
//             />
//             <select
//               value={editingPlan.interval}
//               onChange={(e) =>
//                 setEditingPlan({ ...editingPlan, interval: e.target.value })
//               }
//             >
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             <button onClick={handleUpdatePlan}>Save</button>
//             <button onClick={() => setEditingPlan(null)}>Cancel</button>
//           </div>
//         ) : (
//           <div className="form-inline">
//             <input
//               placeholder="Name"
//               value={newPlan.name}
//               onChange={(e) =>
//                 setNewPlan({ ...newPlan, name: e.target.value })
//               }
//             />
//             <input
//               placeholder="Amount"
//               type="number"
//               value={newPlan.amount}
//               onChange={(e) =>
//                 setNewPlan({ ...newPlan, amount: e.target.value })
//               }
//             />
//             <select
//               value={newPlan.interval}
//               onChange={(e) =>
//                 setNewPlan({ ...newPlan, interval: e.target.value })
//               }
//             >
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             <button onClick={handleCreatePlan}>Add Plan</button>
//           </div>
//         )}

//         <ul>
//           {plans.length > 0 ? (
//             plans.map((p) => (
//               <li key={p._id}>
//                 {p.name} - ₹{p.amount}/{p.interval}{" "}
//                 <button onClick={() => handleEditPlan(p)}>Edit</button>
//                 <button onClick={() => handleDeletePlan(p._id)}>Delete</button>
//               </li>
//             ))
//           ) : (
//             <li>No plans available</li>
//           )}
//         </ul>
//       </section>

//       {/* ===== REFERRALS ===== */}
//       <section className="card">
//         <h2>Referrals</h2>
//         <ul>
//           {referrals.length > 0 ? (
//             referrals.map((r) => (
//               <li key={r._id}>
//                 {r.code} - {r.approved ? "✅ Approved" : "❌ Pending"}{" "}
//                 {!r.approved && (
//                   <button onClick={() => handleApproveReferral(r._id)}>
//                     Approve
//                   </button>
//                 )}{" "}
//                 <button onClick={() => handleDeleteReferral(r._id)}>
//                   Delete
//                 </button>{" "}
//                 | User: {r.user?.name} ({r.user?.email})
//               </li>
//             ))
//           ) : (
//             <li>No referrals found.</li>
//           )}
//         </ul>
//       </section>

//       {/* ===== DISCOUNTS CRUD ===== */}
//       <section className="card">
//         <h2>Discounts</h2>

//         {editingDiscount ? (
//           <div className="form-inline">
//             <input
//               value={editingDiscount.code}
//               onChange={(e) =>
//                 setEditingDiscount({ ...editingDiscount, code: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               value={editingDiscount.discountPercentage}
//               onChange={(e) =>
//                 setEditingDiscount({
//                   ...editingDiscount,
//                   discountPercentage: e.target.value,
//                 })
//               }
//             />
//             <button onClick={handleUpdateDiscount}>Save</button>
//             <button onClick={() => setEditingDiscount(null)}>Cancel</button>
//           </div>
//         ) : (
//           <div className="form-inline">
//             <input
//               placeholder="Code"
//               value={newDiscount.code}
//               onChange={(e) =>
//                 setNewDiscount({ ...newDiscount, code: e.target.value })
//               }
//             />
//             <input
//               placeholder="Percentage"
//               type="number"
//               value={newDiscount.percentage}
//               onChange={(e) =>
//                 setNewDiscount({ ...newDiscount, percentage: e.target.value })
//               }
//             />
//             <button onClick={handleCreateDiscount}>Add Discount</button>
//           </div>
//         )}

//         <ul>
//           {discounts.length > 0 ? (
//             discounts.map((d) => (
//               <li key={d._id}>
//                 {d.code} - {d.discountPercentage}%{" "}
//                 <button onClick={() => handleEditDiscount(d)}>Edit</button>
//                 <button onClick={() => handleDeleteDiscount(d._id)}>
//                   Delete
//                 </button>
//               </li>
//             ))
//           ) : (
//             <li>No discounts found.</li>
//           )}
//         </ul>
//       </section>

//       {/* ===== PAYMENT ===== */}
//       <section className="card">
//         <h2>Make Payment</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Name"
//             value={payName}
//             onChange={(e) => setPayName(e.target.value)}
//           />
//           <input
//             placeholder="Email"
//             value={payEmail}
//             onChange={(e) => setPayEmail(e.target.value)}
//           />
//           <input
//             placeholder="Amount"
//             type="number"
//             value={payAmount}
//             onChange={(e) => setPayAmount(e.target.value)}
//           />
//           <button onClick={handlePayment}>Pay Now</button>
//         </div>
//       </section>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   getPlans,
//   createPlan,
//   updatePlan,
//   deletePlan,
//   getReferrals,
//   approveReferral,
//   deleteReferral,
// } from "../api/subscriptionApi";
// import { createOrder, verifyPayment } from "../api/paymentApi";
// import {
//   getDiscounts,
//   createDiscount,
//   updateDiscount,
//   deleteDiscount,
// } from "../api/discountApi";
// import "./WalletPage.css";

// export default function WalletPage({ user }) {
//   const [plans, setPlans] = useState([]);
//   const [newPlan, setNewPlan] = useState({
//     name: "",
//     amount: "",
//     interval: "monthly",
//   });
//   const [editingPlan, setEditingPlan] = useState(null);

//   const [referrals, setReferrals] = useState([]);
//   const [discounts, setDiscounts] = useState([]);
//   const [newDiscount, setNewDiscount] = useState({ code: "", percentage: "" });
//   const [editingDiscount, setEditingDiscount] = useState(null);

//   const [payName, setPayName] = useState(user?.name || "");
//   const [payEmail, setPayEmail] = useState(user?.email || "");
//   const [payAmount, setPayAmount] = useState("");

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       const [plansData, refsData, discData] = await Promise.all([
//         getPlans(),
//         getReferrals(),
//         getDiscounts(),
//       ]);
//       setPlans(plansData || []);
//       setReferrals(refsData || []);
//       setDiscounts(discData?.discounts || []);
//     };
//     fetchData();
//   }, []);

//   /* ============= PLAN CRUD ============= */
//   const handleCreatePlan = async () => {
//     if (!newPlan.name || !newPlan.amount) return alert("Name & Amount required");
//     await createPlan(newPlan);
//     setNewPlan({ name: "", amount: "", interval: "monthly" });
//     setPlans(await getPlans());
//   };

//   const handleEditPlan = (plan) => setEditingPlan({ ...plan });

//   const handleUpdatePlan = async () => {
//     await updatePlan(editingPlan._id, editingPlan);
//     setEditingPlan(null);
//     setPlans(await getPlans());
//   };

//   const handleDeletePlan = async (id) => {
//     if (window.confirm("Delete this plan?")) {
//       await deletePlan(id);
//       setPlans(await getPlans());
//     }
//   };

//   /* ============= REFERRALS ============= */
//   const handleApproveReferral = async (id) => {
//     await approveReferral(id);
//     setReferrals(await getReferrals());
//   };

//   const handleDeleteReferral = async (id) => {
//     if (window.confirm("Delete this referral?")) {
//       await deleteReferral(id);
//       setReferrals(await getReferrals());
//     }
//   };

//   /* ============= DISCOUNTS CRUD ============= */
//   const handleCreateDiscount = async () => {
//     if (!newDiscount.code || !newDiscount.percentage)
//       return alert("Code & Percentage required");
//     await createDiscount({
//       code: newDiscount.code,
//       discountPercentage: newDiscount.percentage,
//     });
//     setNewDiscount({ code: "", percentage: "" });
//     setDiscounts((await getDiscounts()).discounts || []);
//   };

//   const handleEditDiscount = (d) => setEditingDiscount({ ...d });

//   const handleUpdateDiscount = async () => {
//     await updateDiscount(editingDiscount._id, editingDiscount);
//     setEditingDiscount(null);
//     setDiscounts((await getDiscounts()).discounts || []);
//   };

//   const handleDeleteDiscount = async (id) => {
//     if (window.confirm("Delete this discount?")) {
//       await deleteDiscount(id);
//       setDiscounts((await getDiscounts()).discounts || []);
//     }
//   };

//   /* ============= PAYMENT ============= */
//   const handlePayment = async () => {
//     if (!payName || !payEmail || !payAmount)
//       return alert("All fields required");

//     try {
//       const amount = Number(payAmount);
//       const response = await createOrder({ amount, userId: user?._id });
//       if (!response?.success) return alert("Order failed");

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: response.order.amount,
//         currency: response.order.currency,
//         name: "Astrology App",
//         order_id: response.order.id,
//         handler: async (res) => {
//           alert("Payment success!");
//           await verifyPayment({
//             ...res,
//             amount,
//             userId: user._id,
//           });
//         },
//       });
//       rzp.open();
//     } catch (e) {
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="wallet-container">
//       <h1>💰 Wallet & Payment Dashboard</h1>

//       {/* ===================== PLANS TABLE ===================== */}
//       <section className="card">
//         <h2>📦 Subscription Plans</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Name"
//             value={newPlan.name}
//             onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
//           />
//           <input
//             placeholder="Amount"
//             type="number"
//             value={newPlan.amount}
//             onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
//           />
//           <select
//             value={newPlan.interval}
//             onChange={(e) => setNewPlan({ ...newPlan, interval: e.target.value })}
//           >
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//           </select>
//           <button onClick={handleCreatePlan}>Add</button>
//         </div>

//         <table className="crud-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Amount (₹)</th>
//               <th>Interval</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plans.length > 0 ? (
//               plans.map((p) =>
//                 editingPlan?._id === p._id ? (
//                   <tr key={p._id}>
//                     <td>
//                       <input
//                         value={editingPlan.name}
//                         onChange={(e) =>
//                           setEditingPlan({ ...editingPlan, name: e.target.value })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={editingPlan.amount}
//                         onChange={(e) =>
//                           setEditingPlan({
//                             ...editingPlan,
//                             amount: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <select
//                         value={editingPlan.interval}
//                         onChange={(e) =>
//                           setEditingPlan({
//                             ...editingPlan,
//                             interval: e.target.value,
//                           })
//                         }
//                       >
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="yearly">Yearly</option>
//                       </select>
//                     </td>
//                     <td>
//                       <button onClick={handleUpdatePlan}>💾 Save</button>
//                       <button onClick={() => setEditingPlan(null)}>✖ Cancel</button>
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr key={p._id}>
//                     <td>{p.name}</td>
//                     <td>{p.amount}</td>
//                     <td>{p.interval}</td>
//                     <td>
//                       <button onClick={() => handleEditPlan(p)}>✏ Edit</button>
//                       <button onClick={() => handleDeletePlan(p._id)}>🗑 Delete</button>
//                     </td>
//                   </tr>
//                 )
//               )
//             ) : (
//               <tr>
//                 <td colSpan="4">No Plans Available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* ===================== REFERRALS TABLE ===================== */}
//       <section className="card">
//         <h2>🎯 Referrals</h2>
//         <table className="crud-table">
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Status</th>
//               <th>User</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {referrals.length > 0 ? (
//               referrals.map((r) => (
//                 <tr key={r._id}>
//                   <td>{r.code}</td>
//                   <td>{r.approved ? "✅ Approved" : "❌ Pending"}</td>
//                   <td>{r.user?.name || "N/A"}</td>
//                   <td>
//                     {!r.approved && (
//                       <button onClick={() => handleApproveReferral(r._id)}>✔ Approve</button>
//                     )}
//                     <button onClick={() => handleDeleteReferral(r._id)}>🗑 Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No Referrals Found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* ===================== DISCOUNTS TABLE ===================== */}
//       <section className="card">
//         <h2>🏷 Discounts</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Code"
//             value={newDiscount.code}
//             onChange={(e) =>
//               setNewDiscount({ ...newDiscount, code: e.target.value })
//             }
//           />
//           <input
//             placeholder="Percentage"
//             type="number"
//             value={newDiscount.percentage}
//             onChange={(e) =>
//               setNewDiscount({ ...newDiscount, percentage: e.target.value })
//             }
//           />
//           <button onClick={handleCreateDiscount}>Add</button>
//         </div>

//         <table className="crud-table">
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Discount %</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {discounts.length > 0 ? (
//               discounts.map((d) =>
//                 editingDiscount?._id === d._id ? (
//                   <tr key={d._id}>
//                     <td>
//                       <input
//                         value={editingDiscount.code}
//                         onChange={(e) =>
//                           setEditingDiscount({
//                             ...editingDiscount,
//                             code: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={editingDiscount.discountPercentage}
//                         onChange={(e) =>
//                           setEditingDiscount({
//                             ...editingDiscount,
//                             discountPercentage: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <button onClick={handleUpdateDiscount}>💾 Save</button>
//                       <button onClick={() => setEditingDiscount(null)}>
//                         ✖ Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr key={d._id}>
//                     <td>{d.code}</td>
//                     <td>{d.discountPercentage}</td>
//                     <td>
//                       <button onClick={() => handleEditDiscount(d)}>✏ Edit</button>
//                       <button onClick={() => handleDeleteDiscount(d._id)}>🗑 Delete</button>
//                     </td>
//                   </tr>
//                 )
//               )
//             ) : (
//               <tr>
//                 <td colSpan="3">No Discounts Available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* ===================== PAYMENT ===================== */}
//       <section className="card">
//         <h2>💳 Make Payment</h2>
//         <div className="form-inline">
//           <input
//             placeholder="Name"
//             value={payName}
//             onChange={(e) => setPayName(e.target.value)}
//           />
//           <input
//             placeholder="Email"
//             value={payEmail}
//             onChange={(e) => setPayEmail(e.target.value)}
//           />
//           <input
//             placeholder="Amount"
//             type="number"
//             value={payAmount}
//             onChange={(e) => setPayAmount(e.target.value)}
//           />
//           <button onClick={handlePayment}>Pay Now</button>
//         </div>
//       </section>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  getReferrals,
  approveReferral,
  deleteReferral,
} from "../api/subscriptionApi";
import { createOrder, verifyPayment } from "../api/paymentApi";
import {
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from "../api/discountApi";
import "./WalletPage.css";

export default function WalletPage({ user: propUser }) {
  // ✅ Auto load user
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    if (!propUser) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
        console.log("✅ Loaded user from localStorage:", savedUser);
      } else {
        console.warn("⚠ No user found in props or localStorage.");
      }
    }
  }, [propUser]);

  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: "", amount: "", interval: "monthly" });
  const [editingPlan, setEditingPlan] = useState(null);

  const [referrals, setReferrals] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({ code: "", percentage: "" });
  const [editingDiscount, setEditingDiscount] = useState(null);

  const [payName, setPayName] = useState("");
  const [payEmail, setPayEmail] = useState("");
  const [payAmount, setPayAmount] = useState("");

  // 🧩 Auto-fill name/email once user loads
  useEffect(() => {
    if (user) {
      setPayName(user.name || "");
      setPayEmail(user.email || "");
    }
  }, [user]);

  // ✅ Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const [plansData, refsData, discData] = await Promise.all([
        getPlans(),
        getReferrals(),
        getDiscounts(),
      ]);
      setPlans(plansData || []);
      setReferrals(refsData || []);
      setDiscounts(discData?.discounts || []);
    };
    fetchData();
  }, []);

  /* ===========================================================
     🔹 PLANS CRUD
  =========================================================== */
  const handleCreatePlan = async () => {
    if (!newPlan.name || !newPlan.amount) return alert("Name & Amount required");
    await createPlan(newPlan);
    setNewPlan({ name: "", amount: "", interval: "monthly" });
    setPlans(await getPlans());
  };

  const handleEditPlan = (plan) => setEditingPlan({ ...plan });
  const handleUpdatePlan = async () => {
    await updatePlan(editingPlan._id, editingPlan);
    setEditingPlan(null);
    setPlans(await getPlans());
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm("Delete this plan?")) {
      await deletePlan(id);
      setPlans(await getPlans());
    }
  };

  /* ===========================================================
     🔹 REFERRALS
  =========================================================== */
  const handleApproveReferral = async (id) => {
    await approveReferral(id);
    setReferrals(await getReferrals());
  };

  const handleDeleteReferral = async (id) => {
    if (window.confirm("Delete this referral?")) {
      await deleteReferral(id);
      setReferrals(await getReferrals());
    }
  };

  /* ===========================================================
     🔹 DISCOUNTS CRUD
  =========================================================== */
  const handleCreateDiscount = async () => {
    if (!newDiscount.code || !newDiscount.percentage)
      return alert("Code & Percentage required");
    await createDiscount({
      code: newDiscount.code,
      discountPercentage: newDiscount.percentage,
    });
    setNewDiscount({ code: "", percentage: "" });
    setDiscounts((await getDiscounts()).discounts || []);
  };

  const handleEditDiscount = (d) => setEditingDiscount({ ...d });
  const handleUpdateDiscount = async () => {
    await updateDiscount(editingDiscount._id, editingDiscount);
    setEditingDiscount(null);
    setDiscounts((await getDiscounts()).discounts || []);
  };

  const handleDeleteDiscount = async (id) => {
    if (window.confirm("Delete this discount?")) {
      await deleteDiscount(id);
      setDiscounts((await getDiscounts()).discounts || []);
    }
  };

  /* ===========================================================
     💳 PAYMENT (FIXED VERSION)
  =========================================================== */
  const handlePayment = async () => {
    console.log("🧑‍💻 User before payment:", user);

    if (!payName || !payEmail || !payAmount)
      return alert("All fields required");

    const testUserId = "672af93b9cf24a87a0c5f8de"; // fallback for testing
    const userId = user?._id || testUserId;

    try {
      const amount = Number(payAmount);
      if (isNaN(amount) || amount <= 0) return alert("Invalid amount");

      const response = await createOrder({ amount, userId });
      console.log("📦 Order Response:", response);

      if (!response?.success || !response?.order)
        return alert("Order creation failed!");

      const rzp = new window.Razorpay({
        // key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: response.order.amount,
        currency: response.order.currency,
        name: "Astrology App",
        description: "Astrology Services Payment",
        order_id: response.order.id,
        handler: async (res) => {
          alert("✅ Payment Successful!");
          await verifyPayment({
            ...res,
            amount,
            userId,
          });
        },
        prefill: {
          name: payName,
          email: payEmail,
        },
        theme: { color: "#3399cc" },
      });

      rzp.on("payment.failed", function (err) {
        console.error("❌ Payment failed:", err.error);
        alert("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (e) {
      console.error("❌ Payment Error:", e);
      alert("Payment failed, check console logs.");
    }
  };

  return (
    <div className="wallet-container">
      <h1>💰 Wallet & Payment Dashboard</h1>

      {/* ✅ Show logged-in user */}
      {user ? (
        <div className="user-card">
          <strong>Logged in as:</strong> {user.name} ({user.email})
        </div>
      ) : (
        <div className="user-card warning">⚠ Please log in first</div>
      )}

      {/* ===================== PLANS ===================== */}
      <section className="card">
        <h2>📦 Subscription Plans</h2>
        <div className="form-inline">
          <input
            placeholder="Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          />
          <input
            placeholder="Amount"
            type="number"
            value={newPlan.amount}
            onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
          />
          <select
            value={newPlan.interval}
            onChange={(e) => setNewPlan({ ...newPlan, interval: e.target.value })}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button onClick={handleCreatePlan}>Add</button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount (₹)</th>
              <th>Interval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length > 0 ? (
              plans.map((p) =>
                editingPlan?._id === p._id ? (
                  <tr key={p._id}>
                    <td>
                      <input
                        value={editingPlan.name}
                        onChange={(e) =>
                          setEditingPlan({ ...editingPlan, name: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingPlan.amount}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            amount: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={editingPlan.interval}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            interval: e.target.value,
                          })
                        }
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdatePlan}>💾 Save</button>
                      <button onClick={() => setEditingPlan(null)}>✖ Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.amount}</td>
                    <td>{p.interval}</td>
                    <td>
                      <button onClick={() => handleEditPlan(p)}>✏ Edit</button>
                      <button onClick={() => handleDeletePlan(p._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="4">No Plans Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ===================== REFERRALS ===================== */}
      <section className="card">
        <h2>🎯 Referrals</h2>
        <table className="crud-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Status</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {referrals.length > 0 ? (
              referrals.map((r) => (
                <tr key={r._id}>
                  <td>{r.code}</td>
                  <td>{r.approved ? "✅ Approved" : "❌ Pending"}</td>
                  <td>{r.user?.name || "N/A"}</td>
                  <td>
                    {!r.approved && (
                      <button onClick={() => handleApproveReferral(r._id)}>✔ Approve</button>
                    )}
                    <button onClick={() => handleDeleteReferral(r._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Referrals Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ===================== DISCOUNTS ===================== */}
      <section className="card">
        <h2>🏷 Discounts</h2>
        <div className="form-inline">
          <input
            placeholder="Code"
            value={newDiscount.code}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, code: e.target.value })
            }
          />
          <input
            placeholder="Percentage"
            type="number"
            value={newDiscount.percentage}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, percentage: e.target.value })
            }
          />
          <button onClick={handleCreateDiscount}>Add</button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount %</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.length > 0 ? (
              discounts.map((d) =>
                editingDiscount?._id === d._id ? (
                  <tr key={d._id}>
                    <td>
                      <input
                        value={editingDiscount.code}
                        onChange={(e) =>
                          setEditingDiscount({
                            ...editingDiscount,
                            code: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingDiscount.discountPercentage}
                        onChange={(e) =>
                          setEditingDiscount({
                            ...editingDiscount,
                            discountPercentage: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdateDiscount}>💾 Save</button>
                      <button onClick={() => setEditingDiscount(null)}>
                        ✖ Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={d._id}>
                    <td>{d.code}</td>
                    <td>{d.discountPercentage}</td>
                    <td>
                      <button onClick={() => handleEditDiscount(d)}>✏ Edit</button>
                      <button onClick={() => handleDeleteDiscount(d._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="3">No Discounts Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ===================== PAYMENT ===================== */}
      <section className="card">
        <h2>💳 Make Payment</h2>
        <div className="form-inline">
          <input
            placeholder="Name"
            value={payName}
            onChange={(e) => setPayName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={payEmail}
            onChange={(e) => setPayEmail(e.target.value)}
          />
          <input
            placeholder="Amount"
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
          />
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      </section>
      
    </div>
  );
}
