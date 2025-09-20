"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.name) {
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user info
    localStorage.removeItem("token"); // Optional: remove token if stored separately
    router.push("/"); // Redirect to homepage or login
  };

  return (
    <header className="bg-white text-black shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        Welcome{userName ? `, ${userName}` : ""}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
