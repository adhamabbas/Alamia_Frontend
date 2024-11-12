import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Services/apiCalls";

import Select from "react-select";

import Loading from "../Components/Loading";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#bcbaba",
    padding: "4px 8px",
    outline: "none",
    textAlign: "right",
    color: "#fff",
    margin: "0 auto",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    textAlign: "right",
    color: "black",
  }),
};

const Suppliers = () => {
  const { userData } = useAppContext();
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState("");
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.role !== "admin") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

  const handleClick = () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالاضافة");
    } else {
      navigate("/add-supplier");
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getData("Supplayrs", localStorage.getItem("token"));
      if (response.data) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.supplayr_name };
        });
        setSuppliers(temp);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedSupplier !== "" && authorized) {
      setHidden(false);
      setLoading(true);
      const fetchClientData = async () => {
        const response = await getData(`supplayrs/${selectedSupplier}/details`, localStorage.getItem("token"));
        // console.log(response);
        
        if (response) {
          setSupplierData(response);
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [selectedSupplier]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <button onClick={handleClick} to="/add-supplier" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          اضافة مورد
        </button>
        <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[250px]" styles={customStyles} options={suppliers} placeholder="اسم المورد" />
      </div>
      <div className="flex justify-center gap-4 mb-8 md:mb-24">
        <a href={`https://alamia-1vfdgf2n.b4a.run/api/v1/buy_bell/export/scheck`} target="_blank" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          شيكات
        </a>
        <a href={`https://alalamya.onrender.com/api/v1/supplayrs/${selectedSupplier}/exportToExcel`} target="_blank" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          كشف حساب
        </a>
      </div>
      {loading && !hidden && <Loading />}
      {!loading && supplierData === "" && <h2 className="text-2xl text-center">No Records Found</h2>}
      {!loading && supplierData !== "" && (
        <>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-8">
            <h3 className="text-lightGreen text-2xl font-medium">مشتريات</h3>
            {supplierData.buys.length !== 0 &&
              supplierData.buys.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p>النوع: {item.product.type}</p>
                  <p>الوزن: {item.E_wieght} ك</p>
                  <p>المقاس: {item.size}</p>
                  <p>التاريخ: {item.updatedAt.split("T")[0]}</p>
                  <p>سعر الاجمالي: {item.price_all.toFixed(2)} ج م</p>
                </div>
              ))}
            {supplierData.buys.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-8">
            <h3 className="text-lightGreen text-2xl font-medium">فواتير</h3>
            {supplierData.bell.length !== 0 &&
              supplierData.bell.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p className="text-right text-lg">المدفوع: {item.pay_bell.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">طريقة الدفع: {item.payment_method}</p>
                  <p className="text-right text-lg">التاريخ: {item.updatedAt.split("T")[0]}</p>
                </div>
              ))}
            {supplierData.bell.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-12">
            <h3 className="text-lightGreen text-2xl font-medium">عمليات ضريبية</h3>
            {supplierData.tax.length !== 0 &&
              supplierData.tax.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p className="text-right text-lg">عدد مرات الخصم: {item.supplayr.dis_count}</p>
                  <p className="text-right text-lg">نسبة الضريبة: {item.taxRate}</p>
                  <p className="text-right text-lg">نسبة الخصم: {item.discountRate ? item.discountRate : "لا يوجد"}</p>
                  <p className="text-right text-lg">المبلغ: {item.amount.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">قيمة الضريبة: {item.taxAmount.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">قيمة الخصم: {item.discountAmount.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">الاجمالي: {item.netAmount.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">ملاحظات: {item.Notes === "" ? "لايوجد" : item.Notes}</p>
                  <p className="text-right text-lg">التاريخ: {item.updatedAt.split("T")[0]}</p>
                </div>
              ))}
            {supplierData.tax.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-12 xl:gap-24 xl:w-[70%] xl:mx-auto">
            {supplierData.buys.length !== 0 && (
              <div dir="rtl" className="flex flex-col gap-3 justify-start text-xl font-medium">
                <p>مدفوع : {supplierData.buys[0].supplayr.price_pay.toFixed(2)} ج م</p>
                <p>باقي : {supplierData.buys[0].supplayr.price_on.toFixed(2)} ج م</p>
                <p>اجمالي المبلغ : {(supplierData.buys[0].supplayr.price_pay + supplierData.buys[0].supplayr.price_on).toFixed(2)} ج م</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Suppliers;
