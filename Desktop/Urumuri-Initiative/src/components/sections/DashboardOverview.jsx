"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaDollarSign, FaUsers, FaUndo } from "react-icons/fa";
import styles from "./DashboardView.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardOverview() {
  const stats = [
    { label: "Total Sales", value: 9328.55, change: "+15%", icon: FaDollarSign },
    { label: "Visitors", value: 12302, change: "+12.7%", icon: FaUsers },
    { label: "Refunds", value: 963, change: "-12.7%", icon: FaUndo },
  ];

  const chartData = {
    labels: ["Jul 9", "Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14", "Jul 15"],
    datasets: [
      {
        label: "Sales Performance",
        data: [100, 200, 150, 300, 250, 350, 400],
        borderColor: "#1C2526",
        backgroundColor: "rgba(28, 37, 38, 0.2)",
        pointBackgroundColor: "#1C2526",
        pointBorderColor: "#ffffff",
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#000000" } },
      x: { ticks: { color: "#000000" } },
    },
  };

  const topCategories = [
    { name: "Electronics", value: 5634, percent: 45 },
    { name: "Laptops", value: 4321, percent: 35 },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.welcome}>Welcome back, Matthew</h1>
          <p className={styles.subtitle}>Here are today’s stats from your online store</p>
        </div>
        <div className={styles.headerActions}>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
          <div className={styles.profile}>
            <img src="/assets/me.jpg" alt="Matthew Parker" className={styles.profileImg} />
            <span className={styles.profileName}>Matthew Parker</span>
          </div>
        </div>
      </header>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <stat.icon className={styles.statIcon} />
            <div>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{`$${stat.value.toFixed(2)}`}</p>
              <p className={stat.change.startsWith("+") ? styles.statChangePositive : styles.statChangeNegative}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Sales Performance</h3>
            <button className={styles.exportButton}>Export Data</button>
          </div>
          <div className={styles.chartWrapper}>
            <Line data={chartData} options={chartOptions} />
          </div>
          <p className={styles.chartPeriod}>Last 7 Days</p>
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Top Categories</h3>
          <div className={styles.categoryChart}>
            {topCategories.map((category, index) => (
              <div key={index} className={styles.categoryItem}>
                <div className={styles.categoryProgress} style={{ "--progress": `${category.percent}%` }}>
                  <span className={styles.categoryValue}>{`$${category.value.toLocaleString()}`}</span>
                </div>
                <p className={styles.categoryName}>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}