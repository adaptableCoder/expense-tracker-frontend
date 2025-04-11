import Image from "next/image";
import Button_arrows from "@/components/Button_arrows";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <main className="flex flex-col justify-center items-center">
      <section className="w-[80%] min-h-[90dvh] flex justify-center items-center">
        <div className="w-[60%] h-[100%] py-10 flex flex-col justify-center items-start gap-6">
          <h1 className="text-white text-6xl xl:text-8xl font-semibold">Track your expenses in the best possible <span className="text-[#53d37a]">way!</span></h1>
          <p className="text-lg text-[#868686]">ExpenseTracker is an application designed to help track your expenses and give you monthly insights.</p>
          <Link href="/signup"><Button_arrows text="Get Started"/></Link>
        </div>

        <div className="w-[40%] min-h-[90dvh] relative">
          <Image src="/banner.png" fill={true} style={{objectFit:"contain"}} alt="Expenses related banner image"/>
        </div>
      </section>

      <div className="w-[100%] my-5 border border-t border-[#454444]"></div>

      <section id="userguide" className="w-[90%] h-fit flex flex-col items-center py-12">
        <h1 className="text-[#00FF87] text-5xl font-semibold glowGreen">How to Use</h1>
        <h2 className="text-[#868686] text-md">Learn how to use ExpenseTracker in some simple steps</h2>
        <div className="my-8 w-full h-[25rem] flex justify-around items-center">
          <div className="card w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/hrjifpbq.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FF87] w-full text-center text-2xl font-semibold">Create an account</h1>
            <p className="text-white w-full text-center text-md">Click on Get Started to Sign Up on this website by creating a Username and Password.</p>
          </div>

          <div>
            <lord-icon
              src="https://cdn.lordicon.com/panzukyj.json"
              trigger="loop"
              state="loop-slide"
              colors="primary:#121331,secondary:#e83a30"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
          </div>

          <div className="card w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/nfgmqqvs.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FF87] w-full text-center text-2xl font-semibold">Login to your account</h1>
            <p className="text-white w-full text-center text-md">Now log into your account using these credentials.</p>
          </div>

          <div>
            <lord-icon
              src="https://cdn.lordicon.com/panzukyj.json"
              trigger="loop"
              state="loop-slide"
              colors="primary:#121331,secondary:#e83a30"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
          </div>

          <div className="card w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FF87] w-full text-center text-2xl font-semibold">Add your expenses</h1>
            <p className="text-white w-full text-center text-md">As soon as you login, you see the add expenses page. Use it to save your expenses.</p>
          </div>

          <div>
            <lord-icon
              src="https://cdn.lordicon.com/panzukyj.json"
              trigger="loop"
              state="loop-slide"
              colors="primary:#121331,secondary:#e83a30"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
          </div>

          <div className="card w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/hwxmpvjm.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FF87] w-full text-center text-2xl font-semibold">Manage & Track your expenses</h1>
            <p className="text-white w-full text-center text-md">Use Manage page to Edit or Delete your Expenses and Tracking page to visualize the monthly data using donut charts.</p>
          </div>
        </div>
      </section>

      <div className="w-[100%] my-5 border border-t border-[#454444]"></div>

      <section id="features" className="w-[90%] h-fit flex flex-col items-center py-12">
        <h1 className="text-[#00FFFF] text-5xl font-semibold glowBlue">Features</h1>
        <h2 className="text-[#868686] text-md">Some amazing features that you get on ExpenseTracker</h2>
        <div className="my-8 w-full h-[25rem] flex justify-around items-center">
          <div className="card2 w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/jyjslctx.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FFFF] w-full text-center text-2xl font-semibold">Where did you spent</h1>
            <p className="text-white w-full text-center text-md">Get insights using interactive donut charts to see your category wise spending.</p>
          </div>

          <div className="card2 w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/qhkvfxpn.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FFFF] w-full text-center text-2xl font-semibold">Highest & Lowest Expenses</h1>
            <p className="text-white w-full text-center text-md">Get to know your top 5 and least 5 expenditures till date.</p>
          </div>

          <div className="card2 w-[20%] h-full flex flex-col justify-center items-center rounded-2xl p-5 bg-[#2C2C2C] hover:bg-[#3a3a3a] transition-all duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/xfyxpoer.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"6rem","height":"6rem"}}>
            </lord-icon>
            <h1 className="text-[#00FFFF] w-full text-center text-2xl font-semibold">User Friendly</h1>
            <p className="text-white w-full text-center text-md">Interactive, fast & responsive graphics to feel light on the user.</p>
          </div>
        </div>
      </section>

      <div className="w-screen h-[0.2rem] bg-gradient-to-r from-[#4FC1E9] to-[#08f774]"></div>

      <footer className="w-[100%] h-[15dvh] bg-black flex justify-center items-center">
        <div className="h-[100%] w-[20%] flex justify-center items-center">
          <lord-icon
            src="https://cdn.lordicon.com/xnvwuhmw.json"
            trigger="hover"
            style={{"width":"4rem","height":"4rem"}}>
          </lord-icon>
          <h1 className="text-white text-2xl font-semibold">Expense</h1>
          <h1 className="text-[#00FF87] text-2xl font-semibold">Tracker</h1>
        </div>
        <div className="h-[100%] w-[60%] flex justify-end items-center gap-12">
          <h1 className="text-white text-xl">Innovated with&nbsp; 
            <lord-icon
              src="https://cdn.lordicon.com/altuciqs.json"
              trigger="hover"
              style={{"width":"1.5em","height":"1.5em"}}>
            </lord-icon> 
          &nbsp;by:</h1>

          <div className="flex flex-col justify-center items-center text-white text-md">
            <lord-icon
              src="https://cdn.lordicon.com/dqjzhzlv.json"
              trigger="hover"
              style={{"width":"3.5em","height":"3.5em"}}>
            </lord-icon>
            <h2 className="text-center font-bold">Atharv Mehrotra</h2>
            <h3 className="text-sm text-center">Frontend</h3>
          </div>
          <div className="flex flex-col justify-center items-center text-white text-md">
            <lord-icon
              src="https://cdn.lordicon.com/vhzkzfed.json"
              trigger="hover"
              style={{"width":"3.5em","height":"3.5em"}}>
            </lord-icon>
            <h2 className="text-center font-bold">Guru Divyansh</h2>
            <h3 className="text-sm text-center">Backend</h3>
          </div>
          <div className="flex flex-col justify-center items-center text-white text-md">
            <lord-icon
              src="https://cdn.lordicon.com/vhzkzfed.json"
              trigger="hover"
              style={{"width":"3.5em","height":"3.5em"}}>
            </lord-icon>
            <h2 className="text-center font-bold">Hari Om</h2>
            <h3 className="text-sm text-center">Backend</h3>
          </div>
          <div className="flex flex-col justify-center items-center text-white text-md">
            <lord-icon
              src="https://cdn.lordicon.com/vhzkzfed.json"
              trigger="hover"
              style={{"width":"3.5em","height":"3.5em"}}>
            </lord-icon>
            <h2 className="text-center font-bold">Vishu</h2>
            <h3 className="text-sm text-center">Backend</h3>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
