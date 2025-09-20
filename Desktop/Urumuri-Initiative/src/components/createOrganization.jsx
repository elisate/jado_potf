"use client";
import { useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import { useRouter } from "next/navigation";
// Districts and their sectors
const districtSectorMap = {
  "Gasabo": ["Kimironko", "Kacyiru", "Gisozi"],
  "Nyarugenge": ["Nyamirambo", "Kiyovu", "Muhima"],
  "Kicukiro": ["Kagarama", "Kanombe", "Niboye"],
  // Other districts don't need sectors
};

const allDistricts = [
  "Gasabo", "Nyarugenge", "Kicukiro", "Bugesera", "Burera", "Gakenke", "Gatsibo", "Gicumbi",
  "Gisagara", "Huye", "Kamonyi", "Karongi", "Kayonza", "Kirehe", "Muhanga", "Musanze", "Ngoma",
  "Ngororero", "Nyabihu", "Nyagatare", "Nyamagabe", "Nyamasheke", "Nyanza", "Nyaruguru",
  "Rubavu", "Ruhango", "Rulindo", "Rusizi", "Rutsiro", "Rwamagana"
];

export default function CreateOrganizationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    district: "",
    sector: "",
    email: "",
    phone: "",
    password: "",
    certificate: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "certificate") {
      setFormData({ ...formData, certificate: files[0] });
    } else if (name === "district") {
      setFormData({ ...formData, district: value, sector: "" }); // reset sector on district change
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const finalLocation = districtSectorMap[formData.district]?.length > 0 && formData.sector
      ? `${formData.district}-${formData.sector}`
      : formData.district;

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("location", finalLocation);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    if (formData.certificate) data.append("certificate", formData.certificate);

    try {
      await axios.post("https://urumuri-backend.onrender.com/organization/createOrganization", data);
      Notify.success("Organization created successfully!");
      setFormData({
        fullName: "",
        district: "",
        sector: "",
        email: "",
        phone: "",
        password: "",
        certificate: null,
      });
      router.push("/SalaryFund");
    } catch (err) {
      Notify.failure(err.response?.data?.message || "Failed to create organization.");
    } finally {
      setSubmitting(false);
    }
  };

  const sectors = districtSectorMap[formData.district] || [];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl bg-white p-6 shadow-lg rounded-xl mx-auto space-y-5 mt-20 mb-20">
      <h2 className="text-2xl font-bold text-center text-black">Create Organization</h2>

      <div>
        <label className="block mb-1 text-black font-medium">Organization Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div>
        <label className="block mb-1 text-black font-medium">District</label>
        <select name="district" value={formData.district} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
          <option value="">Select district</option>
          {allDistricts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {sectors.length > 0 && (
        <div>
          <label className="block mb-1 text-black font-medium">Sector</label>
          <select name="sector" value={formData.sector} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select sector</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block mb-1 text-black font-medium">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div>
        <label className="block mb-1 text-black font-medium">Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div>
        <label className="block mb-1 text-black font-medium">Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="flex flex-row items-center space-x-5">
        <label className="block mb-1 text-black font-medium">Upload RDB Certificate (PDF)</label>
        <input type="file" name="certificate" accept="application/pdf" onChange={handleChange} className="w-[50%] text-black bg-[#E8F0FE] p-2" />
      </div>

      <button type="submit" disabled={submitting} className={`w-full py-2 px-4 rounded text-white font-semibold transition ${submitting ? "bg-gray-500" : "bg-[#8A0000] hover:bg-red-500"}`}>
        {submitting ? "Submitting..." : "Create Organization"}
      </button>
    </form>
  );
}
