"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./confirmation.module.css";

export default function AgentConfirmation() {
  const searchParams = useSearchParams();
  const agencyName = searchParams.get("agencyName") || "Not provided";
  const agencyType = searchParams.get("agencyType") || "Not provided";
  const address = searchParams.get("address") || "Not provided";
  const city = searchParams.get("city") || "Not provided";
  const state = searchParams.get("state") || "Not provided";
  const telephoneNumber = searchParams.get("telephoneNumber") || "Not provided";
  const tollFreeNumber = searchParams.get("tollFreeNumber") || "Not provided";
  const email = searchParams.get("email") || "Not provided";
  const website = searchParams.get("website") || "Not provided";
  const companyName = searchParams.get("companyName") || "Not provided";
  const officeSpace = searchParams.get("officeSpace") || "Not provided";

  // Generate a unique 8-character code
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const generateCode = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setGeneratedCode(code);
    };
    generateCode();
  }, []);

  // Handle copying the code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agent Creation Confirmation</h1>
      <div className={styles.card}>
        <p className={styles.description}>
          Your agent has been successfully created! Below is a summary of the submitted information:
        </p>
        <div className={styles.summary}>
          <p className={styles.summaryText}>Agency Name: {agencyName}</p>
          <p className={styles.summaryText}>Agency Type: {agencyType}</p>
          <p className={styles.summaryText}>Address: {address}</p>
          <p className={styles.summaryText}>City: {city}</p>
          <p className={styles.summaryText}>State: {state}</p>
          <p className={styles.summaryText}>Telephone Number: {telephoneNumber}</p>
          <p className={styles.summaryText}>Toll Free Number: {tollFreeNumber}</p>
          <p className={styles.summaryText}>Email: {email}</p>
          <p className={styles.summaryText}>Website: {website}</p>
          <p className={styles.summaryText}>Company Name: {companyName}</p>
          <p className={styles.summaryText}>Office Space: {officeSpace}</p>
        </div>
        <div className={styles.credential}>
          <p className={styles.credentialText}>Your Credential Code: {generatedCode}</p>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onClick={handleCopyCode}
            className={styles.button}
          >
            Copy Code
          </button>
          <Link href="/dashboard/agents">
            <button className={styles.button}>
              Back to Agents
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}