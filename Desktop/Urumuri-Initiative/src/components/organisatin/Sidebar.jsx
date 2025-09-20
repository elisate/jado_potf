'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Wallet,
  DollarSign,
  Bell,
  Settings,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/OrganisationDashboard', label: 'Dashboard', icon: Home },
    { href: '/OrganisationDashboard/employees', label: 'Employees', icon: Users },
    { href: '/OrganisationDashboard/payroll', label: 'Payroll', icon: Wallet },
    { href: '/OrganisationDashboard/loans', label: 'Loans', icon: DollarSign },
    { href: '/OrganisationDashboard/notifications', label: 'Notifications', icon: Bell },
    { href: '/OrganisationDashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-80 bg-black text-white min-h-screen p-6 hidden md:block shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-12">
        <Image
          src="/Picture2.png" // change this to your actual image path
          alt="Organization Logo"
          width={180}
          height={180}
          className="rounded-full object-contain "
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-10">Org Dashboard</h2>

      <nav className="flex flex-col space-y-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors duration-200 font-semibold ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={22} />
              <span className="text-lg">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
