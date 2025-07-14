import { useSelector } from "react-redux";

const GoalStatus = () => {
  const savingsGoal = useSelector((state) => state.savingsGoal);
  const remainAmt = useSelector((state) => state.remainAmt);

  if (!savingsGoal.title || !savingsGoal.amount) return null;

  const percent = Math.min((remainAmt / savingsGoal.amount) * 100, 100).toFixed(
    0
  );
  const isComplete = remainAmt >= savingsGoal.amount;

  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 rounded mb-4">
      <h3 className="font-bold">🎯 Goal: {savingsGoal.title}</h3>
      <p>
        Saved ₹{remainAmt} out of ₹{savingsGoal.amount}
      </p>
      <div className="w-full bg-blue-200 h-3 rounded mt-2 overflow-hidden">
        <div
          className="bg-blue-600 h-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1">
        {isComplete ? "✅ Goal Achieved!" : `${percent}% progress`}
      </p>
    </div>
  );
};

export default GoalStatus;
