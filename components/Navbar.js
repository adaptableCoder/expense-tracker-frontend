"use client";
import React, { useContext } from 'react'
import Link from 'next/link'
import Button_colorful from './Button_colorful'
import Button_slice from './Button_slice'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link as ScrollLink } from 'react-scroll'

const Navbar = () => {
  const { username, setUsername } = useContext(UserContext)
  const router = useRouter();

  const handleSignOut = () => {
    setUsername(null); // Clear the username in context
    router.push('/'); // Redirect to the home page
  };

  return (
    <>
      <div className="w-screen h-fit flex flex-col justify-center items-center bg-[#131313]">
        <nav className="w-screen h-[5rem] bg-[#131313] flex justify-center items-center">
          <div className="logo w-[25%] h-[100%] flex justify-start items-center">
            <lord-icon
              src="https://cdn.lordicon.com/xnvwuhmw.json"
              trigger="hover"
              style={{ "width": "4rem", "height": "4rem" }}>
            </lord-icon>
            <h1 className="text-white text-2xl font-semibold">Expense</h1>
            <h1 className="text-[#00FF87] text-2xl font-semibold">Tracker</h1>
          </div>

          <div className="options w-[30%] h-[100%] flex justify-center items-center text-white text-md">
            {username ? (
              <p></p>
            ) : (
              <ul className="w-[100%] h-[100%] flex justify-center items-center gap-12">
                <Link href="/">
                  <li className="hover:text-[#adff2f] transition-colors duration-500">Home</li>
                </Link>
                <ScrollLink to="userguide" smooth={true} duration={500}>
                  <li className="hover:text-[#adff2f] transition-colors duration-500 cursor-pointer">How to Use</li>
                </ScrollLink>
                <ScrollLink to="features" smooth={true} duration={500}>
                  <li className="hover:text-[#adff2f] transition-colors duration-500 cursor-pointer">Features</li>
                </ScrollLink>
              </ul>
            )}
          </div>

          <div className="buttons w-[25%] h-[100%] px-10 flex justify-end items-center gap-2">
            {username ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className="text-white text-lg border-2 border-white px-4 py-2 rounded-full flex justify-center items-center">
                      Welcome,&nbsp;<span className="text-[#00FF87] font-semibold">{username}</span>
                      &nbsp;
                      <lord-icon
                        src="https://cdn.lordicon.com/xcrjfuzb.json"
                        trigger="hover"
                        colors="primary:#fff"
                        style={{"width":"2rem","height":"2rem"}}>
                      </lord-icon>
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                    <Link href="/addexpenses"><DropdownMenuItem>Add Expenses</DropdownMenuItem></Link>
                    <Link href="/manageexpenses"><DropdownMenuItem>Manage Expenses</DropdownMenuItem></Link>
                    <Link href="/trackexpenses"><DropdownMenuItem>Track Expenses</DropdownMenuItem></Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><button onClick={handleSignOut}><Button_colorful text="Sign Out" icon_code="vhydshht"/></button></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
              </>
            ) : (
              <>
                <Link href="/login"><Button_slice text="Login" /></Link>
              </>
            )}
          </div>
        </nav>

        <div className="w-screen h-[0.2rem] bg-gradient-to-r from-[#4FC1E9] to-[#08f774]"></div>
      </div>
    </>
  )
}

export default Navbar;
