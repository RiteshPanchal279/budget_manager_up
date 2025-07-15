import { useRef } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MonthlySummary = () => {
  const expenses = useSelector((state) => state.expenses);

  const summaryRef = useRef();

  const handleDownload = async () => {
    const element = summaryRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("monthly-summary.pdf");
  };

  // Group by month
  const grouped = {};

  expenses.forEach((exp) => {
    const month = format(new Date(exp.date), "MMMM yyyy"); // e.g., "July 2025"

    //  if we dont have key of this month so we are initiaalizing this key as month and value as array
    if (!grouped[month]) grouped[month] = [];
    //  pushing each exp of this month in array
    grouped[month].push(exp);
  });

  // summary per month
  const summaries = Object.entries(grouped).map(([month, items]) => {
    const total = items.reduce((sum, exp) => sum + Number(exp.cost), 0);

    const categoryTotals = {};
    items.forEach((exp) => {
      const cat = exp.category || "Others";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + exp.cost;
    });

    const topCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      month,
      total,
      count: items.length,
      topCategory: topCategory ? topCategory[0] : "N/A",
    };
  });

  if (summaries.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">📅 Monthly Summary</h2>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      <div ref={summaryRef} className="space-y-4">
        {summaries.map((sum, i) => (
          <div key={i} className="border-b pb-2">
            <h3 className="font-semibold">{sum.month}</h3>
            <p>Total Spent: ₹{sum.total}</p>
            <p>Transactions: {sum.count}</p>
            <p>Top Category: {sum.topCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummary;
