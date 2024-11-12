import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const BillsNavigation = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("" || location.pathname.split("/")[0]);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
      <Link to="/receive-bill/add" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "receive-bill" ? "bg-goldColor" : "bg-lightGreen"}`}>
         استلام
      </Link>
      <Link to="/pay-bill/add" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "pay-bill" ? "bg-goldColor" : "bg-lightGreen"}`}>
         دفع
      </Link>
    </div>
  )
}

export default BillsNavigation