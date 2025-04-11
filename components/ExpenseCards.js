import React from 'react'

const ExpenseCards = ({expenses, color}) => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
        {expenses.map((expense, index) => (
            // <div key={index} className="w-[90%] bg-white p-3 rounded-2xl flex flex-col">
            <div key={index} className="w-[90%] bg-[#2C2C2C] p-3 rounded-2xl flex flex-col">
                <div className="w-full flex justify-between items-center">
                    <span className="text-md font-bold text-xl" style={{color: color}}>{expense.category}</span>
                    <span className="font-semibold text-xl" style={{color: color}}>₹{expense.amount}</span>
                </div>
                <div className="w-full flex flex-col text-sm text-[#E0E0E0]">
                {/* <div className="w-full flex flex-col text-md text-black"> */}
                    <span className="font-semibold">~ {expense.mode}</span>
                    <span>{expense.datetime}</span>
                </div>
                <div className="w-full my-2 border-t border-[#868686]"></div>
                {expense.note && <p className="text-[#888686] text-sm">{expense.note}</p>}
            </div>
        ))}
    </div>
  )
}

export default ExpenseCards
