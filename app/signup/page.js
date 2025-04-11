"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Button_slice from '@/components/Button_slice'
import Button_colorful from '@/components/Button_colorful'
import { ToastContainer, Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [form, setForm] = useState({username: '', password: ''})
  const isButtonDisabled = !form.username || !form.password;

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      })

      const result = await response.json()

      setForm({username: '', password: ''})
      
      if (result.message === "New Username & Password created successfully!") {
        toast.success(result.message)
      }
      else {
        toast.info(result.message)
      }

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
    <div className="w-[80%] min-h-[90dvh] flex justify-center items-center">
        <div className="w-[40%] h-[70%] bg-white rounded-3xl p-8 flex flex-col items-center justify-around gap-3">
          <h1 className="text-4xl">SignUp</h1>
          <div className="flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/xnvwuhmw.json"
              trigger="hover"
              style={{"width":"2rem","height":"2rem"}}>
            </lord-icon>
            <h2 className="text-xl font-semibold">Expense<span className="text-[#008000]">Tracker</span></h2>
          </div>
          <form method="POST" onSubmit={handleSubmit} className="w-[70%] flex flex-col justify-center items-center gap-3 my-8">
            <p className="text-xl text-[#008000] font-semibold">Create your Username</p>
            <input type="text" id="username" name="username" value={form.username} onChange={handleChange} placeholder="eg:- exampleUser001" className="w-[100%] h-[3rem] border-2 border-[#008000] rounded-full px-5 py-2"/>

            <p className="text-xl text-[#008000] font-semibold">Create a Password</p>
            <input id="password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="eg:- %secPass@expnsTrk01" className="w-[100%] h-[3rem] border-2 border-[#008000] rounded-full px-5 py-2"/>
            <button type="submit" disabled={isButtonDisabled}>
                <Button_colorful text="Sign Up" disabled={isButtonDisabled} tooltip="Please fill in the details" icon_code="hrjifpbq"/>
            </button>
          </form>
          <h2 className="text-[#008000] text-lg">Already have an account?</h2>
          <Link href="/login"><Button_slice text="Login"/></Link>
        </div>
    </div>
    </>
  )
}

export default Signup
