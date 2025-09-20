// src/app/OrganisationDashboard/payroll/page.jsx
"use client";

import { useState } from "react";
import PayrollForm from "@/components/organisatin/payrollForm";
import PayrollHistory from "@/components/organisatin/payrollHistory";
import SalaryBreakdownModal from "@/components/organisatin/SalaryBreakdownModal";
import SuccessModal from "@/components/organisatin/SuccessModal";
import Spinner from "@/components/organisatin/Spinner";

const PayrollPage = () => {
  const [payrollHistory, setPayrollHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);

  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setPayrollHistory([...payrollHistory, data]);
      setSuccessModal(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8">
      <PayrollForm onSubmit={handleSubmit} loading={loading} />
      {loading && <Spinner />}
      <PayrollHistory history={payrollHistory} onShowBreakdown={setSelectedBreakdown} />
      <SuccessModal visible={successModal} onClose={() => setSuccessModal(false)} />
      <SalaryBreakdownModal breakdown={selectedBreakdown} onClose={() => setSelectedBreakdown(null)} />
    </div>
  );
};

export default PayrollPage;
