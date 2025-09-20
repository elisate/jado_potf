"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Notify } from "notiflix";
export default function LoginPage() {
  // const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://urumuri-backend.onrender.com/user/signin",
        { email, password }
      );

    const token = res.data.data.token;
    const user = res.data.data.user;
      localStorage.setItem("token", token);

      const decoded = jwt_decode(token);
      localStorage.setItem("userId", decoded.id);
      localStorage.setItem("userName", decoded.name);
      localStorage.setItem("userEmail", decoded.email);
      localStorage.setItem("user", JSON.stringify(user));
      Notify.success("Login successful");
         setEmail("")
         setPassword("")
      
      if (decoded.role === "admin") router.push("/");
      if(decoded.role==="agent") router.push("/AgentCode")
      if(decoded.role==='organization') router.push("/OrganisationDashboard")
    } catch (err) {
      Notify.failure(err.response?.data?.message || "Login failed");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Login to RNRS Platform
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-black font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading ? "bg-[#033147]" : "bg-[#011B28] hover:bg-[#19252b]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}
