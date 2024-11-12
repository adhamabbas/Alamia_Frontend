import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MobileSideMenu from "./MobileSideMenu";

import avatar from "/assets/avatar.png";

const linksList = [
  {
    title: "ادارة المخزون",
    url: ["/incoming-stock/add", "/incoming-stock/report", "/outgoing-stock/add", "/outgoing-stock/report", "/stock/view"],
  },
  {
    title: "تحصيلات",
    url: ["/receive-bill/add", "/receive-bill/report", "/pay-bill/add", "/pay-bill/report"],
  },
  {
    title: "فواتير ضريبية",
    url: ["/client-tax/add", "/supplier-tax/add", "/client-tax/report", "/supplier-tax/report"],
  },
  {
    title: "عملاء",
    url: ["/clients", "/add-client"],
  },
  {
    title: "موردين",
    url: ["/suppliers", "/add-supplier"],
  },
  {
    title: "اضافة موظف",
    url: ["/add-employee"],
  },
  {
    title: "صلاحيات",
    url: ["/permissions"],
  },
  {
    title: "تقرير",
    url: ["/report"],
  },
];

const SideMenu = () => {
  const { userData, setUserData } = useAppContext();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = () => {
    setUserData({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <aside className="h-screen sticky overflow-scroll no-scrollbar top-0 left-0 hidden lg:flex flex-col min-w-[280px]">
        <div className="bg-darkGreen px-16 py-6 rounded-tr-xl ">
          <div className="mb-4 flex justify-center">
            <img className="size-[80px] rounded-full " src={avatar} alt="" />
          </div>
          <h5 className="text-white text-xl text-center font-medium">{userData.name}</h5>
          <h5 className="text-white text-xl text-center font-medium capitalize">{userData.role}</h5>
        </div>
        <div className="grow bg-navyColor flex flex-col justify-between rounded-br-xl">
          <ul className="  rounded-br-xl pt-8 flex flex-col gap-4">
            {linksList.map((link, index) => (
              <Link to={link.url[0]} key={index} className={link.url.includes(activeLink) ? "py-2 px-8 bg-greyColor text-navyColor text-center font-medium rounded-2xl w-[80%] mx-auto text-lg" : "py-2 px-8 hover:bg-greyColor text-goldColor text-lg hover:text-navyColor text-center font-medium rounded-2xl w-[80%] mx-auto"}>
                <li>{link.title}</li>
              </Link>
            ))}
          </ul>
          <div className="text-center py-9">
            <button onClick={handleLogout} className="border-2 border-white px-6 py-2 text-white hover:text-navyColor hover:bg-white duration-200 rounded-lg text-lg font-medium">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>
      <MobileSideMenu />
    </>
  );
};

export default SideMenu;
