import jsPDF from "jspdf";

export const generatePayslipPDF = (payroll) => {
  const doc = new jsPDF();
  let y = 10;
  const lineHeight = 10;

  // Header
  doc.setFontSize(18);
  doc.text("Employee Payslip", 70, y);
  y += 15;

  doc.setFontSize(12);

  // Employee Info
  doc.text(`Name: ${payroll.name}`, 10, y); y += lineHeight;
  doc.text(`Position: ${payroll.position}`, 10, y); y += lineHeight;
  doc.text(`Payment Date: ${payroll.paymentDate}`, 10, y); y += lineHeight;

  // Salary Breakdown
  doc.text(`Basic Salary: RWF ${Number(payroll.basicSalary).toLocaleString()}`, 10, y); y += lineHeight;
  doc.text(`Bonus: RWF ${Number(payroll.bonus || 0).toLocaleString()}`, 10, y); y += lineHeight;
  doc.text(`Deductions: RWF ${Number(payroll.deductions || 0).toLocaleString()}`, 10, y); y += lineHeight;

  const netSalary = Number(payroll.basicSalary) + Number(payroll.bonus || 0) - Number(payroll.deductions || 0);
  doc.text(`Net Salary: RWF ${netSalary.toLocaleString()}`, 10, y); y += lineHeight;

  // Save the PDF
  const filename = `Payslip_${payroll.name.replace(/\s+/g, "_")}_${payroll.paymentDate.replace(/\//g, "-")}.pdf`;
  doc.save(filename);
};
