import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getData, deleteData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import EditStockModal from "../Components/EditStockModal";
import StockNavigation from "../Components/StockNavigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IncomingStockItem = () => {
  const { userData } = useAppContext();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await getData(`buys/${id}`, localStorage.getItem("token"));
      if (response.data) {
        setItem(response.data);
        setLoading(false);
      }
    };
    fetchItem();
  }, []);

  const handleDelete = async () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالحذف");
    }
    const response = await deleteData(`buys/${id}`, localStorage.getItem("token"));
    console.log(response);
    
    if (response === "") {
      toast.success("تم الحذف بنجاح");
      navigate("/incoming-stock/report");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <StockNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to="/incoming-stock/add" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to="/incoming-stock/report" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && (
        <div dir="rtl" className="xl:w-[70%] 2xl:w-[50%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">المورد : {item.supplayr?.supplayr_name}</p>
            <p className="basis-1/3">الموظف : {item.user.name}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">النوع : {item.product.type}</p>
            <p className="basis-1/3">التاريخ : {item.Entry_date.split("T")[0]}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">الوزن : {item.E_wieght}ك</p>
            <p className="basis-1/3">سعر الكيلو : {item.price_Kilo} ج م</p>
            {/* <p className="basis-1/3">مدفوع : {item.pay.toFixed(2)} ج م</p> */}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">قيمة البكرة : {(item.price_all).toFixed(2)} ج م</p>
            <p className="basis-1/3">المقاس : {item.size}</p>
            {/* <p className="basis-1/3">باقي : {(item.price_all - item.pay).toFixed(2)} ج م</p> */}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-between mb-6">
            <p className="basis-1/3">ملاحظات : {item.Notes ? item.Notes : "لا يوجد"}</p>
            <p className="basis-1/3">تاريخ النظام : {item.createdAt.split("T")[0]}</p>
          </div>
          <div className="flex flex-col sm:flex-row-reverse justify-start gap-3">
            <button onClick={handleDelete} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
              مسح
            </button>
            <EditStockModal item={item} />
          </div>
        </div>
      )}
    </section>
  );
};

export default IncomingStockItem;
