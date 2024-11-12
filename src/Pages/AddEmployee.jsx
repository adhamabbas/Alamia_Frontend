import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { postData } from "../Services/apiCalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/addEmployeeBG.png";
import logo from "/assets/addEmployeeLogo.png";

import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    outline: "none",
    padding: "2px 8px",
    textAlign: "right",
    color: "#fff",
    borderRadius: "12px 0px 0px 12px",
    margin: "0 auto",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    textAlign: "right",
    color: "black",
  }),
};

const options = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "storage_employee", label: "Storage Employee" },
  { value: "bill_employee", label: "Bills Employee" },
];

const AddEmployee = () => {
  const { userData } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");

  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const handleClick = async () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالاضافة");
    }
    if (!name || !email || !password || !passwordConfirm || !role) {
      toast.error("برجاء ملئ جميع الحقول");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("برجاء ادخال بريد الكتروني صحيح");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }
    toast.info("جاري اضافة الموظف");
    const response = await postData("auth/signup", { name, email, password, passwordConfirm, role });
    if (response.token) {
      toast.success("تم اضافة الموظف بنجاح");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setRole("");
    } else {
      toast.error("حدث خطأ ما");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 flex items-center justify-center minHeight">
      <div className="bg-cover bg-center p-4 w-full xl:w-[70%] 2xl:w-[50%] flex flex-col items-center gap-4" style={{ backgroundImage: `url(${image})` }}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-users"></i>
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="text" placeholder="الاسم" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="text" placeholder="الايميل" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen rounded-r-xl">
            <i className="fa-solid fa-users"></i>
          </div>
          <Select className="w-full" styles={customStyles} onChange={(e) => setRole(e.value)} options={options} placeholder="الصلاحية" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-lock"></i>
          </div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="password" placeholder="كلمة المرور" />
        </div>
        <div className="flex flex-row-reverse w-full lg:w-[70%] 2xl:w-[60%] rounded-xl overflow-hidden mb-8">
          <div className="bg-[#f3f3f3] py-3 w-[30px] md:w-[50px] flex justify-center items-center text-lg text-lightGreen">
            <i className="fa-solid fa-lock"></i>
          </div>
          <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="grow px-2 outline-none text-lg text-right" type="password" placeholder="تأكيد كلمة المرور" />
        </div>
        <button onClick={handleClick} className="text-white outline-none hover:text-lightGreen hover:text-greenColor hover:bg-white duration-200 text-medium text-lg border-[3px] border-white py-2 px-12 rounded-lg">
          تسجيل
        </button>
      </div>
    </section>
  );
};

export default AddEmployee;
