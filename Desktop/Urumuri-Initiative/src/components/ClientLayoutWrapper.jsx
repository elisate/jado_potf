// components/ClientLayoutWrapper.jsx
"use client"
import { usePathname } from 'next/navigation';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
 
  const routesWithHeaderFooter = [
    '/', // Home page
    '/About',
    '/Hiring',
    '/JobApply',
    '/login'
  ];
  
  const shouldShowHeaderFooter = routesWithHeaderFooter.some(route =>
    pathname === route || (route !== '/' && pathname?.startsWith(route + '/'))
  );

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <main>
        {children}
      </main>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}