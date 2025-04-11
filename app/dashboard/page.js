"use client"
import React,{ useState, useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import '@/app/globals.css'

const Dashboard = () => {
  const { username } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  const [totalExpenses, settotalExpenses] = useState()
  const [totalAmount, settotalAmount] = useState()
  const [currentMonth_totalExpenses, setcurrentMonth_totalExpenses] = useState()
  const [currentMonth_totalAmount, setcurrentMonth_totalAmount] = useState()
  const [categoriesUsed, setcategoriesUsed] = useState()
  const [modesUsed, setmodesUsed] = useState()
  const [maxAmount, setmaxAmount] = useState()
  const [mostSpentCategory, setmostSpentCategory] = useState()
  const [mostUsedMode, setmostUsedMode] = useState()

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/api/dashboard', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username }),
      });

      const data = await response.json();

      settotalExpenses(data.totalExpenses)
      settotalAmount(data.totalAmount)
      setcurrentMonth_totalExpenses(data.currentMonth_totalExpenses)
      setcurrentMonth_totalAmount(data.currentMonth_totalAmount)
      setcategoriesUsed(data.categoriesUsed)
      setmodesUsed(data.modesUsed)
      setmaxAmount(data.maxAmount)
      setmostSpentCategory(data.mostSpentCategory)
      setmostUsedMode(data.mostUsedMode)

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])
  

  return (
    <>
    <div className="w-[55%] min-h-[90dvh] flex flex-col items-center">
      <div className="w-[100%] flex flex-col items-center justify-center gap-2 my-8">
        <h1 className="text-white text-4xl text-center">Hey, <span className="text-[#00FF87]">{username}!</span></h1>
        <h2 className="text-[#868686] text-lg text-center">Welcome to ExpenseTracker<br/> This is your Dashboard.</h2>
      </div>

      <div className="w-[100%] grid grid-cols-3 gap-10">
        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/mjcariee.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">{totalExpenses}</h1>
          <p className="text-white w-full text-md">Expenses till now</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/wihtlpqk.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">₹ {totalAmount}</h1>
          <p className="text-white w-full text-md">Spent till now</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/dafdkyyt.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">{currentMonth_totalExpenses}</h1>
          <p className="text-white w-full text-md">Expenses this month</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/hwxmpvjm.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">₹ {currentMonth_totalAmount}</h1>
          <p className="text-white w-full text-md">Spent this month</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/xuyycdjx.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">{categoriesUsed}</h1>
          <p className="text-white w-full text-md">Categories of expenditure used this month</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/gjjvytyq.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">{modesUsed}</h1>
          <p className="text-white w-full text-md">Payment Modes used this month</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/abvsilxn.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">₹ {maxAmount}</h1>
          <p className="text-white w-full text-md">Highest Expense till now</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/pbrgppbb.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">{mostSpentCategory}</h1>
          <p className="text-white w-full text-md">Most spent category of expenditure</p>
        </div>

        <div className="bg-[#2c2c2c] rounded-3xl p-4 flex flex-col items-start justify-center gap-2 card">
          <lord-icon
            src="https://cdn.lordicon.com/rthprvqq.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-[#00FF87] w-full text-3xl font-semibold">{mostUsedMode}</h1>
          <p className="text-white w-full text-md">Frequently used mode of payment</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
