import { useSelector } from "react-redux";

const overheadLimits = {
  Food: 0.3,
  Transport: 0.15,
  Rent: 0.4,
  Entertainment: 0.1,
  Others: 0.2,
};

const OverheadWarning = () => {
  const expenses = useSelector((state) => state.expenses);
  const totalAmt = useSelector((state) => state.totalAmt);

  const categoryTotals = {};

  expenses.forEach((exp) => {
    const cat = exp.category || "Others";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(exp.cost);
  });

  const warnings = Object.entries(categoryTotals).filter(([cat, total]) => {
    const limit = overheadLimits[cat] || 0.2;
    return total > totalAmt * limit;
  });

  if (warnings.length === 0) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-4 rounded">
      <strong>⚠️ Spending Warning:</strong>
      <ul className="list-disc list-inside mt-2">
        {warnings.map(([cat, total]) => (
          <li key={cat}>
            {cat}: ₹{total} — over the safe limit ({overheadLimits[cat] * 100}%
            of your budget)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverheadWarning;
