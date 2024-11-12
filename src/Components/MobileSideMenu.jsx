import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Drawer from "@mui/material/SwipeableDrawer";

import avatar from "/assets/avatar.png";

const linksList = [
  {
    title: "ادارة المخزون",
    url: ["/incoming-stock/add", "/incoming-stock/report", "/outgoing-stock/add", "/outgoing-stock/report", "/stock/view"],
  },
  {
    title: "فواتير",
    url: ["/receive-bill/add", "/receive-bill/report", "/pay-bill/add", "/pay-bill/report"],
  },
  {
    title: "ضريبة",
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

const MobileSideMenu = () => {
  const { userData, setUserData } = useAppContext();
  const [open, setOpen] = useState(false);
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

  const toggleMenu = (openStatus) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(openStatus);
  };

  return (
    <aside className="lg:hidden">
      <button className="absolute top-4 left-4 text-xl outline-none p-4 text-lightGreen" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <Drawer anchor="left" open={open} onClose={toggleMenu(false)} onOpen={toggleMenu(true)}>
        <div className="w-screen h-full overflow-scroll no-scrollbar md:max-w-screen-sm flex flex-col bg-navyColor relative">
          <button className="w-fit ml-auto text-xl hover:text-red-500 duration-200 text-white absolute right-6 top-4" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-x"></i>
          </button>
          <div className="flex flex-col items-center justify-center bg-darkGreen py-8 mb-6">
            <div className="mb-4 flex justify-center">
              <img className="size-[80px] rounded-full " src={avatar} alt="" />
            </div>
            <h5 className="text-white text-xl text-center font-medium">{userData.name}</h5>
            <h5 className="text-white text-xl text-center font-medium capitalize">{userData.role}</h5>
          </div>
          <div className="grow bg-navyColor flex flex-col justify-between">
            <ul className="  rounded-br-xl pt-8 flex flex-col gap-4">
              {linksList.map((link, index) => (
                <Link to={link.url[0]} key={index} onClick={() => setOpen(false)} className={link.url.includes(activeLink) ? "py-2 px-8 bg-greyColor text-navyColor text-center text-xl font-medium rounded-2xl w-[80%] mx-auto" : "py-2 px-8 hover:bg-greyColor text-goldColor hover:text-navyColor text-center font-medium rounded-2xl w-[80%] mx-auto text-xl"}>
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
        </div>
      </Drawer>
    </aside>
  );
};

export default MobileSideMenu;
