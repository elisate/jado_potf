"use client";

import { useState, useMemo } from "react";
import { FaSearch, FaDownload, FaSort, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import styles from "./finance.module.css";

const mockPaymentRequests = [
  { id: 1, date: "2025-08-05", workerName: "John Doe", amount: 1500, status: "Pending", agent: "Agent A", organization: "Acme Corp" },
  { id: 2, date: "2025-08-04", workerName: "Jane Smith", amount: 1200, status: "Pending", agent: "Agent B", organization: "Tech Solutions" },
  { id: 3, date: "2025-08-03", workerName: "Mike Johnson", amount: 1800, status: "Paid", agent: "Agent A", organization: "Acme Corp" },
  { id: 4, date: "2025-08-02", workerName: "Alice Brown", amount: 1300, status: "Paid", agent: "Agent B", organization: "Tech Solutions" },
];

export default function Finance() {
  const [paymentRequests, setPaymentRequests] = useState(mockPaymentRequests);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = useMemo(() => {
    let result =
      selectedStatus === "All"
        ? [...paymentRequests]
        : paymentRequests.filter((r) => r.status === selectedStatus);

    if (searchTerm) {
      result = result.filter((r) =>
        r.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.amount.toString().includes(searchTerm) ||
        r.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => (sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)));
    return result;
  }, [paymentRequests, selectedStatus, searchTerm, sortAsc]);

  const statuses = ["All", ...new Set(paymentRequests.map((r) => r.status))];

  const handleExport = () => {
    alert("Exporting payment requests data...");
    // Placeholder: Implement CSV/PDF export
  };

  const handleProcessPayment = () => {
    if (selectedRequest) {
      setPaymentRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id ? { ...r, status: "Paid" } : r
        )
      );
      setShowPaymentModal(false);
      setSelectedRequest(null);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Finance Dashboard</h2>
        <div className={styles.headerActions}>
          <Button onClick={handleExport} className={styles.exportButton}>
            <FaDownload /> Export Data
          </Button>
        </div>
      </header>

      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          {statuses.map((status) => (
            <Button
              key={status}
              className={`${styles.statusButton} ${
                selectedStatus === status ? styles.activeStatus : ""
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by worker, amount, agent, or org..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <Button onClick={() => setSortAsc(!sortAsc)} className={styles.sortButton}>
          <FaSort /> Sort Date {sortAsc ? "↑" : "↓"}
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Worker</th>
              <th>Amount</th>
              <th>Agent</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>{request.workerName}</td>
                <td>${request.amount.toLocaleString()}</td>
                <td>{request.agent}</td>
                <td>{request.organization}</td>
                <td className={request.status === "Paid" ? styles.paid : styles.pending}>
                  {request.status}
                  {request.status === "Paid" ? <FaCheckCircle /> : <FaTimesCircle />}
                </td>
                <td>
                  {request.status === "Pending" && (
                    <Button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowPaymentModal(true);
                      }}
                      className={styles.payButton}
                    >
                      Pay
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && <p className={styles.noData}>No payment requests found.</p>}
      </div>

      {showPaymentModal && selectedRequest && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowPaymentModal(false)}>×</button>
            <h3 className={styles.modalTitle}>Process Payment</h3>
            <div className={styles.modalForm}>
              <p>
                <strong>Worker:</strong> {selectedRequest.workerName}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedRequest.amount.toLocaleString()}
              </p>
              <p>
                <strong>Agent:</strong> {selectedRequest.agent}
              </p>
              <p>
                <strong>Organization:</strong> {selectedRequest.organization}
              </p>
              <Button onClick={handleProcessPayment} className={styles.payConfirmButton}>
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}