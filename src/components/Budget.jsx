import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEditable, manageBudget, remainAmount } from "./store/expenseSlice";

const Budget = () => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.isEdit);
  const totalAmt = useSelector((state) => state.totalAmt);
  const [budget, setBudget] = useState(totalAmt);

  const handlaEdit = () => {
    dispatch(isEditable())
    dispatch(manageBudget(budget));
    dispatch(remainAmount())
  };

  const handelInput = (e) => {
    setBudget(e.target.value);
  };

  return (
    <div className=" flex justify-between rounded p-3 bg-gray-200">
      {edit ? (
        <>
          <input type="number" value={budget} className="text-md" onChange={handelInput} />
        </>
      ) : (
        <>
          <span className="font-semibold">Budget : ₹{budget}</span>
        </>
      )}
      <button
        className="border-1 px-2 bg-blue-500 text-white rounded cursor-pointer "
        onClick={handlaEdit}
      >
        {edit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Budget;
