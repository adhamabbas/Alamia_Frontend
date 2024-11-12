import logo from "/assets/logo.png"

const Loading = () => {
  return (
    <section className="grow py-6 flex flex-col gap-8 justify-center items-center opacity-pulse">
      <img src={logo} alt="logo" className="size-[400px]" />
      <h3 className="text-2xl font-semibold text-lightGreen">...جاري التحميل</h3>
    </section>
  )
}

export default Loading