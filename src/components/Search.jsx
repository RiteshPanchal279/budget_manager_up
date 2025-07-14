import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { setSearchText } from './store/expenseSlice'

const Search = () => {

  const dispatch=useDispatch()

  return (
    <div className='mb-2'>
      <input type="text" placeholder='Type to search...' className='bg-orange-200 outline-none border-1 border-gray-300 w-full px-2 py-1 rounded' onChange={(e)=>dispatch(setSearchText(e.target.value))} />
    </div>
  )
}

export default Search