import { createSlice,nanoid } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorageUtils";
export const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: loadFromLocalStorage("expenses", [
      { id: nanoid(), text: "Example", cost: 0, category: "Others",date:new Date().toISOString() },
    ]),
    totalAmt: loadFromLocalStorage("totalAmt", 20000),
    spendAmt: 0,
    remainAmt: loadFromLocalStorage("remainAmt", 20000),
    isEdit: false,
    searchText: "",
    savingsGoal: loadFromLocalStorage("savingsGoal", {
      title: "",
      amount: 0,
    }),
  },
  reducers: {
    addExpense: (state, action) => {
      const expense = {
        id: nanoid(),
        text: action.payload.text,
        cost: action.payload.cost,
        category: action.payload.category,
        date:new Date().toISOString()
      };
      state.expenses.push(expense);
      saveToLocalStorage("expenses", state.expenses);
    },
    deleteExp: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      saveToLocalStorage("expenses", state.expenses);
    },
    spentAmount: (state) => {
      state.spendAmt = state.expenses.reduce(
        (total, exp) => exp.cost + total,
        0
      );
    },
    remainAmount: (state) => {
      state.remainAmt = state.totalAmt - state.spendAmt;
      saveToLocalStorage("remainAmt", state.remainAmt);
    },
    isEditable: (state) => {
      state.isEdit = !state.isEdit;
    },
    manageBudget: (state, action) => {
      state.totalAmt = action.payload;
      saveToLocalStorage("totalAmt", state.totalAmt);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSavingsGoal: (state, action) => {
      state.savingsGoal = action.payload;
      saveToLocalStorage("savingsGoal", state.savingsGoal);
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
