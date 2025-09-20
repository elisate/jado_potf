"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import styles from "./profile.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Personal Information</h1>
        <div className={styles.buttonGroup}>
          <Button variant="outline">Impersonate User</Button>
          <Button variant="outline">Change Password</Button>
          <Button variant="destructive">Delete User</Button>
        </div>
      </div>

      {/* Profile Image + Basic Info */}
      <div className={styles.profileLayout}>
        <div className={styles.profileImageSection}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className={styles.profileImage}
          />
          <p className={styles.profileEmail}>comeronallison@gmail.com</p>
          <p className={styles.lastSignIn}>Last sign in: 2 hours ago</p>
        </div>

        {/* Form Section */}
        <div className={styles.formCard}>
          <div className={styles.inputGroup}>
            <InputField label="First Name" value="Comeron" placeholder="Enter first name" />
            <InputField label="Last Name" value="Willoughby" placeholder="Enter last name" />
            <InputField
              label="Email Address"
              value="comeronallison@gmail.com"
              readOnly
              verified
            />
            <InputField
              label="Phone Number"
              value="123-456-0789"
              placeholder="Enter phone number"
              verified
            />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <SectionCard title="Social Media Accounts">
        <InputField
          label="Facebook"
          value="https://www.facebook.com/comeron"
          placeholder="Facebook profile"
        />
        <InputField
          label="Instagram"
          value="https://www.instagram.com/comeron"
          placeholder="Instagram handle"
        />
        <Button className={styles.addButton}>+ Add Social</Button>
      </SectionCard>

      {/* Other Section */}
      <SectionCard title="Other">
        <InputField
          label="Website"
          value="https://example.com/"
          placeholder="Website link"
        />
        <InputField
          label="Enterprise Account"
          value="https://www.example.com"
          placeholder="Enterprise account URL"
        />
      </SectionCard>
    </div>
  );
}

// Helper Components
function InputField({ label, value, placeholder, readOnly = false, verified = false }) {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={styles.input}
      />
      {verified && <span className={styles.verified}>Verified</span>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}
