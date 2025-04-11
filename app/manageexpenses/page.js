"use client"
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import { ToastContainer, Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Overlay from '@/components/Overlay'

const ManageExpenses = () => {
  const { username } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenseData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trackExpenses`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ username }),
      });
      
      const data = await response.json();
      const allExpenses = data.all_expenses || [];
      
      setExpenses(allExpenses);
      setIsLoading(false);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const deleteExpense = async (expense) => {
    setIsLoading(true);

    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteExpenses`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({id: expense.id, username: username}),
        });
  
        const result = await response.json();
  
        if (result.success === "true") {
          toast.success(result.message);
          setExpenses(expenses.filter(exp => exp !== expense));
        }
        else {
          toast.error(result.message);
        }
        setIsLoading(false);
      } 
      catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  const editExpense = (expense) => {
    setSelectedExpense(expense);
    setShowOverlay(true);
  }
  
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Slide}
    />
    {showOverlay && <Overlay 
      expense={selectedExpense} 
      onClose={() => setShowOverlay(false)} 
      refreshExpenses={fetchExpenseData}
    />}
    <div className="w-[80%] min-h-[90dvh] p-6 flex flex-col items-center">
      <div className="w-[100%] flex flex-col items-center justify-center gap-2 my-4">
        <h1 className="text-white text-4xl">Hey, <span className="text-[#00FF87]">{username} !</span></h1>
        <h2 className="text-[#868686] text-lg text-center">Welcome to the Manage Expenses Page.<br />Here you can Edit or Delete your expenses.</h2>
      </div>

      <div className="w-[100%] flex justify-center items-center">
        <div className="expenses w-[50%] h-full flex flex-col items-center">
        
          <div className="w-[100%] max-h-[70dvh] overflow-y-auto">
            {isLoading ? (
                <p className="text-[#868686] w-[100%] text-center">Loading expense data...</p>
            ) : error ? (
                <p className="text-red-500 w-[100%] text-center">Error: {error}</p>
            ) : expenses.length === 0 ? (
                <p className="text-[#868686] w-[100%] text-center">No expense data available</p>
            ) : (
                <div className="w-full flex flex-col items-center gap-3">
                    {expenses.map((expense, index) => (
                      <div key={index} className="w-[100%] flex gap-3">
                        <div key={`expense-${index}`} className="w-[90%] bg-[#2C2C2C] p-3 rounded-2xl flex flex-col">
                          <div className="w-full flex justify-between items-center">
                              <span className="text-md font-bold text-xl text-[#00FF87]">{expense.category}</span>
                              <span className="font-semibold text-xl text-[#00FF87]">₹{expense.amount}</span>
                          </div>
                          <div className="w-full flex flex-col text-sm text-[#E0E0E0]">
                              <span className="font-semibold">~ {expense.mode}</span>
                              <span>{expense.datetime}</span>
                          </div>
                          <div className="w-full my-2 border-t border-[#868686]"></div>
                          {expense.note && <p className="text-[#888686] text-sm">{expense.note}</p>}
                      </div>

                        <div className="w-[10%] flex flex-col justify-center items-center gap-3">
                            <button onClick={()=>editExpense(expense)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{"width":"2rem","height":"2rem"}}>
                              </lord-icon>
                            </button>
                            <button onClick={()=>deleteExpense(expense)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{"width":"2rem","height":"2rem"}}>
                              </lord-icon>
                            </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default ManageExpenses
