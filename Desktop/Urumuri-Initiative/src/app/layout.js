"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "../components/layout/footer";
import { UserProvider } from "@/context/userContext";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // From gisele-features (base)
  const routesWithHeaderFooter = [
    "/",
    "/About",
    "/Hiring",
    "/JobApply",
    "/SalaryFund",
    "/login",
    "/createOrganisation",

    "/dashboard", // keep root dashboard route

    "/Employeeinfo",
    "/Jobs",
    "/Contacts",
    "/AgentCode",
    "/JobFinder",
    "/ServicesA"
    

  ];

  // From main — add missing routes that seem relevant:
  routesWithHeaderFooter.push("/Employeeinfo", "/Jobs", "/Contacts");

  // Show header/footer if NOT on /dashboard or its subroutes AND pathname not in routesWithoutHeaderFooter
  // But routesWithoutHeaderFooter isn't defined in either, so remove that condition to avoid errors
  // So simplified to: show header/footer if pathname is in routesWithHeaderFooter or their subroutes

  const shouldShowHeaderFooter = routesWithHeaderFooter.some(
    (route) =>
      pathname === route || (route !== "/" && pathname?.startsWith(route + "/"))
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          {shouldShowHeaderFooter && <Header />}
          <main>{children}</main>
          {shouldShowHeaderFooter && <Footer />}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
