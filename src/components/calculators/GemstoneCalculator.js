import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/calculator.css';

export default function GemstoneCalculator({ token }) {
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(
        'https://adminastrotalk-1.onrender.com/api/calculators/gemstone',
        { dob, time, place },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.result);
    } catch (err) {
      setResult({ error: err?.response?.data?.message || 'Error calculating gemstone' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Gemstone Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

        <label>Time of Birth</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <label>Place of Birth</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className="result-box">
          {typeof result === 'string' && <p>{result}</p>}

          {typeof result === 'object' && !result.error && (
            <>
              <p><strong>Recommended Gemstone:</strong> {result.gemstone}</p>
              <p><strong>Reason:</strong> {result.reason}</p>
            </>
          )}

          {result.error && <p className="error-message">{result.error}</p>}
        </div>
      )}
    </div>
  );
}
