import React, { useState, useEffect } from "react";
import { getDiscounts, createDiscount, updateDiscount, deleteDiscount } from "../api/discountApi";

export default function DiscountManager() {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({ code: "", percentage: 0, usageLimit: 1 });
  const [editingId, setEditingId] = useState(null);

  const fetchDiscounts = async () => {
    const data = await getDiscounts();
    setDiscounts(data);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!newDiscount.code || !newDiscount.percentage) return alert("Fill all fields");
    if (editingId) {
      await updateDiscount(editingId, newDiscount);
      setEditingId(null);
    } else {
      await createDiscount(newDiscount);
    }
    setNewDiscount({ code: "", percentage: 0, usageLimit: 1 });
    fetchDiscounts();
  };

  const handleEdit = (discount) => {
    setNewDiscount({ code: discount.code, percentage: discount.percentage, usageLimit: discount.usageLimit });
    setEditingId(discount._id);
  };

  const handleDelete = async (id) => {
    await deleteDiscount(id);
    fetchDiscounts();
  };

  return (
    <div>
      <h2>Discount Codes</h2>
      <input
        placeholder="Code"
        value={newDiscount.code}
        onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
      />
      <input
        type="number"
        placeholder="%"
        value={newDiscount.percentage}
        onChange={(e) => setNewDiscount({ ...newDiscount, percentage: e.target.value })}
      />
      <input
        type="number"
        placeholder="Usage Limit"
        value={newDiscount.usageLimit}
        onChange={(e) => setNewDiscount({ ...newDiscount, usageLimit: e.target.value })}
      />
      <button onClick={handleCreateOrUpdate}>{editingId ? "Update" : "Create"}</button>

      <ul>
        {discounts.map((d) => (
          <li key={d._id}>
            {d.code} - {d.percentage}% - Used: {d.usedBy?.length || 0}/{d.usageLimit}
            <button onClick={() => handleEdit(d)}>Edit</button>
            <button onClick={() => handleDelete(d._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
