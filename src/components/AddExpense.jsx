import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense, remainAmount, spentAmount } from "./store/expenseSlice";

const AddExpense = () => {
  const categories = ["Food", "Transport", "Rent", "Entertainment", "Others"];
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(addExpense({ text, cost,category }));
    dispatch(spentAmount());
    dispatch(remainAmount());
    setText("");
    setCost("");
    setCategory("")
  };
  return (
    <form onSubmit={handleSave}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border rounded outline-none px-2 py-1 mr-2"
            value={text}
            placeholder="Enter expenses.."
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            id="cost"
            className="border rounded outline-none px-2 py-1 mr-2"
            value={cost}
            placeholder="Enter cost.."
            onChange={(e) => setCost(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category">Category</label>
          <select
            className="border rounded outline-none px-2 py-1 mr-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Categary</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="border mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default AddExpense;
