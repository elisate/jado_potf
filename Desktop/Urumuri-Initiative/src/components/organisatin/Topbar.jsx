'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Retrieve user data (adjust key if different)
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.name) {
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold text-black">
        {userName ? `Welcome, ${userName}` : 'Organisation Dashboard'}
      </h1>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#03031d] focus:outline-none"
        >
          <UserCircle size={28} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
            <a
              href="/OrganisationDashboard/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="/OrganisationDashboard/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
