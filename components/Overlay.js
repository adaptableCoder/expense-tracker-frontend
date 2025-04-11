"use client"
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import Button_arrows from '@/components/Button_arrows';
import { ToastContainer, Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Overlay = ({expense, onClose, refreshExpenses}) => {
  const { username } = useContext(UserContext);
  const [form, setForm] = useState({id: '', username: '', amount: '', category: '', mode: '', datetime: '', note: ''})
  const [isLoading, setIsLoading] = useState(true);

  const isButtonDisabled = !form.amount || !form.category || !form.mode || !form.datetime;

  useEffect(() => {
    setForm({id: expense.id, username: username, amount: expense.amount, category: expense.category, mode: expense.mode, datetime: expense.datetime, note: expense.note})
  }, [])
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    const formattedDate = form.datetime.replace("T", " ") + ":00"
    setForm({...form, datetime: formattedDate})

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/editExpenses`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        const result = await response.json()
        
        if (result.success === "true") {
            toast.success(result.message, {
                onClose: () => {
                    if (refreshExpenses) {
                        refreshExpenses();
                    }
                    onClose();
                }
            });
        } else {
            toast.error(result.message, {
                onClose: () => {
                    if (refreshExpenses) {
                        refreshExpenses();
                    }
                    onClose();
                }
            });
        }
        setForm({id: expense.id, username: username, amount: '', category: '', mode: '', datetime: '', note: ''})
    } 
    catch (error) {
        console.error('Fetch error:', error);
        if (error.message.includes('ERR_CONNECTION_REFUSED')) {
            toast.error('Unable to connect to the server. Please try again later.');
        } else {
            toast.error('An error occurred while submitting the details :(');
        }
    }
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
    <div className="w-screen h-screen top-0 left-0 fixed bg-black/20 backdrop-blur-md z-10 flex justify-center items-center">
        <div className="h-fit w-[40%] bg-[#2C2C2C] rounded-3xl shadow-xl flex flex-col items-center gap-3 relative">
            <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white text-2xl w-[4rem] h-[4rem] rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer">
                <lord-icon
                    src="https://cdn.lordicon.com/nqtddedc.json"
                    trigger="hover"
                    state="hover-cross-3"
                    colors="primary:#ffffff"
                    style={{"width":"4rem","height":"4rem"}}>
                </lord-icon>
            </button>
            <div className="w-[100%] my-6">
                <h2 className="text-4xl text-white text-center font-semibold">Edit Expense</h2>
            </div>

            <form method="POST" action="submit" onSubmit={handleSubmit} className="w-[80%] flex flex-col items-start gap-2">
                <p className="text-white text-lg font-semibold">Amount Spent</p>
                <input 
                    type="number" 
                    id="amount" 
                    name="amount" 
                    value={form.amount} 
                    onChange={handleChange} 
                    placeholder="Enter Amount" 
                    className="w-[100%] bg-white rounded-full px-4 py-2 focus:outline-[#008000] mb-3"
                />
        
                <p className="text-white text-lg font-semibold">Category of Expenditure</p>
                <select 
                    id="category" 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    className={`w-[100%] bg-white rounded-full px-4 py-2 focus:outline-[#008000] mb-3 ${form.category ? 'text-black' : 'text-[#929292]'}`}
                >
                    <option value="" disabled>Select a Category of Expenditure</option>
                    <option value="Rent / Mortgage">Rent / Mortgage</option>
                    <option value="Utilities (Electricity, Water, Gas)">Utilities (Electricity, Water, Gas)</option>
                    <option value="Internet / Phone">Internet / Phone</option>
                    <option value="Home Maintenance / Repairs">Home Maintenance / Repairs</option>
        
                    <option value="Groceries">Groceries</option>
                    <option value="Dining Out (Restaurants, Cafés)">Dining Out (Restaurants, Cafés)</option>
                    <option value="Snacks / Beverages">Snacks / Beverages</option>
        
                    <option value="Fuel">Fuel</option>
                    <option value="Public Transit / Ride-Sharing">Public Transit / Ride-Sharing</option>
                    <option value="Parking / Tolls">Parking / Tolls</option>
                    <option value="Vehicle Maintenance / Repairs">Vehicle Maintenance / Repairs</option>
        
                    <option value="Health, Car, Home, Life Insurance">Health, Car, Home, Life Insurance</option>
                    <option value="Loan Payments (Student, Auto, etc.)">Loan Payments (Student, Auto, etc.)</option>
                    <option value="Credit Card Payments">Credit Card Payments</option>
                    <option value="Savings & Investments">Savings & Investments</option>
        
                    <option value="Doctor, Dental & Vision Care">Doctor, Dental & Vision Care</option>
                    <option value="Medications">Medications</option>
                    <option value="Personal Care (Haircuts, Salons)">Personal Care (Haircuts, Salons)</option>
                    <option value="Fitness / Gym Memberships">Fitness / Gym Memberships</option>
        
                    <option value="Movies, Concerts, and Events">Movies, Concerts, and Events</option>
                    <option value="Hobbies">Hobbies</option>
                    <option value="Subscriptions (Streaming, Magazines)">Subscriptions (Streaming, Magazines)</option>
        
                    <option value="Tuition / School Fees">Tuition / School Fees</option>
                    <option value="Books & Supplies">Books & Supplies</option>
                    <option value="Childcare / Babysitting">Childcare / Babysitting</option>
                    <option value="Extracurricular Activities">Extracurricular Activities</option>
        
                    <option value="Transportation (Flights, Trains, etc.)">Transportation (Flights, Trains, etc.)</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Dining & Activities on Vacation">Dining & Activities on Vacation</option>
                    <option value="Travel Insurance">Travel Insurance</option>
        
                    <option value="Gifts (Birthdays, Holidays)">Gifts (Birthdays, Holidays)</option>
                    <option value="Charitable Donations">Charitable Donations</option>
        
                    <option value="Pet Care (Food, Vet Visits)">Pet Care (Food, Vet Visits)</option>
                    <option value="Office / Stationery Supplies">Office / Stationery Supplies</option>
        
                    <option value="Emergency Fund">Emergency Fund</option>
                    <option value="Taxes">Taxes</option>
                    <option value="Retirement Contributions">Retirement Contributions</option>
                    <option value="Special Projects (Home Renovations, etc.)">Special Projects (Home Renovations, etc.)</option>
                    <option value="Major Purchases (Appliances, Electronics)">Major Purchases (Appliances, Electronics)</option>
                    <option value="Seasonal Expenses (Holidays, Back to School)">Seasonal Expenses (Holidays, Back to School)</option>
                    <option value="Clothing & Accessories">Clothing & Accessories</option>
                    <option value="Online Courses / Workshops">Online Courses / Workshops</option>
                    <option value="Professional Development">Professional Development</option>
                    
                    <option value="Other / Uncategorized Expenses">Other / Uncategorized Expenses</option>
                </select>
        
                <p className="text-white text-lg font-semibold">Mode of Payment</p>
                <select 
                    id="mode" 
                    name="mode" 
                    value={form.mode} 
                    onChange={handleChange} 
                    className={`w-[100%] bg-white rounded-full px-4 py-2 focus:outline-[#008000] mb-3 ${form.mode ? 'text-black' : 'text-[#929292]'}`}
                >
                    <option value="" disabled>Select a Mode of Payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Mobile Wallet">Mobile Wallet (Paytm, Google Pay, etc.)</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Crypto">Cryptocurrency</option>
                    <option value="Gift Card">Gift Card</option>
                    <option value="Other">Other</option>
                </select>
        
                <p className="text-white text-lg font-semibold">Date</p>
                <input 
                    type="datetime-local" 
                    id="datetime" 
                    name="datetime" 
                    value={form.datetime} 
                    onChange={handleChange} 
                    className={`w-[100%] bg-white rounded-full px-4 py-2 focus:outline-[#008000] mb-3 ${form.datetime ? 'text-black' : 'text-[#929292]'}`}
                />
        
                <p className="text-white text-lg font-semibold">Extra Notes <span className="text-[#00FF87] !text-sm font-light">&nbsp;Optional</span></p>
                <input 
                    type="textarea" 
                    id="note" 
                    name="note" 
                    value={form.note} 
                    onChange={handleChange} 
                    placeholder="Enter a note here" 
                    className="w-[100%] bg-white rounded-full px-4 py-2 outline-0 focus:outline-[#008000] mb-3"
                />
                
                <button type="submit" disabled={isButtonDisabled} className="w-full flex justify-center mb-5">
                    <Button_arrows text="Save" disabled={isButtonDisabled} tooltip="Please fill in the details"/>
                </button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Overlay
