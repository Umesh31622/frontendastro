// import React, { useState } from "react";
// import API from "../api";
// import "../styles/Feedback.css";

// export default function FeedbackForm() {
//   const [form, setForm] = useState({ name: "", email: "", message: "", service: "", rating: 5 });
//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/feedbacks", form);
//       setMsg(res.data.message || "Feedback submitted successfully!");
//       setForm({ name: "", email: "", message: "", service: "", rating: 5 });
//     } catch (err) {
//       setMsg("Error submitting feedback");
//     }
//   };

//   return (
//     <div className="feedback-container">
//       <h2>Submit Your Feedback</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="service" placeholder="Service (optional)" value={form.service} onChange={handleChange} />
//         <select name="rating" value={form.rating} onChange={handleChange}>
//           {[1, 2, 3, 4, 5].map((r) => (
//             <option key={r} value={r}>
//               {r} Star{r > 1 && "s"}
//             </option>
//           ))}
//         </select>
//         <textarea
//           name="message"
//           placeholder="Your message"
//           value={form.message}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <button type="submit">Submit</button>
//       </form>
//       {msg && <p className="msg">{msg}</p>}
//     </div>
//   );
// }

import React, { useState } from "react";
import API from "../api";
import "../styles/Feedback.css";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", service: "", rating: 5 });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/feedback", form); // singular 'feedback'
      setMsg("Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "", service: "", rating: 5 });
    } catch (err) {
      console.error(err);
      setMsg("Error submitting feedback");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="service" placeholder="Service (optional)" value={form.service} onChange={handleChange} />
        <select name="rating" value={form.rating} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>
        <textarea name="message" placeholder="Your message" value={form.message} onChange={handleChange} required></textarea>
        <button type="submit">Submit</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
