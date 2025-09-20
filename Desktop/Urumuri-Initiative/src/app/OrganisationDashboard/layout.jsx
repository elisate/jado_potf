'use client';
import Sidebar from '@/components/organisatin/Sidebar';
import Topbar from '@/components/organisatin/Topbar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
