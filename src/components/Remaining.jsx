import React from 'react'
import { useSelector } from 'react-redux'

const Remaining = () => {
  const remaiAmt = useSelector((state)=>state.remainAmt)
  return (
    <div className={`rounded p-3 ${remaiAmt<=0 ? " bg-red-200":" bg-green-200"} `}>
      <span className='font-semibold'>   {remaiAmt<=0 ?"Over spent amount" : "Remaining"}  : ₹{Math.abs(remaiAmt)}</span>
    </div>
  )
}

export default Remaining