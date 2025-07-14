import { MdCancel } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteExp, remainAmount, spentAmount } from './store/expenseSlice';


const ExpenseItem = ({id,cost,text,category}) => {
  const dispatch=useDispatch();

  
  const handleDelete=(id)=>{
    dispatch(deleteExp(id))
    dispatch(spentAmount())
    dispatch(remainAmount())
  }
  
  return (
    <li className='flex bg-gray-300 p-3 gap-1 justify-between items-center rounded'>
      {text}
      <div className=''>
        {category}
      </div>
      <div className='flex items-center gap-10'>
         <span className='rounded-full text-white bg-blue-500 px-3'>₹{cost}</span>
         <MdCancel onClick={()=>handleDelete(id)}  className='size-5.5 cursor-pointer'/>
      </div>
      
    </li>
  )
}

export default ExpenseItem