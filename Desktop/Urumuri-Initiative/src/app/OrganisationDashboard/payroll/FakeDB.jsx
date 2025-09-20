// src/app/payroll/FakeDB.js

export function getFakeTransactions() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("payrollTx") || "[]");
    }
    return [];
  }
  