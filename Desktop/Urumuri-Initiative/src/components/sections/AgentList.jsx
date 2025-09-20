"use client";

import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import styles from "./agentList.module.css";

const mockUsers = [
  { id: 1, name: "Acme Corp", category: "Organization", code: "ORG001", status: "Active", branch: "Gasabo" },
  { id: 2, name: "John Doe", category: "Employee", code: "EMP001", role: "Manager", status: "Active", branch: "Nyarugenge" },
  { id: 3, name: "Jane Smith", category: "User", code: "USR001", email: "jane@example.com", status: "Active", branch: "Gasabo" },
  { id: 4, name: "Tech Solutions", category: "Organization", code: "ORG002", status: "Inactive", branch: "Kicukiro" },
  { id: 5, name: "Mike Johnson", category: "Employee", code: "EMP002", role: "Developer", status: "Active", branch: "Nyarugenge" },
  { id: 6, name: "Alice Brown", category: "User", code: "USR002", email: "alice@example.com", status: "Inactive", branch: "Gasabo" },
];

export default function UserList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const router = useRouter();

  const filteredUsers = useMemo(() => {
    let result = selectedCategory === "All"
      ? [...mockUsers]
      : mockUsers.filter(user => user.category === selectedCategory);

    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortAsc) {
      result.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      result.sort((a, b) => b.category.localeCompare(a.category));
    }

    return result;
  }, [selectedCategory, searchTerm, sortAsc]);

  const categories = ["All", ...new Set(mockUsers.map(user => user.category))];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Users</h2>
      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          {categories.map(category => (
            <Button
              key={category}
              className={`${styles.branchButton} ${
                selectedCategory === category ? styles.branchButtonActive : styles.branchButtonInactive
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => router.push("/dashboard/agents/create")}
          className={`${styles.createButton} ${styles.controlButton}`}
        >
          Create Agent
        </Button>
        <input
          type="text"
          placeholder="Search by name, code, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
       
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableHeadCell}>Name</th>
              <th className={styles.tableHeadCell}>Category</th>
              <th className={styles.tableHeadCell}>Code</th>
              <th className={styles.tableHeadCell}>Status</th>
              <th className={styles.tableHeadCell}>Branch</th>
              <th className={styles.tableHeadCell}>Details</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredUsers.map(user => (
              <tr key={user.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{user.name}</td>
                <td className={styles.tableCell}>{user.category}</td>
                <td className={styles.tableCell}>{user.code}</td>
                <td className={`${styles.tableCell} ${styles.status}`}>{user.status}</td>
                <td className={styles.tableCell}>{user.branch}</td>
                <td className={styles.tableCell}>
                  {user.role && `Role: ${user.role}`}
                  {user.email && ` | Email: ${user.email}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers.length === 0 && <p className={styles.noAgents}>No users found.</p>}
    </div>
  );
}