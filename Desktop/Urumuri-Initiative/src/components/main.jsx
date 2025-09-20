"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PayrollsenderActivityTimeline from "./PayrollsenderActivity";
import axios from "axios";
import { Notify } from "notiflix";
import { Building, Briefcase, DollarSign, Activity, Settings } from "lucide-react";
import PendingContractsList from "@/app/ApproveContractForm/pendingContract/page";

export default function Main() {
  const [activeTab, setActiveTab] = useState("register");
  const [organizations, setOrganizations] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loansLoading, setLoansLoading] = useState(true);

  // === FETCHING FUNCTIONS ===
  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://urumuri-backend.onrender.com/organization/getUnapprovedOrganizations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrganizations(res.data.data);
    } catch (err) {
      Notify.failure("Failed to fetch organizations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployers = async () => {
    try {
      const res = await axios.get("https://urumuri-backend.onrender.com/api/employers/pending");
      setEmployers(res.data);
    } catch (error) {
      console.error("Failed to fetch employers:", error);
    }
  };

  const fetchLoans = async () => {
    try {
      setLoansLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("https://urumuri-backend.onrender.com/loans/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(res.data.data || []); // Adjust based on your API response
    } catch (err) {
      console.error("Failed to fetch loans:", err);
      setLoans([]);
    } finally {
      setLoansLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    fetchEmployers();
    fetchLoans();
  }, []);

 
  const handleApproveOrg = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://urumuri-backend.onrender.com/organization/approveOrganization/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Notify.success("Organization approved");
      fetchOrganizations();
    } catch (err) {
      Notify.failure(err.response?.data?.message || "Failed to approve organization");
    }
  };

  const handleRejectOrg = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://urumuri-backend.onrender.com/organization/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Notify.success("Organization rejected and removed");
      fetchOrganizations();
    } catch (err) {
      Notify.failure(err.response?.data?.message || "Failed to reject organization");
    }
  };

  const handleApproveEmployer = async (id) => {
    try {
      await axios.post(`https://urumuri-backend.onrender.com/api/employers/approve/${id}`);
      setEmployers((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Employer approval failed:", error);
    }
  };

  const handleRejectEmployer = async (id) => {
    try {
      await axios.post(`https://urumuri-backend.onrender.com/api/employers/reject/${id}`);
      setEmployers((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Employer rejection failed:", error);
    }
  };

  const handleApproveLoan = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`https://urumuri-backend.onrender.com/loans/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans((prev) => prev.filter((loan) => loan.id !== id));
    } catch (err) {
      console.error("Loan approval failed:", err);
    }
  };

  const handleRejectLoan = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`https://urumuri-backend.onrender.com/loans/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans((prev) => prev.filter((loan) => loan.id !== id));
    } catch (err) {
      console.error("Loan rejection failed:", err);
    }
  };


  const renderContent = () => {
    switch (activeTab) {
      case "register":
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-700 px-6 py-4 mt-13">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Building className="w-6 h-9 mr-3" />
                Organization Approval
              </h2>
              <p className="text-blue-100 text-sm mt-1">Review and approve pending organization registrations</p>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading organizations...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {organizations.length > 0 ? (
                        organizations.map((org) => (
                          <tr key={org.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{org.fullName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{org.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{org.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{org.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a 
                                href={org.certificateUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                              >
                                View Certificate
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center space-x-2">
                                <button 
                                  onClick={() => handleApproveOrg(org.id)} 
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleRejectOrg(org.id)} 
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                >
                                   Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <div className="text-gray-500">
                              <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                              <p className="text-lg font-medium">No pending organizations</p>
                              <p className="text-sm">All organizations have been reviewed</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      case "approveemployers":
        return (
         
            <div className=""> 
           <div className="bg-gray-800 px-6 py-4 mt-20 ml-6 mr-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Briefcase className=" h-9 mr-3" />
                Approve Employers
              </h2>
              <p className="text-white text-sm mt-1">Review and approve pending employer registrations</p>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employers.length > 0 ? (
                      employers.map((employer) => (
                        <tr key={employer._id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-green-800">
                                    {employer.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{employer.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <button 
                                onClick={() => handleApproveEmployer(employer._id)} 
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleRejectEmployer(employer._id)} 
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              >
                                 Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-lg font-medium">No pending employers</p>
                            <p className="text-sm">All employers have been reviewed</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          
        );

      case "approveLoan":
        return (

          <PendingContractsList/>
     
        );

      case "activities":
        return <PayrollsenderActivityTimeline />;

      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4 mt-10">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Settings className="w-6 h-6 mr-3" />
                Settings
              </h2>
              <p className="text-gray-100 text-sm mt-1">Manage your account preferences and system settings</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Settings */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter display name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-colors"
                        placeholder="Enter email address"
                      />
                    </div>
                    <button className="w-full bg-gray-800 hover:bg-amber-950 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Update Profile
                    </button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                      <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
                      <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                      <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    </div>
                    <button className="w-full bg-black hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      Save Preferences
                    </button>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Security</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                        placeholder="Enter new password"
                      />
                    </div>
                    <button className="w-full bg-black hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      Change Password
                    </button>
                  </div>
                </div>

                {/* System Settings */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">System</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="rw">Kinyarwanda</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <button className="w-full bg-cyan-950 hover:bg-amber-950 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                      Apply Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Navbar/>
        
        <main className="flex-1 p-6 ml-64 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}