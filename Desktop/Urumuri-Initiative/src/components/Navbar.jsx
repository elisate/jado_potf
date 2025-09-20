"use client";
import React from "react";
import Link from "next/link";
import { useUser } from '../context/userContext';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';

export default function Navbar() {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    Notify.success("You are logged out");
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-white px-8 py-4 flex items-center justify-between shadow-lg z-50">
      
      {/* Left side: Welcome message */}
      <div className="text-gray-600 text-lg font-medium">
        Welcome, Agent
      </div>

      {/* Right side: Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-800 text-white px-5 py-2 rounded-lg font-semibold shadow transition hover:bg-[#a40008da] mr-6"
      >
        Logout
      </button>
    </nav>
  );
}
