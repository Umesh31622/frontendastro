import React, { useState } from "react";

export default function FormulaTester({ calculators }) {
  const [selected, setSelected] = useState(null);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleTest = () => {
    if (!selected) return;
    try {
      const fn = new Function(...selected.inputs.map(i => i.name), `return ${selected.formula};`);
      const args = selected.inputs.map(i => i.type === "number" ? Number(inputs[i.name] || 0) : inputs[i.name] || "");
      setResult(fn(...args));
    } catch {
      setResult("Error in formula");
    }
  };

  return (
    <div className="formula-tester">
      <h3>Formula Tester</h3>
      <select onChange={(e) => { const calc = calculators.find(c => c._id === e.target.value); setSelected(calc); setInputs({}); setResult(null); }}>
        <option value="">Select Calculator</option>
        {calculators.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>

      {selected && (
        <div className="tester-inputs">
          {selected.inputs.map(i => (
            <input key={i.name} type={i.type==="number"?"number":"text"} placeholder={i.name} value={inputs[i.name]||""} onChange={e=>setInputs({...inputs,[i.name]:e.target.value})}/>
          ))}
          <button onClick={handleTest}>Calculate</button>
          {result!==null && <div className="result">Result: {result}</div>}
        </div>
      )}
    </div>
  );
}
