import logo from "/assets/logo.png"

const HomePage = () => {
  return (
    <section className="grow py-6 flex flex-col gap-8 justify-center items-center h-screen">
      <img src={logo} alt="logo" className="size-[400px]" />
      <h3 className="text-2xl font-semibold text-lightGreen">اهلا بك في العالمية</h3>
    </section>
  )
}

export default HomePage