"use client";

import React, { useState } from "react";
import {Button} from "../../../components/ui/button";
import styles from "./settings.module.css";

export default function SettingsPage() {
  // State to manage all settings
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("comeronallison");
  const [timeZone, setTimeZone] = useState("CAT");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showActiveSessions, setShowActiveSessions] = useState(false);
  const [message, setMessage] = useState(""); // For feedback messages

  // Handle form submission (simulated API request)
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const settings = {
      profileImage: profileImage ? profileImage.name : null,
      username,
      timeZone,
      dateFormat,
      emailNotifications,
      pushNotifications,
      twoFactor,
      showActiveSessions,
    };

    try {
      // Simulate API call (replace with real endpoint)
      console.log("Saving settings:", settings);
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      setMessage("Failed to save settings. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>General Settings</h1>
        <div className={styles.buttonGroup}>
          <Button variant="outline" className={styles.button} onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>

      {/* General Settings Section */}
      <div className={styles.card}>
        <p className={styles.description}>
          Configure your account settings and preferences to personalize your experience.
        </p>

        {/* Profile Picture */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Picture</h2>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className={styles.input}
            />
            {profileImage && (
              <p className={styles.description}>Selected image: {profileImage.name}</p>
            )}
            {!profileImage && (
              <p className={styles.description}>
                Upload a new profile image to update your account avatar (max 5MB, JPG/PNG).
              </p>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Account Information</h2>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className={styles.input}
            />
            <p className={styles.description}>
              Your unique username for login and identification (3-20 characters).
            </p>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Time Zone</label>
            <select
              className={styles.select}
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            >
              <option value="CAT">Central Africa Time (CAT)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
            </select>
            <p className={styles.description}>
              Set your local time zone for accurate scheduling and notifications.
            </p>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Date Format</label>
            <select
              className={styles.select}
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
            >
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              <option value="MM-DD-YYYY">MM-DD-YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
            <p className={styles.description}>
              Choose your preferred date display format for reports and interfaces.
            </p>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notification Preferences</h2>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="emailNotifications"
              className={styles.checkbox}
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <label htmlFor="emailNotifications" className={styles.label}>
              Enable email notifications
            </label>
            <p className={styles.description}>
              Receive updates via email for account activities and alerts.
            </p>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="pushNotifications"
              className={styles.checkbox}
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
            <label htmlFor="pushNotifications" className={styles.label}>
              Enable push notifications
            </label>
            <p className={styles.description}>
              Get instant notifications on your device for critical updates.
            </p>
          </div>
        </div>

        {/* Security Settings */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Security Settings</h2>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="twoFactor"
              className={styles.checkbox}
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
            />
            <label htmlFor="twoFactor" className={styles.label}>
              Enable two-factor authentication
            </label>
            <p className={styles.description}>
              Add an extra layer of security with a second verification step.
            </p>
          </div>
        </div>

        {/* Session Management */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Session Management</h2>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="activeSessions"
              className={styles.checkbox}
              checked={showActiveSessions}
              onChange={(e) => setShowActiveSessions(e.target.checked)}
            />
            <label htmlFor="activeSessions" className={styles.label}>
              Show active sessions
            </label>
            <p className={styles.description}>
              View and manage all active devices logged into your account.
            </p>
          </div>
          <Button variant="outline" className={styles.button}>
            Sign Out All Devices
          </Button>
          <p className={styles.description}>
            Sign out from all devices except the current one for security purposes.
          </p>
        </div>

        {/* Feedback Message */}
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}