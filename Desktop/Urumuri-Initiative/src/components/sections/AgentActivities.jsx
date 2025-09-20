"use client";
import React, { useState } from "react";
import {Button} from "../ui/Button";
import styles from "./agentActivities.module.css";

export default function AgentActivities() {
  const [activities, setActivities] = useState([
    { id: 1, agentName: "Christian Nelson", image: "/images/agent1.jpg", action: "completed Test task name", time: "17 min ago" },
    { id: 2, agentName: "Martha Ford", image: "/images/agent2.jpg", action: "completed Configure project structure", time: "21 min ago" },
    { id: 3, agentName: "Gladys Lawrence", image: "/images/agent3.jpg", action: "created Tag Test Tag Name", time: "34 min ago" },
    { id: 4, agentName: "Carl Fletcher", image: "/images/agent4.jpg", action: "created Tag Another Tag", time: "35 min ago" },
    { id: 5, agentName: "Dave Roberts", image: "/images/agent5.jpg", action: "completed Create Crew Users", time: "47 min ago" },
    { id: 6, agentName: "Hailey Weaver", image: "/images/agent6.jpg", action: "completed Task just to complete", time: "59 min ago" },
    { id: 7, agentName: "Super Admin", image: "/images/agent7.jpg", action: "created user Hailey Weaver", time: "2h ago" },
  ]);
  const [newActivity, setNewActivity] = useState({ agentName: "", image: "", action: "", time: "" });
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = () => {
    if (newActivity.agentName && newActivity.action && newActivity.time) {
      setActivities((prev) => [
        ...prev,
        { 
          id: Date.now(), 
          agentName: newActivity.agentName, 
          image: newActivity.image || `/images/agent${prev.length + 1}.jpg`, 
          action: newActivity.action, 
          time: newActivity.time 
        },
      ]);
      setNewActivity({ agentName: "", image: "", action: "", time: "" });
    }
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAgent(null);
  };

  const handleGenerateReport = () => {
    alert("Report generated for activities: " + activities.map(a => a.agentName).join(", "));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Agent Activities</h1>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="agentName"
            value={newActivity.agentName}
            onChange={handleInputChange}
            placeholder="Agent Name"
            className={styles.input}
          />
          <input
            type="text"
            name="action"
            value={newActivity.action}
            onChange={handleInputChange}
            placeholder="Action"
            className={styles.input}
          />
          <input
            type="text"
            name="time"
            value={newActivity.time}
            onChange={handleInputChange}
            placeholder="Time (e.g., 17 min ago)"
            className={styles.input}
          />
          <Button onClick={handleAddActivity} className={styles.button}>
            Add Activity
          </Button>
          <Button onClick={handleGenerateReport} className={styles.button}>
            Generate Report
          </Button>
        </div>
      </div>
      <div className={styles.activityFeed}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem} onClick={() => handleAgentClick(activity)}>
            <img src={activity.image} alt={activity.agentName} className={styles.agentImage} />
            <div className={styles.activityDetails}>
              <div className={styles.agentName}>{activity.agentName}</div>
              <div className={styles.activityAction}>{activity.action}</div>
            </div>
            <div className={styles.time}>{activity.time}</div>
          </div>
        ))}
      </div>
      {modalOpen && selectedAgent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <h2 className={styles.modalTitle}>Agent Details</h2>
            <img src={selectedAgent.image} alt={selectedAgent.agentName} className={styles.agentImage} />
            <p className={styles.modalDetail}>Name: {selectedAgent.agentName}</p>
            <p className={styles.modalDetail}>Action: {selectedAgent.action}</p>
            <p className={styles.modalDetail}>Time: {selectedAgent.time}</p>
          </div>
        </div>
      )}
    </div>
  );
}