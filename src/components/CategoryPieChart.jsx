import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#d0ed57",
  "#a4de6c",
];

const CategoryPieChart = () => {
  const expenses = useSelector((state) => state.expenses);

  const categoryTotals = {};

  expenses.forEach((exp) => {
    const cat = exp.category || "Others";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(exp.cost);
  });
  console.log(categoryTotals)

  const data = Object.entries(categoryTotals).map(([category, cost]) => ({
    name: category,
    value: cost,
  }));
  console.log(data)

  if (data.length === 0) return null;

  return (
    <div className="bg-white p-4 flex flex-col justify-center items-center rounded shadow my-4">
      <h2 className="text-lg font-semibold mb-4 ">Spending by Category</h2>
      <PieChart width={370} height={370} >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryPieChart;
