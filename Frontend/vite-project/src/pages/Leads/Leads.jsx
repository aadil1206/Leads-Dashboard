import React from 'react'
import { FaPlus } from "react-icons/fa6";


const Leads = () => {
  return (
    <div>
 
      <div className='flex justify-between h-[92px] items-center'>
        <div>
            <p>Leads</p>
            <span>Manage And Track Your Leads</span>
        </div>
        <button>
            <FaPlus />
<span>Add Lead</span>
        </button>
      </div>
    </div>
  )
}

export default Leads
