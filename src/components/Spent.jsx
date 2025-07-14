import React from 'react'
import { useSelector } from 'react-redux'
const Spent = () => {
  const sepntAmt = useSelector((state)=>state.spendAmt)
  return (
    <div className='rounded p-3 bg-blue-200'>
      <span className='font-semibold'>Spent so far : ₹{sepntAmt}</span>
    </div>
  )
}

export default Spent