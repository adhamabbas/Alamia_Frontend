import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getData, deleteData, postData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import EditOutgoingModel from "../Components/EditOutgoingModel";
import StockNavigation from "../Components/StockNavigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OutgoingStockItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { userData } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await getData(`sells/${id}`, localStorage.getItem("token"));
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
    const response = await deleteData(`sells/${id}`, localStorage.getItem("token"));
    if (response === "") {
      toast.success("تم الحذف بنجاح");
      navigate("/outgoing-stock/report");
    }
  };

  const handleReturn = async () => {
    if (userData.role == "manager" || userData.role == "bill_employee") {
      return toast.error("غير مسموح لك بالحذف");
    }
    const response = await postData(`return`, { user: userData.id, sell: item._id, o_wieght: item.o_wieght, size_o: item.size_o, product_code: item.product_code, priceForKilo: item.priceForKilo, price_allQuantity: item.price_allQuantity, refund_amount: item.pay_now, clint: item.clint._id, product: item.product._id }, localStorage.getItem("token"));
    if (response.data) {
      toast.success("تم الارجاع بنجاح");
      navigate("/outgoing-stock/report");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <StockNavigation />
      <div className="flex justify-center gap-8 mb-6">
        <Link to="/outgoing-stock/add" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          اضافة
        </Link>
        <Link to="/outgoing-stock/report" className={`text-lg font-medium text-darkGreen hover:text-white duration-200`}>
          تقرير
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && (
        <div dir="rtl" className="xl:w-[70%] 2xl:w-[50%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">المورد : {item.clint.clint_name}</p>
            <p className="basis-1/3">الموظف : {item.user.name}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">النوع : {item.product?.type}</p>
            <p className="basis-1/3">التاريخ : {item.entry_date.split("T")[0]}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">الوزن : {item.o_wieght}ك</p>
            <p className="basis-1/3">مدفوع : {item.pay_now.toFixed(2)} ج م</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">سعر الكيلو : {item.priceForKilo} ج م</p>
            <p className="basis-1/3">المقاس : {item.size_o}</p>
            {/* <p className="basis-1/3">باقي : {(item.price_allQuantity - item.pay_now).toFixed(2)} ج م</p> */}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">نسبة الضريبة : {item.taxRate}%</p>
            <p className="basis-1/3">قيمة الضريبة : {item.taxAmount.toFixed(2)} ج م</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">نسبة الخصم : {item.discountRate}%</p>
            <p className="basis-1/3">رقم الفاتورة : {item.code_out}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">قيمة البكرة : {item.price_allQuantity.toFixed(2)} ج م</p>
            <p className="basis-1/3">القيمة النهائية : {item.allForall.toFixed(2)} ج م</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-between mb-6">
            <p className="basis-1/3">ملاحظات: {item.Notes ? item.Notes : "لا يوجد"}</p>
            <p className="basis-1/3">تاريخ النظام : {item.createdAt.split("T")[0]}</p>
          </div>
          <div className="flex flex-col sm:flex-row-reverse justify-start gap-3">
            <button onClick={handleDelete} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
              مسح
            </button>
            <button onClick={handleReturn} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
              مرتد
            </button>
            <EditOutgoingModel item={item} />
          </div>
        </div>
      )}
    </section>
  );
};

export default OutgoingStockItem;
