
// import React, { useState } from "react";
// import axios from "axios";
//  import "../../styles/PanchangCalculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// export default function PanchangCalculator() {
//   const [form, setForm] = useState({ date: "", lat: "", lon: "" });
//   const [panchang, setPanchang] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const fetchPanchang = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/panchang`, { params: form });
//       setPanchang(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch Panchang");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="calculator-container">
//       <h2>Panchang Calculator</h2>

//       <form className="calculator-form" onSubmit={fetchPanchang}>
//         <input type="date" name="date" value={form.date} onChange={handleChange} required />
//         <input type="number" name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} required step="0.0001"/>
//         <input type="number" name="lon" placeholder="Longitude" value={form.lon} onChange={handleChange} required step="0.0001"/>
//         <button type="submit">{loading ? "Fetching..." : "Get Panchang"}</button>
//       </form>

//       {panchang && (
//         <div className="panchang-result">
//           <h3>Panchang for {form.date}</h3>
//           <p><strong>Tithi:</strong> {panchang.tithi.name}</p>
//           <p><strong>Nakshatra:</strong> {panchang.nakshatra.name}</p>
//           <p><strong>Yoga:</strong> {panchang.yoga.name}</p>
//           <p><strong>Karana:</strong> {panchang.karana.name}</p>
//           <p><strong>Sunrise:</strong> {panchang.sunrise}</p>
//           <p><strong>Sunset:</strong> {panchang.sunset}</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import "../../styles/PanchangCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function PanchangCalculator() {
  const [form, setForm] = useState({ city: "", date: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_BASE}/panchang`, form);
      setResult(res.data);
    } catch (err) {
      console.error("❌ Panchang Error:", err.response?.data?.error || err.message);
      alert(err.response?.data?.error || "Failed to fetch Panchang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <h2>🪔 Panchang Calculator</h2>
      <form className="calculator-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="City Name"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Get Panchang"}
        </button>
      </form>

      {result && (
        <div className="panchang-result">
          {Object.keys(result).map((key) => (
            <div key={key} className="panchang-item">
              <strong>{key}:</strong> {JSON.stringify(result[key])}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}