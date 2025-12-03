import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminCalculators.css";

export default function AdminCalculators() {
  const [calculators, setCalculators] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewCalculator, setPreviewCalculator] = useState(null);

  const limit = 5;
  const total = calculators.length;
  const totalPages = Math.ceil(total / limit);

  const formulaOptions = [
    "Sum", "Difference", "Product", "Division",
    "Percentage", "Zodiac Calculation", "Numerology Life Path"
  ];

  // Mock fetch (replace with API)
  useEffect(() => {
    setCalculators([
      { _id: "1", name: "Zodiac Calc", type: "zodiac", description: "Zodiac Sign Calc", formula: "Zodiac Calculation", active: true },
      { _id: "2", name: "Life Path", type: "numerology", description: "Numerology Calculation", formula: "Numerology Life Path", active: false },
      { _id: "3", name: "Addition", type: "numerology", description: "Add numbers", formula: "Sum", active: true },
    ]);
  }, []);

  // Handle row actions
  const handleAction = (action, calc) => {
    switch (action) {
      case "edit":
        alert("Edit: " + calc.name);
        break;
      case "preview":
        setPreviewCalculator(calc);
        break;
      case "delete":
        if (window.confirm(`Delete ${calc.name}?`)) {
          setCalculators(prev => prev.filter(c => c._id !== calc._id));
        }
        break;
      case "toggle":
        setCalculators(prev => prev.map(c => c._id === calc._id ? { ...c, active: !c.active } : c));
        break;
      default:
        break;
    }
  };

  const handleFormulaChange = (calcId, formula) => {
    setCalculators(prev => prev.map(c => c._id === calcId ? { ...c, formula } : c));
  };

  const exportCSV = () => {
    const csv = [
      ["Name", "Type", "Description", "Formula", "Active"],
      ...calculators.map(c => [c.name, c.type, c.description, c.formula, c.active])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "calculators.csv");
    link.click();
  };

  return (
    <div className="admin-calculators">
      <h2>Calculators Management</h2>

      {/* Search & Filters */}
      <div className="search-filter">
        <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="numerology">Numerology</option>
          <option value="zodiac">Zodiac</option>
        </select>
        <div className="global-actions">
          <button onClick={() => setShowAddForm(!showAddForm)}>+ Add</button>
          <button onClick={() => setPreviewCalculator({ name: "All Calculators Preview" })}>Preview</button>
          <button onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {/* Add Calculator Form */}
      {showAddForm && (
        <div className="form-row">
          <input placeholder="Name" />
          <input placeholder="Type" />
          <input placeholder="Description" />
          <select className="formula-dropdown">
            {formulaOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            Active:
            <input type="checkbox" />
          </label>
          <div className="input-buttons">
            <button onClick={() => alert("Input added!")}>+ Add Input</button>
            <button onClick={() => alert("Preview input!")}>Preview</button>
            <button onClick={() => alert("Calculator added!")}>Add</button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewCalculator && (
        <div className="preview-modal">
          <div className="preview-content">
            <h3>Preview: {previewCalculator.name}</h3>
            <pre>{JSON.stringify(previewCalculator, null, 2)}</pre>
            <button onClick={() => setPreviewCalculator(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="calc-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Formula</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calculators.slice((page-1)*limit, page*limit).map(calc => (
            <tr key={calc._id} className={calc.active ? "" : "inactive"}>
              <td>{calc.name}</td>
              <td>{calc.type}</td>
              <td>{calc.description}</td>
              <td>
                <select className="formula-dropdown" value={calc.formula} onChange={e => handleFormulaChange(calc._id, e.target.value)}>
                  {formulaOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </td>
              <td>
                <input type="checkbox" checked={calc.active} onChange={() => handleAction("toggle", calc)} />
              </td>
              <td className="actions-cell">
                <button className="action-btn edit" onClick={() => handleAction("edit", calc)}>Edit</button>
                <button className="action-btn preview" onClick={() => handleAction("preview", calc)}>Preview</button>
                <button className="action-btn delete" onClick={() => handleAction("delete", calc)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
