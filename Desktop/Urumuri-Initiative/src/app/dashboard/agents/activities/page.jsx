"use client";
import React, { useMemo, useState } from "react";
import {Button} from "../../../../components/ui/button";
import { FaSearch } from "react-icons/fa";
import styles from "./activities.module.css";

export default function AgentActivities() {
  const allAgents = [
    { name: "Alex Johnson", avatar: "/assets/person1.jpg", branch: "Nyarugenge" },
    { name: "Sarah Mitchell", avatar: "/assets/person2.jpg", branch: "Remera" },
    { name: "Emily Carter", avatar: "/assets/me.jpg", branch: "Gatsibo" },
    { name: "Michael Brooks", avatar: "/assets/person1.jpg", branch: "Kicukiro" },
    { name: "Thomas Reid", avatar: "/assets/me.jpg", branch: "Gishushu" },
    { name: "Laura Adams", avatar: "/assets/person2.jpg", branch: "Nyarugenge" },
    { name: "James Taylor", avatar: "/assets/me.jpg", branch: "Remera" },
  ];

  const generatedAgents = Array.from({ length: 30 }, (_, i) => {
    const base = allAgents[i % allAgents.length];
    return {
      id: i + 1,
      code: `AG-${String(i + 1).padStart(4, "0")}`,
      name: base.name + " " + (i + 1),
      avatar: base.avatar,
      branch: base.branch,
      organisations: [
        { id: `ORG-${i + 10}`, name: `${base.branch} Org ${i + 1}`, registeredAt: "2024-06-12" },
      ],
      loans: [
        {
          id: `LN-${i + 300}`,
          orgName: `${base.branch} Org ${i + 1}`,
          amount: 150000 + i * 1500, // Updated amount progression
          issuedAt: "2024-07-10", // Updated issued date
          status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected", // Added "Rejected" status
        },
      ],
      activities: [
        { action: "processed loan request", time: `${i + 5} min ago` }, // Updated activity
        { action: "updated client profile", time: `${i + 7} min ago` }, // Updated activity
      ],
    };
  });

  const [agents] = useState(generatedAgents);
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const branches = ["All", "Nyarugenge", "Remera", "Gatsibo", "Kicukiro", "Gishushu"];

  const filteredAgents = useMemo(() => {
    let list = selectedBranch === "All" ? agents : agents.filter((a) => a.branch === selectedBranch);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)
      );
    }
    return list;
  }, [agents, selectedBranch, searchTerm]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = useMemo(
    () => filteredAgents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredAgents, currentPage, itemsPerPage]
  );

  const openAgent = (agent) => {
    setSelectedAgent(agent);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAgent(null);
  };

  const gotoPage = (p) => {
    setCurrentPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Agent Activities (Cards)</h1>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by agent name or code..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            gotoPage(1);
          }}
          className={styles.searchInput}
        />
      </div>

      {/* Branch Filter */}
      <div className={styles.branchFilter}>
        {branches.map((branch) => (
          <Button
            key={branch}
            onClick={() => {
              setSelectedBranch(branch);
              gotoPage(1);
            }}
            className={`${styles.button} ${selectedBranch === branch ? styles.active : ""}`}
          >
            {branch}
          </Button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        {paginatedAgents.map((agent) => {
          const lastActivity = agent.activities[0];
          return (
            <div key={agent.id} className={styles.card} onClick={() => openAgent(agent)}>
              <div className={styles.cardHeader}>
                <img src={agent.avatar} alt={agent.name} className={styles.cardAvatar} />
                <div>
                  <div className={styles.cardName}>{agent.name}</div>
                  <div className={styles.cardCode}>{agent.code}</div>
                </div>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.badge}>{agent.branch}</span>
                <span className={styles.smallStat}>
                  Orgs: <strong>{agent.organisations.length}</strong>
                </span>
                <span className={styles.smallStat}>
                  Loans: <strong>{agent.loans.length}</strong>
                </span>
              </div>
              {lastActivity && (
                <div className={styles.cardActivityPreview}>
                  <span className={styles.activityAction}>{lastActivity.action}</span>
                  <span className={styles.time}>{lastActivity.time}</span>
                </div>
              )}
            </div>
          );
        })}
        {paginatedAgents.length === 0 && (
          <div className={styles.emptyState}>No agents match your search/filter.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => gotoPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => gotoPage(p)}
              className={`${styles.pageButton} ${currentPage === p ? styles.activePage : ""}`}
            >
              {p}
            </button>
          ))}
          <button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => gotoPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedAgent && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <div className={styles.modalHeader}>
              <img src={selectedAgent.avatar} alt={selectedAgent.name} className={styles.modalAvatar} />
              <div>
                <h2 className={styles.modalTitle}>{selectedAgent.name}</h2>
                <p className={styles.modalCode}>{selectedAgent.code}</p>
                <p className={styles.modalBranch}>{selectedAgent.branch}</p>
              </div>
            </div>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Recent Activities</h3>
              <ul className={styles.activityList}>
                {selectedAgent.activities.map((a, idx) => (
                  <li key={idx} className={styles.activityItem}>
                    <span>{a.action}</span>
                    <span className={styles.time}>{a.time}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Registered Organisations</h3>
              <table className={styles.detailTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAgent.organisations.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Loans Issued</h3>
              <table className={styles.detailTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Organisation</th>
                    <th>Amount</th>
                    <th>Issued At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAgent.loans.map((l) => (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>{l.orgName}</td>
                      <td>{l.amount.toLocaleString()} RWF</td>
                      <td>{l.issuedAt}</td>
                      <td>{l.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}