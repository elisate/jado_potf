"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const payrollData = {
  "Salary Access": {
    image: "/salary access.jpg",
    title:"Employee",
    content:
      "Access your week salary at anytime you want it.Employee charges 5% per Transaction.Employees also have a 3% salary deposit that is refunded when his/her lose job  ",
    list: [
      "View your profile",
      "Request week salary",
      "Employee salary",
      "View your salary deposit",
      "Request deposit refund",
      "Payment Report",
       "Download Report",
      
    ],
  },
  "Free Funds for Payrolls": {
    image: "/free fund payroll.jpg",
    title:"Employers enjoy Funds and reduce payroll burden",
    content:
      "Employers pay no fees, split salaries over two months, and receive a 3% deposit refund after fulfilling payment obligations.",
    list: [
      "View your profile",
      "Funds Report",
      "Manage bank accounts",
      "Salary deposit",
      "Request refund",
      "Payment history"
    ],
  },
  "Online Payroll Form": {
    image: "/payroll form.jpg",
        title:"Choose your payroll form and do it easily",
    content:
      "Easily edit, update, and save employee payroll details anytime with no fees. The system is secure, user-friendly, and flexible, allowing salary adjustments, information updates, and future edits for efficient payroll management.",
    list: [
      "Daily payroll form",
      "Weekly payroll form",
      "Biweekly (15 days) payroll form",
      "Monthly payroll form",
      "Choose preferred payroll period",
      "Track submitted payroll forms"
    ],
  },
  "Direct Payroll Payment": {
    image: "/direct payment.jpg",
    title:"Quick and Easy Payment",
    content:
      "Easily send payroll to workers’ mobile money or bank accounts with one click, ensuring fast, secure payments while saving time and reducing administrative effort..",
    list: [
      "Direct deposit to bank",
      "Mobile money support",
      "Fast transactions",
      "Secure payment process",
      "Multiple payout options",
      "Reliable and efficient service"
    ],
  },
    // New Tab 1
  "Payroll Analytics": {
    image: "/payroll analytics.jpg",
    title: "Insightful Payroll Analytics",
    content:
      "Track and analyze payroll trends with detailed reports to optimize costs and improve payroll efficiency. Understand employee payment patterns easily with visual dashboards.",
    list: [
      "View detailed payroll reports",
      "Analyze payment trends",
      "Export analytics data",
      "Monitor salary expenses",
      "Identify cost-saving opportunities",
      "Visualize payroll data"
    ],
  },

  // New Tab 2
  "Employee Support": {
    image: "/employee support.jpg",
    title: "Dedicated Employee Support",
    content:
      "Provide employees with access to support services including payroll queries, assistance with payments, and resolving salary related issues quickly and efficiently.",
    list: [
      "24/7 payroll support",
      "Resolve payment issues",
      "Employee FAQ",
      "Request assistance",
      "Live chat support",
      "Help desk tickets"
    ],
  },
};

export default function PayrollTabs() {
  const [selectedTab, setSelectedTab] = useState("Salary Access");

  return (
    <div className="mt-20">
        <h2 className="flex justify-center items-center text-2xl font-semibold">Awesome payroll Services For Business</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-20 py-10">
        
      {/* Left Tabs */}
      <div className="space-y-2">
        {Object.keys(payrollData).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg border text-left ${
              selectedTab === tab ? "bg-red-800 text-white" : "bg-white"
            }`}
          >
            <Menu className="w-4 h-4" />
            {tab}
          </button>
        ))}
      </div>

      {/* Middle Image */}
      <img
        src={payrollData[selectedTab].image}
        alt={selectedTab}
        className="rounded-xl w-full h-80 object-cover"
      />

      {/* Right Content */}
      <div className="md:col-span-2 space-y-4">
         <h2 className="text-2xl font-semibold">{payrollData[selectedTab].title}</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {payrollData[selectedTab].content}
        </p>

       <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-600">
  {payrollData[selectedTab].list.map((item, idx) => (
    <li key={idx} className="flex items-start">✔ {item}</li>
  ))}
</ul>


        <button className="w-auto mt-4 bg-red-800 text-white p-2">
          Review your Payroll here 
        </button>
      </div>
    </div>
    </div>
  );
}
