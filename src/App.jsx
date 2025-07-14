import AddExpense from "./components/AddExpense";
import Budget from "./components/Budget";
import CategoryPieChart from "./components/CategoryPieChart";
import ExpenseList from "./components/ExpenseList";
import GoalStatus from "./components/GoalStatus.js";
import OverheadWarning from "./components/OverheadWarning";

import Remaining from "./components/Remaining";
import SavingsTips from "./components/SavingsTips";
import Search from "./components/Search";
import SetGoal from "./components/SetGoal";
import Spent from "./components/Spent";

function App() {
  return (
    <div className="flex flex-col max-w-[990px] ml-auto mr-auto p-3">
      <h1 className="text-3xl font-semibold mb-5">My Budget Planner</h1>
      <SetGoal />
      <GoalStatus />
      <OverheadWarning />
      <CategoryPieChart />
      <SavingsTips />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
        <div>
          <Budget />
        </div>
        <div>
          <Remaining />
        </div>
        <div>
          <Spent />
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-2 mt-4">Expenses</h1>
      <Search />
      <div>
        <ExpenseList />
      </div>
      <h1 className="text-2xl font-semibold mb-2 mt-4">Add Expenses</h1>
      <div>
        <AddExpense />
      </div>
    </div>
  );
}

export default App;
