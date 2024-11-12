import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { postData } from "../Services/apiCalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bg from "/assets/onBoardingBG.png";
import logo from "/assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const { setUserData } = useAppContext();
  const navigate = useNavigate();

  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const handleClick = async () => {
    if (!email || !password) {
      toast.error("برجاء ادخال البريد الالكتروني وكلمة المرور");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("برجاء ادخال بريد الكتروني صحيح");
      return;
    }
    toast.info("جاري تسجيل الدخول");
    const response = await postData("auth/login", { email, password });
    if (response.token) {
      toast.success("تم تسجيل الدخول بنجاح");
      localStorage.setItem("token", response.token);
      setUserData({
        loggedIn: true,
        name: response.data.name,
        email: response.data.email,
        id: response.data._id,
        role: response.data.role,
      });
      navigate("/");
    } else {
      toast.error("خطأ في البريد الالكتروني او كلمة المرور");
    }
  };

  return (
    <main className="w-screen h-screen bg-center bg-cover flex justify-center items-center" style={{ backgroundImage: `url("${bg}")` }}>
      <section className="flex flex-col justify-center items-center gap-4">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-[#F3F3F3] text-[#168E75] px-6 py-3 rounded-l-lg text-lg">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="text-lg py-3 rounded-r-lg outline-none sm:w-[250px] lg:w-[300px] px-2 focus:placeholder:opacity-0 placeholder:duration-200" type="text" placeholder="Email" />
          </div>
          <div className="flex items-center mb-16 relative">
            <div className="bg-[#F3F3F3] text-[#168E75] px-6 py-3 rounded-l-lg text-lg">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="text-lg py-3 rounded-r-lg outline-none sm:w-[250px] lg:w-[300px] px-2 focus:placeholder:opacity-0 placeholder:duration-200" type={hidden ? "password" : "text"} placeholder="Password" />
            <button onClick={() => setHidden(!hidden)} className="absolute right-4 top-[50%] translate-y-[-50%] text-lg">
              <i className={`fa-solid ${hidden ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={handleClick} className="text-white outline-none hover:text-lightGreen hover:text-greenColor hover:bg-white duration-200 text-medium text-lg border-[3px] border-white py-2 px-12 rounded-lg">
              Sign In
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
