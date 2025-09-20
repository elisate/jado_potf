"use client";

import LoanRequestForm from "@/components/organisatin/LoanRequestForm";
import LoanList from "@/components/organisatin/LoanList";

export default function LoanPage() {
  const handleLoanSubmit = (newLoan) => {
    console.log("Loan Submitted:", newLoan);
  };

  return (
    <div className="p-4">
      <LoanRequestForm onSubmitLoan={handleLoanSubmit} />
      <LoanList />
    </div>
  );
}
