"use client";

import React, { useState, useMemo } from "react";
import styles from "./notification.module.css";

export default function NotificationsPage() {
  // Mock notifications (20+ for pagination)
  const allNotifications = [
    { id: 1, message: "Agent John issued a loan to XYZ Organisation.", time: "2 mins ago", type: "loan" },
    { id: 2, message: "Agent Sarah logged out.", time: "10 mins ago", type: "logout" },
    { id: 3, message: "New loan request received from ABC Organisation.", time: "30 mins ago", type: "request" },
    { id: 4, message: "Agent David signed in to the dashboard.", time: "1 hour ago", type: "login" },
    { id: 5, message: "Loan approved for GHI Organisation.", time: "2 hours ago", type: "loan" },
    { id: 6, message: "Agent Mary updated a loan record.", time: "4 hours ago", type: "update" },
    { id: 7, message: "Agent Samuel logged out.", time: "5 hours ago", type: "logout" },
    { id: 8, message: "New agent account created: Agent Peter.", time: "7 hours ago", type: "account" },
    { id: 9, message: "Agent Alice issued a loan to LMN Organisation.", time: "8 hours ago", type: "loan" },
    { id: 10, message: "Loan request rejected for OPQ Organisation.", time: "9 hours ago", type: "update" },
    { id: 11, message: "Agent John logged in.", time: "10 hours ago", type: "login" },
    { id: 12, message: "Agent Sarah sent a report.", time: "11 hours ago", type: "report" },
    { id: 13, message: "Agent David updated system settings.", time: "12 hours ago", type: "update" },
    { id: 14, message: "Agent Samuel added a new organisation.", time: "13 hours ago", type: "account" },
    { id: 15, message: "Loan approved for XYZ Organisation.", time: "14 hours ago", type: "loan" },
    { id: 16, message: "Agent Peter logged out.", time: "15 hours ago", type: "logout" },
    { id: 17, message: "Agent Alice logged in.", time: "16 hours ago", type: "login" },
    { id: 18, message: "Agent Mary removed a loan record.", time: "17 hours ago", type: "update" },
    { id: 19, message: "Agent John issued a loan to STU Organisation.", time: "18 hours ago", type: "loan" },
    { id: 20, message: "New agent account created: Agent David.", time: "19 hours ago", type: "account" },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Notifications per page

  const totalPages = Math.ceil(allNotifications.length / itemsPerPage);

  const currentNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allNotifications.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className={styles.card}>
        {currentNotifications.length === 0 ? (
          <p className={styles.noNotifications}>No new notifications</p>
        ) : (
          <ul className={styles.notificationList}>
            {currentNotifications.map((note) => (
              <li key={note.id} className={`${styles.notificationItem} ${styles[note.type]}`}>
                <span className={styles.message}>{note.message}</span>
                <span className={styles.time}>{note.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}
