import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses);
  const searchText = useSelector((state) => state.searchText);

  return (
    <ul className="flex flex-col gap-1">
      {expenses
        .filter((val) => {
          if (searchText == "") {
            return val;
          } else if (
            val.text.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return val;
          }
        })
        .map((exp) => (
          <ExpenseItem
            key={exp.id}
            id={exp.id}
            text={exp.text}
            cost={exp.cost}
            category ={exp.category }
          />
        ))}
    </ul>
  );
};

export default ExpenseList;
