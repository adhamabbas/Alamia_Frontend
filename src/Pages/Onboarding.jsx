import { Link } from "react-router-dom"

import bg from "/assets/onBoardingBG.png"
import logo from "/assets/logo.png"

const Onboarding = () => {
  return (
    <main className="w-screen h-screen bg-center bg-cover flex justify-center items-center" style={{backgroundImage: `url("${bg}")`}}>
      <section className="flex flex-col justify-center items-center gap-8">
        <div>
          <img src={logo} alt="" />
        </div>
        <Link to="/login" className="text-white hover:text-lightGreen hover:text-greenColor hover:bg-white duration-200 text-medium text-lg border-[3px] border-white py-2 px-12 rounded-lg">Start</Link>
      </section>
    </main>
  )
}

export default Onboarding