import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { getData, deleteData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import TaxNavigation from "../Components/TaxNavigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaxReport = () => {
  const { userData } = useAppContext();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [date, setDate] = useState("");
  const [authorized, setAuthorized] = useState(true);
  const [tempList, setTempList] = useState([]);
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");

  useEffect(() => {
    if (userData.role === "storage_employee" || userData.role === "bill_employee") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    const fetchList = async () => {
      if (currentPage === "client-tax" && authorized) {
        const response = await getData(`clint_Tax`, localStorage.getItem("token"));
        console.log(response);
        setList(response.data);
        setTempList(response.data);
        setLoading(false);
      } else if (currentPage === "supplier-tax" && authorized) {
        const response = await getData(`supplayr_Tax`, localStorage.getItem("token"));
        console.log(response);
        setList(response.data);
        setTempList(response.data);
        setLoading(false);
      }
    };
    fetchList();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (userData.role !== "admin") return toast.error("غير مسموح لك بالحذف");
    if (currentPage === "client-tax") {
      const response = await deleteData(`clint_Tax/${id}`, localStorage.getItem("token"));
      if (response === "") {
        window.location.reload();
      }
    } else if (currentPage === "supplier-tax") {
      const response = await deleteData(`supplayr_Tax/${id}`, localStorage.getItem("token"));
      if (response === "") {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (currentPage === "client-tax") {
      if (query2) {
        const temp = tempList.filter((item) => {
          return item.bell_num == query2;
        });
        setList(temp);
      } else {
        setList(tempList);
      }
    } else {
      if (query2) {
        const temp = tempList.filter((item) => {
          return item.Bell_num == query2;
        });
        setList(temp);
      } else {
        setList(tempList);
      }
    }
  }, [query2]);

  useEffect(() => {
    if (currentPage === "client-tax") {
      if (query) {
        const temp = tempList.filter((item) => {
          return item.clint.clint_name.includes(query);
        });
        setList(temp);
      } else {
        setList(tempList);
      }
    } else {
      if (query) {
        const temp = tempList.filter((item) => {
          return item.supplayr.supplayr_name.includes(query);
        });
        setList(temp);
      } else {
        setList(tempList);
      }
    }
  }, [query]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <TaxNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to={currentPage === "client-tax" ? "/client-tax/add" : "/supplier-tax/add"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to={currentPage === "client-tax" ? "/client-tax/report" : "/supplier-tax/report"} className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      <div className="flex justify-center gap-8 mb-6">
        <input onChange={(e) => setQuery2(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[80%] md:w-[50%] xl:w-[35%]" type="text" placeholder="رقم الفاتورة" />
        <input onChange={(e) => setQuery(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[80%] md:w-[50%] xl:w-[35%]" type="text" placeholder="الاسم" />
      </div>
      {loading && <Loading />}
      {!loading && list.length === 0 && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && authorized && (
        <div className="xl:w-[60%] xl:mx-auto">
          {list.map((item, index) => (
            <div dir="rtl" key={index} className="mb-6 bg-white p-4 rounded-lg font-medium text-lg flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-right text-lg">
                  {currentPage === "client-tax" ? "العميل" : "المورد"}: {currentPage === "client-tax" ? item.clint?.clint_name : item.supplayr.supplayr_name}
                </p>
                <p className="text-right text-lg">التاريخ: {item.entryDate?.split("T")[0]}</p>
                <p className="text-right text-lg">عدد مرات الخصم: {currentPage === "client-tax" ? item.clint?.disCount : item.supplayr.dis_count}</p>
                <p className="text-right text-lg">نسبة الضريبة: {item.taxRate}</p>
                <p className="text-right text-lg">نسبة الخصم: {item.discountRate ? item.discountRate : "لا يوجد"}</p>
                <p className="text-right text-lg">المبلغ: {item.amount}</p>
                <p className="text-right text-lg">قيمة الضريبة: {item.taxAmount.toFixed(2)}</p>
                <p className="text-right text-lg">قيمة الخصم: {item.discountAmount.toFixed(2)}</p>
                <p className="text-right text-lg">الاجمالي: {item.netAmount.toFixed(2)}</p>
                {/* <p className="text-right text-lg">ملاحظات: {item.Notes === "" ? "لا يوجد" : item.Notes}</p> */}
                <p className="text-right text-lg">الموظف: {item.user.name}</p>
                <div className="flex justify-center sm:justify-end">
                  <Link to={`/${currentPage === "client-tax" ? "client-tax" : "supplier-tax"}/${item._id}`} className="text-[#01D1ED] font-semibold text-lg">
                    عرض
                  </Link>
                </div>
              </div>
              <div>
                <button onClick={() => handleDelete(item._id)} className="text-xl hover:text-red-500 duration-200">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TaxReport;
