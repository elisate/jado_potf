import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Globe, User } from "lucide-react";
import { useUser } from "@/context/userContext";
import Login from "../login";
import { FaAngleDown } from "react-icons/fa";


export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useUser();   // <== get user from context
  const router = useRouter();
const [menuOpen, setMenuOpen] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Hiring", href: "/Hiring" },
    { name: "Jobs", href: "/Jobs" },
     {name:"Services",href:"/SalaryFund"},
    { name: "Contact", href: "/Contacts" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow bg-white">
      {/* Logo & Name */}
      <div className="flex items-center gap-2 w-fit rounded-2xl">
        <Image src="/RNRSLogo.png" alt="RNRS Logo" width={50} height={50} />
        <span className="text-xl font-bold text-black">RNRS</span>

      </div>

     {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ml-25 space-x-8">
          
              <Link
                href="/"
                className="text-gray-700 hover:underline hover:text-red-800 font-medium transition-colors"
              >
                Home
              </Link>
               <Link
                href="/#about"
                className="text-gray-700 hover:underline hover:text-red-800 font-medium transition-colors"
              >
                About
              </Link>
               <Link
                href="/Hiring"
                className="text-gray-700 hover:underline hover:text-red-800 font-medium transition-colors"
              >
                Hiring
              </Link>
               <Link
                href="/Jobs"
                className="text-gray-700 hover:underline hover:text-red-800 font-medium transition-colors"
              >
                Jobs
              </Link>
              <div className="relative inline-block">
  <div 
    onClick={toggleDropdown}  
    className="text-gray-700 flex flex-row gap-1 hover:underline hover:text-red-800 font-medium transition-colors cursor-pointer"
  >
    Services<FaAngleDown size={20} className="mt-0.5"/>
  </div>

  {isDropdownOpen && (
    <div className="absolute right-0 left-0 mt-2 w-48 bg-gray-200 border border-gray-200 rounded-lg shadow-lg z-50">
      <ul className="py-1">
        <li onClick={()=>{
          toggleDropdown()
          router.push("/SalaryFund")
        }}
         className="px-4 py-1 hover:bg-red-700 hover:text-white cursor-pointer text-red-800">
          Opening Account
        </li>
        <li onClick={()=>{
          toggleDropdown()
          router.push("/ServicesA")
        }}
         className="px-4 py-1  hover:bg-red-700 hover:text-white cursor-pointer text-red-800">
          Payroll Services
        </li>
        <li onClick={()=>{
          toggleDropdown()
          router.push("/JobFinder")
        }}
         className="px-4 py-1 hover:bg-red-700 hover:text-white cursor-pointer text-red-800">
          Daily Job Matching
        </li>
      </ul>
    </div>
  )}
</div>

             
               <Link
                href="/Contacts"
                className="text-gray-700 hover:underline hover:text-red-800 font-medium transition-colors"
              >
              Contact
              </Link>
          
          </nav>

      {/* Icons */}
      <div className="flex items-center gap-4">
       
        <button
          className="py-1 px-3 rounded bg-red-800 text-white hover:bg-red-950"
          onClick={() => setLoginOpen(true)}
        >
        Login
        </button>
        <Globe />
      
      </div>

{/* Hamburger Icon (mobile only) */}
<div className="lg:hidden">
  <button
    onClick={() => setMenuOpen(true)}
    className="text-gray-800 hover:text-red-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</div>

      

      {/* Login modal */}
      {loginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(9,9,5,0.5)] z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative mt-4">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
              onClick={() => setLoginOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <Login
              onSuccess={() => {
                setLoginOpen(false);
                router.push("/Jobs"); 
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile Nav Modal */}
{menuOpen && (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-start pt-20">
    <div className="bg-white w-[90%] max-w-sm rounded-lg shadow-lg p-6 relative">
      <button
        className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-black"
        onClick={() => setMenuOpen(false)}
      >
        ×
      </button>
      <nav className="flex flex-col gap-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 font-medium hover:text-red-800"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  </div>
)}

    </header>
  );
}
