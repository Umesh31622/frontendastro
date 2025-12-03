import React, { useState } from "react";
import axios from "axios";
import "../../styles/calculator.css";

export default function TransitRemedyCalculator({ token }) {
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "https://adminastrotalk-1.onrender.com/api/calculators/transit-remedy",
        { dob, time, place },
        {
          headers: token
            ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            : { "Content-Type": "application/json" },
        }
      );

      const data = res.data.result || res.data;
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        error: err?.response?.data?.message || "Error fetching transit remedies",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderResult = (data) => {
    if (!data) return null;

    if (typeof data === "string") return <p>{data}</p>;

    if (data.error) return <p className="error-message">{data.error}</p>;

    if (typeof data === "object") {
      return (
        <div>
          {data.title && (
            <p>
              <strong>Title:</strong> {data.title}
            </p>
          )}
          {data.remedies && (
            <div>
              <strong>Remedies:</strong>
              <ul>
                {Array.isArray(data.remedies)
                  ? data.remedies.map((item, i) => <li key={i}>{item}</li>)
                  : Object.entries(data.remedies).map(([k, v]) => (
                      <li key={k}>
                        <strong>{k}:</strong> {v}
                      </li>
                    ))}
              </ul>
            </div>
          )}
          {data.suggestions && (
            <div>
              <strong>Suggestions:</strong>
              <p>{data.suggestions}</p>
            </div>
          )}

          {Object.keys(data)
            .filter((key) => !["title", "remedies", "suggestions", "error"].includes(key))
            .map((key) => (
              <p key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                {typeof data[key] === "object"
                  ? JSON.stringify(data[key], null, 2)
                  : String(data[key])}
              </p>
            ))}
        </div>
      );
    }

    return <p>{String(data)}</p>;
  };

  return (
    <div className="calculator-container">
      <h2>Transit Remedies / Suggestions</h2>
      <form onSubmit={handleSubmit}>
        <label>Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <label>Time of Birth</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <label>Place of Birth</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="City, Country"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Get Transit Remedies"}
        </button>
      </form>

      {result && (
        <div className="result-box">
          <div className="result-content">{renderResult(result)}</div>
        </div>
      )}
    </div>
  );
}
