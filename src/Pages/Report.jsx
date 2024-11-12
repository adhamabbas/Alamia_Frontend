import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const { userData } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      if (userData.role == "manager" || userData.role == "bill_employee") {
        return toast.error("غير مسموح لك بالبحث");
      }
      const response = await getData(`report`, localStorage.getItem("token"));
      // console.log(response);
      if (response.data) {
        setLoading(false);
        setResult(response.data);
      }
    };
    fetchReport();
  }, []);

  // const handleSearch = async () => {
  //   if (userData.role !== "admin") {
  //     return toast.error("غير مسموح لك بالبحث");
  //   }
  //   // if (!startDate || !endDate) {
  //   //   return toast.error("الرجاء ادخال تاريخ البداية والنهاية");
  //   // }
  //   setLoading(true);
  //   const response = await getData(`report?startDate=${startDate}&endDate=${endDate}`, localStorage.getItem("token"));
  //   if (response.data) {
  //     setResult(response.data);
  //     setLoading(false);
  //   }
  // };

  return (
    <section className="minHeight grow pb-6 pt-[70px] px-4">
      <div className="flex flex-col sm:flex-row-reverse justify-center items-center gap-4 md:gap-8 pt-[50px] mb-12">
        {/* <input onChange={(e) => setStartDate(e.target.value)} className="bg-[#bcbaba] text-white outline-none p-2 lg:w-[250px]" type="date" />
        <span className="text-lg text-navyColor font-medium">الى</span>
        <input onChange={(e) => setEndDate(e.target.value)} className="bg-[#bcbaba] text-white outline-none p-2 lg:w-[250px]" type="date" />
        <button onClick={handleSearch} className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl size-[40px] flex justify-center items-center rounded-lg">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button> */}
      </div>
      {loading && <Loading />}
      {!loading && result && (
        <>
          <div dir="rtl" className="xl:w-[100%] 2xl:w-[70%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg mb-8">
            <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
              <p className="basis-1/3">اجمالي المبيع : {Number(result.totalSales.toFixed(2)).toLocaleString()} ج م</p>
              <p className="basis-1/3">متبقي على العملاء : {Number(result.totalDueFromClients.toFixed(2)).toLocaleString()} ج م</p>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
              <p className="basis-1/3">اجمالي شراء : {Number(result.totalPurchases.toFixed(2)).toLocaleString()} ج م</p>
              <p className="basis-1/3">تم سداد : {Number(result.totalDueFromClients.toFixed(2)).toLocaleString()} ج م</p>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
              <p className="basis-1/3">اجمالي مخزون مالي : {Number(result.totalWightMoney.toFixed(2)).toLocaleString()} ج م</p>
              <p className="basis-1/3"> هامش الربح : {Number(result.totalPurchases.toFixed(2)).toLocaleString()} ج م</p>
            </div>
          </div>
          <h3 className="text-right text-2xl font-bold xl:w-[100%] 2xl:w-[70%] xl:mx-auto mb-6">مبيعات شهرية</h3>
          <div dir="rtl" className="xl:w-[100%] 2xl:w-[70%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg mb-8">
            {result.monthlySales.length > 0 ? (
              <>
                <h5 className="text-center text-2xl mb-6">شهر {result.monthlySales[0]._id}</h5>
                <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
                  <p className="basis-1/3">اجمالي مالي : {result.monthlySales[0].totalAmount.toFixed(2)} ج م</p>
                  <p className="basis-1/3">اجمالي وزن : {result.monthlySales[0].totalWeight.toFixed(2)} كجم</p>
                </div>
              </>
            ) : (
              <p className="text-center text-2xl">لا يوجد مبيعات شهرية</p>
            )}
          </div>
          <h3 className="text-right text-2xl font-bold xl:w-[100%] 2xl:w-[70%] xl:mx-auto mb-6">مشتريات شهرية</h3>
          <div dir="rtl" className="xl:w-[100%] 2xl:w-[70%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg mb-8">
            {/* <h5 className="text-center text-2xl mb-6">شهر {result.monthlySales[0]._id}</h5> */}
            {result.monthlyPurchases.length > 0 ? (
              <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-0 justify-between mb-3">
                <p className="basis-1/3">اجمالي مالي : {result.monthlyPurchases[0].totalAmount.toFixed(2)} ج م</p>
                <p className="basis-1/3">اجمالي وزن : {result.monthlyPurchases[0].totalWeight.toFixed(2)} كجم</p>
              </div>
            ) : (
              <p className="text-center text-2xl">لا يوجد مشتريات شهرية</p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Report;
