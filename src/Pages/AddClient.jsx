import { useEffect, useState } from "react";
import { postData } from "../Services/apiCalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/addEmployeeBG.png";
import logo from "/assets/addEmployeeLogo.png";

const AddClient = () => {
  const [name, setName] = useState("");
  const [paid, setPaid] = useState("");
  const [debt, setDebt] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (paid && debt) {
      setTotal(Number(paid) + Number(debt));
    } else {
      setTotal("");
    }
  }, [paid, debt]);

  const handleClick = async () => {
    if (!name || !paid || !debt) {
      return toast.error("الرجاء ملئ جميع الحقول");
    }
    toast.info("جاري تسجيل العميل");
    const response = await postData("clints", { clint_name: name, money_pay: paid, money_on: debt, total_monye: total }, localStorage.getItem("token"));
    if (response.data) {
      toast.success("تم تسجيل العميل بنجاح");
      setName("");
      setPaid("");
      setDebt("");
      setTotal("");
    }
  };

  return (
    <section className="grow py-6 px-4 flex items-center justify-center minHeight">
      <div className="bg-cover bg-center p-4 w-full xl:w-[70%] 2xl:w-[50%] flex flex-col items-center gap-4" style={{ backgroundImage: `url(${image})` }}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-users"></i>
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="text" placeholder="اسم العميل" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-sack-dollar"></i>
          </div>
          <input value={paid} onChange={(e) => setPaid(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="number" placeholder="الاموال المدفوعة" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-sack-xmark"></i>
          </div>
          <input value={debt} onChange={(e) => setDebt(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="number" placeholder="الاموال المتبقية" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-money-bill"></i>
          </div>
          <input value={total} readOnly className="grow px-2 outline-none text-lg text-right" type="number" placeholder="الاجمالي" />
        </div>
        <button onClick={handleClick} className="text-white outline-none hover:text-lightGreen hover:text-greenColor hover:bg-white duration-200 text-medium text-lg border-[3px] border-white py-2 px-12 rounded-lg">
          تسجيل
        </button>
      </div>
    </section>
  );
};

export default AddClient;
