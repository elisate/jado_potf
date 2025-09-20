"use client";

import { UserProvider } from "@/context/userContext";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/sections/Sidebar";
import styles from './dashboard.module.css';

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
      <Toaster />
    </UserProvider>
  );
}