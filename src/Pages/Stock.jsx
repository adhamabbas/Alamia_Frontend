import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Services/apiCalls";

import Select from "react-select";

import Loading from "../Components/Loading";
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

const Stock = () => {
  const [products, setProducts] = useState([{ value: "", label: "" }]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [size, setSize] = useState("");
  const [list, setList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [query, setQuery] = useState("");
  const { userData } = useAppContext();

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
    const fetchProducts = async () => {
      const response = await getData("products", localStorage.getItem("token"));
      if (response) {
        let temp = response.data.map((item) => {
          return { value: item._id, label: item.type };
        });
        setProducts((prev) => [...prev, ...temp]);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    if (userData.role === "bill_employee" || userData.role === "manager") {
      return toast.error("لا تملك الصلاحية للقيام بهذه العملية");
    }
    setLoading(true);
    const response = await getData(`warehous?${selectedProduct != "" ? `product=${selectedProduct}` : ""}${size != "" ? `&size=${size}` : ""}${selectedSupplier != "" ? `&supplayr=${selectedSupplier}` : ""}`, localStorage.getItem("token"));
    if (response) {
      setList(response.data);
      setTempList(response.data);
      setLoading(false);
      setHidden(false);
    }
  };

  useEffect(() => {
    if (query) {
      const temp = tempList.filter((item) => {
        return item.product_code.toString().includes(query);
      });
      setList(temp);
    } else {
      setList(tempList);
    }
  }, [query, tempList]);

  return (
    <section className="grow pb-6 pt-[70px] px-4 minHeight">
      <StockNavigation />
      <div className="flex flex-col-reverse xl:flex-row items-center gap-4 justify-center mb-16">
        <button onClick={handleSearch} className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl size-[40px] flex justify-center items-center rounded-lg">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input onChange={(e) => setSize(e.target.value)} type="text" className="w-[250px] bg-[#bcbaba] p-2 outline-none text-right rounded" placeholder="المقاس" />
        <Select onChange={(e) => setSelectedSupplier(e.value)} className="w-[250px]" styles={customStyles} options={suppliers} placeholder="اسم المورد" />
        <Select onChange={(e) => setSelectedProduct(e.value)} className="w-[250px]" styles={customStyles} options={products} placeholder="اسم المنتج" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6 xl:w-[50%] xl:mx-auto">
        <a href={`https://alamia-1vfdgf2n.b4a.run/api/v1/warehous/export/size`} target="_blank" to="/add-client" className=" items-center justify-center bg-navyColor hover:bg-[#234863] duration-200 text-white text-lg py-2 px-6 rounded-lg">
          طباعة
        </a>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6 xl:w-[50%] xl:mx-auto">
        <p className="text-right text-lg font-medium">عدد البكر : {list.length}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6 xl:w-[50%] xl:mx-auto">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[80%]" type="text" placeholder="رقم البكرة" />
      </div>
      {loading && <Loading />}
      {!loading && !hidden && list.length === 0 && <p className="text-center mt-16 text-2xl font-semibold">لا يوجد بيانات</p>}
      {!loading && list.length > 0 && (
        <div className="xl:w-[50%] xl:mx-auto">
          {list.map((item, index) => (
            <div key={index} dir="rtl" className="flex items-center justify-between bg-white p-4 mb-6  rounded-lg font-medium text-lg ">
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-right text-lg">المورد: {item.supplayr?.supplayr_name}</p>
                <p className="text-right text-lg">النوع: {item.product?.type}</p>
                <p className="text-right text-lg">الكود: {item.product_code}</p>
                <p className="text-right text-lg">الوزن: {item.weight}</p>
                <p className="text-right text-lg">المقاس: {item.size}</p>
                <p className="text-right text-lg">التاريخ: {item.createdAt.split("T")[0]}</p>
              </div>
              {/* <div>
                <button className="text-xl hover:text-red-600 duration-200">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Stock;
