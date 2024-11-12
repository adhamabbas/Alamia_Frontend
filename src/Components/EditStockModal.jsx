import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { putData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStockModal = ({ item }) => {
  const { userData } = useAppContext();
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState(item?.E_wieght);
  const [payed, setPayed] = useState(item?.pay);
  const [price, setPrice] = useState(item?.price_all);
  const [size, setSize] = useState(item?.size);

  const handleOpenModal = () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالتعديل");
    }
    setOpen(true);
  };

  const handleEdit = async () => {
    const response = await putData(`buys/${item._id}`, {size, E_wieght: weight, price_all: price, pay: payed}, localStorage.getItem("token"));
    console.log(response);
    if (response.data){
      toast.success("تم التعديل بنجاح");
      window.location.reload();
    }
  };

  return (
    <>
      <button onClick={handleOpenModal} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-4 sm:p-12 rounded-xl w-[300px] sm:w-[450px] md:w-[550px]">
            <div className={`flex items-center justify-end mb-4`}>
              <button onClick={() => setOpen(false)}>
                <i className="fa-solid fa-x text-2xl text-[#a3aab5] hover:text-black duration-300 cursor-pointer"></i>
              </button>
            </div>
            <div dir="rtl" className="flex flex-col md:flex-row gap-4 md:gap-6 md:justify-between mb-2 md:mb-6">
              <div className="flex flex-col gap-3 md:basis-1/2">
                <label className="font-medium text-lg" htmlFor="weight">
                  الوزن
                </label>
                <input className="bg-greyColor p-2 outline-none rounded-lg text-lg" type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 md:basis-1/2">
                <label className="font-medium text-lg" htmlFor="payed">
                  مدفوع
                </label>
                <input className="bg-greyColor p-2 outline-none rounded-lg text-lg" type="number" id="payed" value={payed} onChange={(e) => setPayed(e.target.value)} />
              </div>
            </div>
            <div dir="rtl" className="flex flex-col md:flex-row gap-4 md:gap-6 md:justify-between mb-2 md:mb-6">
              <div className="flex flex-col gap-4 md:basis-1/2">
                <label className="font-medium text-lg" htmlFor="price">
                  السعر
                </label>
                <input className="bg-greyColor p-2 outline-none rounded-lg text-lg" type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="flex flex-col gap-4 md:basis-1/2">
                <label className="font-medium text-lg" htmlFor="debt">
                  باقي
                </label>
                <input className="bg-greyColor p-2 outline-none rounded-lg text-lg" type="number" id="debt" value={price - payed} readOnly />
              </div>
            </div>
            <div dir="rtl" className="flex flex-col md:flex-row gap-4 md:gap-6 md:justify-between mb-4 md:mb-6">
              <div className="flex flex-col gap-4 md:basis-1/2">
                <label className="font-medium text-lg" htmlFor="size">
                  المقاس
                </label>
                <input className="bg-greyColor p-2 outline-none rounded-lg text-lg" type="number" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
              </div>
            </div>
            <div>
              <button onClick={handleEdit} className="bg-navyColor hover:bg-[#234863] duration-200 text-white text-xl py-3 px-8 rounded-lg">
                حفظ
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditStockModal;
