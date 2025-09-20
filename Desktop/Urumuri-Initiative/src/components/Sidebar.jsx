"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useUser } from '../context/userContext';
import { Building, DollarSign, Briefcase, Activity, Settings } from "lucide-react";
// import { Notify } from 'notiflix';

export default function Sidebar({ activeTab, setActiveTab }) {
  // const router = useRouter();
  // const { logout } = useUser();

  // const handleLogout = () => {
  //   logout();
  //   Notify.success("You are logged out");
  //   router.push('/');
  // };

  const menu = [
    { key: "register", label: "Approve Organization", icon: <Building className="w-5 h-5 mr-2" /> },

    { key: "approveLoans", label: "ApproveLoans", icon: <DollarSign className="w-5 h-5 mr-2" /> },
   
    { key: "activities", label: "Recent Activities", icon: <Activity className="w-5 h-5 mr-2" /> },
    { key: "settings", label: "Settings", icon: <Settings className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="fixed bg-gradient-to-b from-gray-900 to-black w-64 min-h-screen p-4 flex flex-col shadow-xl border-r border-gray-800 top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex justify-center mb-3 mr-16">
        <Image
          src="/Picture2.png"
          alt="RE Logo"
          width={110}
          height={110}
          className="rounded-full object-contain shadow-lg"
        />
      </div>

      {/* Dashboard Title */}
  <div className="text-white text-xl font-semibold bg-gray-800 px-4 py-2 rounded-md shadow-sm inline-block mb-4">
  Agent Dashboard
</div>



      {/* Sidebar Menu Items */}
      <div className="flex-1 space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              console.log("Sidebar clicked:", item.key);
              setActiveTab(item.key);
            }}
                         className={`flex items-center w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm
               ${activeTab === item.key 
                 ? "bg-amber-950 text-white shadow-md transform scale-105" 
                 : "text-gray-300 hover:bg-gray-800 hover:text-white"
               }`}
          >
            {item.icon}
            <span className="ml-2 text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
     
    </div>
  );
}
