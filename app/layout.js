import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { UserProvider } from '@/context/UserContext'

export const metadata = {
  title: "ExpenseTracker",
  description: "Expense tracking app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-[#131313] flex flex-col justify-center items-center overflow-x-hidden antialiased`}>
        <UserProvider>
          <Navbar/>
          {children}
          <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
        </UserProvider>
      </body>
    </html>
  );
}
