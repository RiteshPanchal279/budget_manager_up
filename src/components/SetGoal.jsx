import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSavingsGoal } from "./store/expenseSlice";

const SetGoal = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    dispatch(setSavingsGoal({ title, amount: Number(amount) }));
    setTitle("");
    setAmount("");
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 my-6">
      <h2 className="text-lg font-semibold mb-2">Set Savings Goal 🎯</h2>
      <input
        type="text"
        placeholder="Goal Title (e.g., Laptop)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Goal
      </button>
    </form>
  );
};

export default SetGoal;
