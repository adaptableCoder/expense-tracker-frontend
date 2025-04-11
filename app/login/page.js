"use client"
import React, { useState, useContext } from 'react'
import Button_slice from '@/components/Button_slice'
import Button_colorful from '@/components/Button_colorful'
import Link from 'next/link'
import { ToastContainer, Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [loginform, setloginForm] = useState({ username: '', password: '' })
  const { setUsername } = useContext(UserContext)
  const router = useRouter()
  const isButtonDisabled = !loginform.username || !loginform.password;

  const handleChange = (e) => {
    setloginForm({ ...loginform, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginform)
      })
      const result = await response.json()

      if (result.success === "true") {
        setUsername(loginform.username) // Set the username globally
        toast.success(result.message)
        router.push('/dashboard')
      } else {
        toast.error(result.message)
      }
      setloginForm({ username: '', password: '' })

    } catch (error) {
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
        <div className="w-[40%] h-[70%] bg-white rounded-3xl p-8 flex flex-col justify-around items-center gap-3">
          <h1 className="text-4xl">Login</h1>
          <div className="flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/xnvwuhmw.json"
              trigger="hover"
              style={{ "width": "2rem", "height": "2rem" }}>
            </lord-icon>
            <h2 className="text-xl font-semibold">Expense<span className="text-[#008000]">Tracker</span></h2>
          </div>
          <form method="POST" onSubmit={handleSubmit} className="w-[70%] flex flex-col justify-center items-center gap-3 my-8">
            <p className="text-xl text-[#008000] font-semibold">Enter your Username</p>
            <input type="text" id="username" name="username" value={loginform.username} onChange={handleChange} placeholder="eg:- smartUser001" className="w-[100%] h-[3rem] border-2 border-[#008000] rounded-full px-5 py-2" />

            <p className="text-xl text-[#008000] font-semibold">Enter your Password</p>
            <input type="password" id="password" name="password" value={loginform.password} onChange={handleChange} placeholder="eg:- Pass@ExpnsTrk25" className="w-[100%] h-[3rem] border-2 border-[#008000] rounded-full px-5 py-2" />
            <button type="submit" disabled={isButtonDisabled}>
              <Button_slice text="Login" disabled={isButtonDisabled} tooltip="Please fill in the details"/>
            </button>
          </form>
          <h2 className="text-[#008000] text-lg">Don't have an account?</h2>
          <Link href="/signup"><Button_colorful text="Sign Up" icon_code="hrjifpbq"/></Link>
        </div>
      </div>
    </>
  )
}

export default Login
