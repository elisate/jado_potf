'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Info, Wallet, Receipt, Bell, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/Employeedashboard/account-info', label: 'Account Info', icon: Info },
    { href: '/Employeedashboard/payroll', label: 'Payroll', icon: Wallet },
    { href: '/Employeedashboard/receipt', label: 'Receipts', icon: Receipt },
    { href: '/Employeedashboard/notification', label: 'Notifications', icon: Bell },
    { href: '/Employeedashboard/setting', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-80 bg-black text-white min-h-screen p-6 hidden md:block shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-15">
        <Image
          src="/Picture2.png" 
          alt="RE Logo"
          width={180}
          height={180}
          className="rounded-full object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-10">Employee Dashboard</h2>

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
