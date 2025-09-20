"use client";

import { useState } from "react";

const banks = [
  { id: "bk", name: "Bank of Kigali" },
  { id: "eqb", name: "Equity Bank" },
  { id: "cogebanque", name: "Cogebanque" },
];

export default function BankSelectionPage() {
  const [selectedBank, setSelectedBank] = useState("");
  const [agentCode, setAgentCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBank || !agentCode) {
      alert("Please select a bank and enter your agent code.");
      return;
    }

    // You will replace this with backend validation later
    alert(`Authenticating agent ${agentCode} for ${selectedBank}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Bank Selection & Agent Authentication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Select Bank</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          >
            <option value="">-- Choose a Bank --</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Agent Code</label>
          <input
            type="text"
            value={agentCode}
            onChange={(e) => setAgentCode(e.target.value)}
            placeholder="Enter Agent Code"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Authenticate
        </button>
      </form>
    </div>
  );
}
