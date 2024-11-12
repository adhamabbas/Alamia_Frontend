import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import TaxNavigation from "../Components/TaxNavigation";
import EditTaxModel from "../Components/EditTaxModel";

const TaxItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
    if (location.pathname.split("/")[1] === "client-tax") {
      setType("client-tax");
    } else {
      setType("supplier-tax");
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "client-tax") {
        const response = await getData(`clint_Tax/${id}`, localStorage.getItem("token"));
        setData({ client: response.data.clint, employee: response.data.user.name, amount: response.data.amount, taxPercentage: response.data.taxRate, taxAmount: response.data.taxAmount, discountPercentage: response.data.discountRate, discountAmount: response.data.discountAmount, total: response.data.netAmount, systemDate: response.data.updatedAt, notes: response.data.Notes, companyName: response.data.company_name, billNumber: response.data.bell_num, date: response.data.entryDate });
        setLoading(false);
      } else if (type === "supplier-tax") {
        const response = await getData(`supplayr_Tax/${id}`, localStorage.getItem("token"));
        setData({ client: response.data.supplayr, employee: response.data.user.name, amount: response.data.amount, taxPercentage: response.data.taxRate, taxAmount: response.data.taxAmount, discountPercentage: response.data.discountRate, discountAmount: response.data.discountAmount, total: response.data.netAmount, systemDate: response.data.updatedAt, notes: response.data.Notes, companyName: response.data.Company_name, billNumber: response.data.Bell_num, date: response.data.entryDate });
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

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
      {loading && <Loading />}
      {!loading && (
        <div dir="rtl" className="xl:w-[70%] 2xl:w-[50%] xl:mx-auto bg-white p-6 rounded-xl font-medium text-lg">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">
              {type === "client-tax" ? "العميل" : "المورد"} : {type === "client-tax" ? data.client.clint_name : data.client.supplayr_name}
            </p>
            <p className="basis-1/3">اسم الشركة : {data.companyName}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">المبلغ : {data.amount} ج م</p>
            <p className="basis-1/3">عدد مرات الخصم : {type === "client-tax" ? data.client.disCount : data.client.dis_count}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">نسبة الضريبة : {data.taxPercentage} %</p>
            <p className="basis-1/3">قيمة الضريبة : {Math.round(data.taxAmount)} ج م</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">نسبة الخصم : {data.discountPercentage ? `${data.discountPercentage} %` : "لا يوجد"}</p>
            <p className="basis-1/3">قيمة الخصم : {Math.round(data.discountAmount)} ج م</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">الاجمالي : {Math.round(data.total)} ج م</p>
            <p className="basis-1/3">التاريخ : {data.date.split("T")[0]}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-3">
            <p className="basis-1/3">رقم الفاتورة : {data.billNumber}</p>
            <p className="basis-1/3">الموظف : {data.employee}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 justify-between mb-6">
            <p className="basis-1/3">ملاحظات : {data.notes}</p>
            <p className="basis-1/3">تاريخ النظام : {data.systemDate.split("T")[0]}</p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row-reverse justify-start gap-3">
              <EditTaxModel data={data} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaxItem;
