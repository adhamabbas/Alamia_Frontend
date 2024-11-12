import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const StockNavigation = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("" || location.pathname.split("/")[0]);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
      <Link to="/incoming-stock/add" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "incoming-stock" ? "bg-goldColor" : "bg-lightGreen"}`}>
        مشتريات
      </Link>
      <Link to="/outgoing-stock/add" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "outgoing-stock" ? "bg-goldColor" : "bg-lightGreen"}`}>
        مبيعات
      </Link>
      <Link to="/stock/view" className={` hover:bg-goldColor duration-200 text-white py-3 text-lg font-medium w-[150px] md:w-[200px] rounded-lg text-center ${currentPage === "stock" ? "bg-goldColor" : "bg-lightGreen"}`}>
        مخزن
      </Link>
    </div>
  );
};

export default StockNavigation;
