import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [{ id: Date.now(), text: "Example", cost: 0, category: "Food" }],
    totalAmt: 20000,
    spendAmt: 0,
    remainAmt: 20000,
    isEdit: false,
    searchText: "",
    savingsGoal: {
      title: "",
      amount: 0,
    },
  },
  reducers: {
    addExpense: (state, action) => {
      const expense = {
        id: Date.now(),
        text: action.payload.text,
        cost: action.payload.cost,
        category: action.payload.category,
      };
      state.expenses.push(expense);
    },
    deleteExp: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
    },
    spentAmount: (state) => {
      state.spendAmt = state.expenses.reduce(
        (total, exp) => exp.cost + total,
        0
      );
    },
    remainAmount: (state) => {
      state.remainAmt = state.totalAmt - state.spendAmt;
    },
    isEditable: (state) => {
      state.isEdit = !state.isEdit;
    },
    manageBudget: (state, action) => {
      state.totalAmt = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSavingsGoal: (state, action) => {
      state.savingsGoal = action.payload;
    },
  },
});

export const {
  addExpense,
  deleteExp,
  spentAmount,
  remainAmount,
  isEditable,
  manageBudget,
  setSearchText,
  setSavingsGoal,
} = expenseSlice.actions;

export const expenseReducer = expenseSlice.reducer;
