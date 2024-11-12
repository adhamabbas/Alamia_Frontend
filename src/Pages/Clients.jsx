import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

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

const Clients = () => {
  const { userData } = useAppContext();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientData, setClientData] = useState("");
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.role !== "admin") {
      setLoading(false);
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getData("clints", localStorage.getItem("token"));
      if (response.data) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.clint_name };
        });
        setClients(temp);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClient !== "" && authorized) {
      setHidden(false);
      setLoading(true);
      const fetchClientData = async () => {
        const response = await getData(`clints/${selectedClient}/details`, localStorage.getItem("token"));
        if (response) {
          setClientData(response);
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [selectedClient]);

  const handleClick = () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالاضافة");
    } else {
      navigate("/add-client");
    }
  };

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <button onClick={handleClick} to="/add-client" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          اضافة عميل
        </button>
        <Select onChange={(e) => setSelectedClient(e.value)} className="w-[250px]" styles={customStyles} options={clients} placeholder="اسم العميل" />
      </div>
      <div className="flex justify-center gap-4 mb-8 md:mb-24">
        <a href={`https://alamia-1vfdgf2n.b4a.run/api/v1/sell_bell/checks`} target="_blank" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          شيكات
        </a>
        <a href={`https://alalamya.onrender.com/api/v1/clints/${selectedClient}/details/export`} target="_blank" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          كشف حساب
        </a>
      </div>
      {loading && !hidden && <Loading />}
      {!loading && clientData === "" && <h2 className="text-2xl text-center">No Records Found</h2>}
      {!loading && clientData !== "" && (
        <>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-8">
            <h3 className="text-lightGreen text-2xl font-medium">بكر مباع</h3>
            {clientData.sela.length !== 0 &&
              clientData.sela.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p>النوع: {item.product.type}</p>
                  <p>الوزن: {item.o_wieght} ك</p>
                  <p>المقاس: {item.size_o}</p>
                  <p>التاريخ: {item.updatedAt.split("T")[0]}</p>
                  <p>سعر الاجمالي: {item.price_allQuantity.toFixed(2)} ج م</p>
                </div>
              ))}
            {clientData.sela.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-8">
            <h3 className="text-lightGreen text-2xl font-medium">فواتير</h3>
            {clientData.bell.length !== 0 &&
              clientData.bell.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p className="text-right text-lg">المدفوع: {item.payBell.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">طريقة الدفع: {item.paymentMethod}</p>
                  <p className="text-right text-lg">التاريخ: {item.updatedAt.split("T")[0]}</p>
                </div>
              ))}
            {clientData.bell.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-8">
            <h3 className="text-lightGreen text-2xl font-medium">شيكات مرتدة</h3>
            {clientData.chBack.length !== 0 &&
              clientData.chBack.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p className="text-right text-lg">مبلغ الشيك: {item.amount.toFixed(2)} ج م</p>
                  <p className="text-right text-lg">اسم العميل : {item.clint.clint_name}</p>
                  <p className="text-right text-lg">رقم الشيك : {item.num}</p>
                  <p className="text-right text-lg">تاريخ الشيك : {item.date.split("T")[0]}</p>
                </div>
              ))}
            {clientData.chBack.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div dir="rtl" className="xl:w-[70%] xl:mx-auto flex flex-col gap-6 mb-8 md:mb-12">
            <h3 className="text-lightGreen text-2xl font-medium">عمليات ضريبية</h3>
            {clientData.tax.length !== 0 &&
              clientData.tax.map((item, index) => (
                <div dir="rtl" key={index} className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg font-medium text-lg">
                  <p className="text-right text-lg">عدد مرات الخصم: {item.clint.disCount}</p>
                  <p className="text-right text-lg">نسبة الضريبة: {item.taxRate}</p>
                  <p className="text-right text-lg">نسبة الخصم: {item.discountRate ? item.discountRate : "لا يوجد"}</p>
                  <p className="text-right text-lg">المبلغ: {item.amount}</p>
                  <p className="text-right text-lg">قيمة الضريبة: {item.taxAmount.toFixed(2)}</p>
                  <p className="text-right text-lg">قيمة الخصم: {item.discountAmount.toFixed(2)}</p>
                  <p className="text-right text-lg">الاجمالي: {item.netAmount.toFixed(2)}</p>
                  <p className="text-right text-lg">ملاحظات: {item.Notes === "" ? "لايوجد" : item.Notes}</p>
                  <p className="text-right text-lg">التاريخ: {item.updatedAt.split("T")[0]}</p>
                </div>
              ))}
            {clientData.tax.length === 0 && <p className="text-center text-2xl font-medium">لا يوجد بيانات</p>}
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-12 xl:gap-24 xl:w-[70%] xl:mx-auto">
            {clientData.sela.length !== 0 && (
              <div dir="rtl" className="flex flex-col gap-3 justify-start text-xl font-medium">
                <p>مدفوع : {clientData.sela[0].clint.money_pay.toFixed(2)} ج م</p>
                <p>باقي : {clientData.sela[0].clint.money_on.toFixed(2)} ج م</p>
                <p>اجمالي المبلغ : {(clientData.sela[0].clint.money_on + clientData.sela[0].clint.money_pay).toFixed(2)} ج م</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Clients;
