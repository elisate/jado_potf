"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBell,
} from "react-icons/fa";
import styles from "../sections/sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  if (!pathname) {
    console.log("pathname is undefined, likely server-side rendering issue");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { name: "Agents", path: "/dashboard/agents", icon: FaUsers },
    { name: "Activities", path: "/dashboard/agents/activities", icon: FaChartLine },
    { name: "Finance", path: "/dashboard/agents/finance", icon: FaChartLine },
    { name: "Account", path: "/dashboard/profile", icon: FaUser },
    { name: "Notifications", path: "/dashboard/profile/notifications", icon: FaBell },
    { name: "Settings", path: "/dashboard/settings", icon: FaCog },
  ];

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.title}>RNRS</div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.navLink} ${pathname === item.path ? styles.active : ""}`}
            >
              <item.icon className={styles.navButtonIcon} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout button pinned to the bottom */}
      <Link href="/logout" className={`${styles.navLink} ${styles.logout}`}>
        <FaSignOutAlt className={styles.navButtonIcon} />
        Logout
      </Link>
    </aside>
  );
}
