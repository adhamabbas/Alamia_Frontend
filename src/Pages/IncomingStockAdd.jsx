import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { getData, postData } from "../Services/apiCalls";

import Select from "react-select";

import StockNavigation from "../Components/StockNavigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#bcbaba",
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

const customStyles2 = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    padding: "4px 8px",
    borderRadius: "12px",
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

const IncomingStockAdd = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [productData, setProductData] = useState({});
  const [code, setCode] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [pay, setPay] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("incoming-stock" || location.pathname.split("/")[0]);
  const { userData } = useAppContext();

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location, currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getData("products", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.type };
        });
        setProductsList(temp);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getData("Supplayrs", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.supplayr_name };
        });
        setSuppliers(temp);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await getData(`products/${selectedProduct}`, localStorage.getItem("token")); 
      if (response) {
        setProductData(response.data);
      }
    };
    fetchProductData();
  }, [selectedProduct]);

  useEffect(() => {
    if (weight && price) {
      setTotalPrice(weight * price);
    } else {
      setTotalPrice("");
    }
  }, [weight, price]);

  const handleAdd = async () => {
    if (userData.role === "bill_employee" || userData.role === "manager") {
      toast.error("لا يمكنك القيام بهذه العملية");
      return;
    }
    if (!selectedProduct || !code || !weight || !size || !price || !selectedSupplier || !totalPrice || !pay) {
      toast.error("برجاء ملئ جميع الحقول");
      return;
    }
    const data = {user: userData.id, supplayr: selectedSupplier, size, E_wieght: weight, product: selectedProduct, product_code: code, price_Kilo: price, price_all: totalPrice, pay, Notes: notes, Entry_date: date};
    if(date === ""){
      delete data.Entry_date
    }
    toast.info("جاري اضافة البيانات");
    const response = await postData("buys", data, localStorage.getItem("token"));
    if (response.data) {
      toast.success("تمت الاضافة بنجاح");
      setCode("");
      setWeight("");
      setSize("");
      setPrice("");
      setTotalPrice("");
      setPay("");
      setSelectedProduct("");
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
      <div className="flex justify-center mb-8">
        <Select onChange={(e) => setSelectedProduct(e.value)} className="w-[250px]" styles={customStyles} options={productsList} placeholder="اسم المنتج" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={weight} onChange={(e) => setWeight(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="وزن" />
        <input value={code} onChange={(e) => setCode(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="كود" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="السعر ك" />
        <input value={size} onChange={(e) => setSize(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="المقاس" />
      </div>
      <div className="flex flex-col items-center sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={totalPrice} readOnly className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="number" placeholder="السعر الاجمالي" />
        <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" styles={customStyles2} options={suppliers} placeholder="اسم المورد" />
      </div>
      <div className="flex flex-col items-start sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <input value={date} onChange={(e) => setDate(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="date" />
        <input value={pay} onChange={(e) => setPay(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" type="text" placeholder="تم دفع" />
      </div>
      <div className="flex flex-col items-start sm:flex-row justify-center gap-6 sm:gap-8 xl:gap-16 mb-6 lg:mb-10">
        <textarea onChange={(e) => setNotes(e.target.value)} className="resize-none border text-right outline-none py-2 px-1 rounded-xl h-[150px] w-[90%] sm:w-[40%] xl:w-[30%] 2xl:w-[25%]" placeholder="ملاحظات"></textarea>
      </div>
      <div className="flex flex-col justify-center items-center mb-6 lg:mb-10">
        <p dir="rtl" className=" text-[#8b8989] text-xl mb-4">
          متوسط السعر: <span className="text-black">{productData?.avg_price}</span>
        </p>
        <p dir="rtl" className=" text-[#8b8989] text-xl mb-4">
          مخزون مالي: <span className="text-black">{productData?.wight_money}</span>
        </p>
        <p dir="rtl" className=" text-[#8b8989] text-xl">
          اجمالي المخزون: <span className="text-black">{productData?.wieght}</span>
        </p>
      </div>
      <div className="flex justify-center">
        <button onClick={handleAdd} className="flex flex-row-reverse items-center justify-center gap-2 bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl py-3 px-8 rounded-lg">
          اضافة <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </section>
  );
};

export default IncomingStockAdd;
