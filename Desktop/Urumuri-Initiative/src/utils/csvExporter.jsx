// src/utils/csvExporter.js
export const exportCSV = (data) => {
    const headers = [
      "Name,Position,Department,Basic Salary,Bonus,Deductions,Payment Date",
    ];
    const rows = data.map(
      (item) =>
        `${item.name},${item.position},${item.department},${item.basicSalary},${item.bonus},${item.deductions},${item.paymentDate}`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "payroll_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  