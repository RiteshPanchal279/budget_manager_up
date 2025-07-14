import React from "react";
import { useSelector } from "react-redux";

const overheadLimits = {
  Food: 0.3,
  Transport: 0.15,
  Rent: 0.4,
  Entertainment: 0.1,
  Others: 0.2,
};

const suggestionsMap = {
  Food: "Try cooking at home or reducing takeout orders.",
  Transport: "Consider carpooling or using public transport.",
  Rent: "Negotiate rent or look for shared living if possible.",
  Entertainment: "Limit subscriptions or choose free entertainment.",
  Others: "Review miscellaneous expenses for unnecessary buys.",
};

const SavingsTips = () => {
  const expenses = useSelector((state) => state.expenses);
  const totalAmt = useSelector((state) => state.totalAmt);

  const totals = {};

  expenses.forEach((exp) => {
    const cat = exp.category || "Others";
    totals[cat] = (totals[cat] || 0) + Number(exp.cost);
  });

  const tips = Object.entries(totals)
    .filter(([cat, total]) => {
      const limit = overheadLimits[cat] || 0.2;
      return total > totalAmt * limit;
    })
    .map(([cat, total]) => {
      const limit = overheadLimits[cat] || 0.2;
      const maxSafe = totalAmt * limit;
      const overspent = total - maxSafe;
      return {
        category: cat,
        suggestion:
          suggestionsMap[cat] || "Try reducing costs in this category.",
        overspent: Math.round(overspent),
      };
    });

  if (tips.length === 0) return null;

  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 my-4 rounded">
      <strong>💡 Smart Savings Tips</strong>
      <ul className="list-disc list-inside mt-2">
        {tips.map((tip, index) => (
          <li key={index}>
            <span className="font-semibold">{tip.category}</span>:{" "}
            {tip.suggestion}
            <br />
            <span className="text-sm text-gray-700">
              You could save around ₹{tip.overspent}.
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingsTips;
