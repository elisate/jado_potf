"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./agentForm.module.css";

const AgentForm = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    agencyType: "",
    password: "",
    address: "",
    city: "",
    state: "",
    telephoneNumber: "",
    tollFreeNumber: "",
    email: "",
    website: "",
    companyName: "",
    officeSpace: "Owned",
    companyLogo: null,
  });
  const [previewLogo, setPreviewLogo] = useState(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type === "file" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewLogo(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.agencyName) newErrors.agencyName = "Agency Name is required";
    if (!formData.agencyType) newErrors.agencyType = "Agency Type is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.telephoneNumber) newErrors.telephoneNumber = "Telephone Number is required";
    if (!formData.tollFreeNumber) newErrors.tollFreeNumber = "Toll Free Number is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.website || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.website))
      newErrors.website = "Valid Website URL is required";
    if (!formData.companyName) newErrors.companyName = "Company Name is required";
    if (!formData.companyLogo) newErrors.companyLogo = "Company Logo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      console.log("Form Data Submitted:", formData);
      // Redirect to confirmation page
      router.push("/dashboard/agents/confirmation");
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Agent</h1>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor="agencyName" className={styles.label}>
                Agency Name *
              </label>
              <input
                id="agencyName"
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                className={`${styles.input} ${errors.agencyName ? styles.inputError : ""}`}
                required
              />
              {errors.agencyName && <span className={styles.error}>{errors.agencyName}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="agencyType" className={styles.label}>
                Agency Type *
              </label>
              <select
                id="agencyType"
                name="agencyType"
                value={formData.agencyType}
                onChange={handleChange}
                className={`${styles.input} ${errors.agencyType ? styles.inputError : ""}`}
                required
              >
                <option value="">Select</option>
                <option value="Agent">Agent</option>
                <option value="Broker">Broker</option>
                <option value="Distributor">Distributor</option>
              </select>
              {errors.agencyType && <span className={styles.error}>{errors.agencyType}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password *
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                required
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                Address *
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
                required
              />
              {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>
                City *
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                required
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state" className={styles.label}>
                State *
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`${styles.input} ${errors.state ? styles.inputError : ""}`}
                required
              />
              {errors.state && <span className={styles.error}>{errors.state}</span>}
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor="telephoneNumber" className={styles.label}>
                Telephone Number *
              </label>
              <input
                id="telephoneNumber"
                type="tel"
                name="telephoneNumber"
                value={formData.telephoneNumber}
                onChange={handleChange}
                className={`${styles.input} ${errors.telephoneNumber ? styles.inputError : ""}`}
                required
              />
              {errors.telephoneNumber && <span className={styles.error}>{errors.telephoneNumber}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="tollFreeNumber" className={styles.label}>
                Toll Free Number *
              </label>
              <input
                id="tollFreeNumber"
                type="tel"
                name="tollFreeNumber"
                value={formData.tollFreeNumber}
                onChange={handleChange}
                className={`${styles.input} ${errors.tollFreeNumber ? styles.inputError : ""}`}
                required
              />
              {errors.tollFreeNumber && <span className={styles.error}>{errors.tollFreeNumber}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email ID *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                required
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor="website" className={styles.label}>
                Website *
              </label>
              <input
                id="website"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={`${styles.input} ${errors.website ? styles.inputError : ""}`}
                required
              />
              {errors.website && <span className={styles.error}>{errors.website}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyName" className={styles.label}>
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`${styles.input} ${errors.companyName ? styles.inputError : ""}`}
                required
              />
              {errors.companyName && <span className={styles.error}>{errors.companyName}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="officeSpace" className={styles.label}>
                Office Space *
              </label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    id="officeSpaceOwned"
                    type="radio"
                    name="officeSpace"
                    value="Owned"
                    checked={formData.officeSpace === "Owned"}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>Owned</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    id="officeSpaceRental"
                    type="radio"
                    name="officeSpace"
                    value="Rental"
                    checked={formData.officeSpace === "Rental"}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>Rental</span>
                </label>
              </div>
              {errors.officeSpace && <span className={styles.error}>{errors.officeSpace}</span>}
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor="companyLogo" className={styles.label}>
                Company Logo *
              </label>
              <input
                id="companyLogo"
                type="file"
                name="companyLogo"
                onChange={handleChange}
                className={`${styles.input} ${styles.fileInput} ${errors.companyLogo ? styles.inputError : ""}`}
                required
              />
              {previewLogo && <img src={previewLogo} alt="Logo Preview" className={styles.logoPreview} />}
              {errors.companyLogo && <span className={styles.error}>{errors.companyLogo}</span>}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelButton} onClick={() => router.push("/dashboard/agents")}>
              CANCEL
            </button>
            <button type="submit" className={styles.continueButton}>
              CONTINUE →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentForm;