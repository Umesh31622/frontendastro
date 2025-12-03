import React from "react";
import PaymentButton from "../components/PaymentButton";

export default function Transactions() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        💳 Transactions
      </h1>
      <p className="text-gray-600 mb-4">
        Click below to test Razorpay integration.
      </p>
      <PaymentButton amount={499} />
    </div>
  );
} 
