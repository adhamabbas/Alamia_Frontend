import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, useParams } from "react-router-dom";
import { putData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTaxModel = ({ data }) => {
  const { userData } = useAppContext();
  const [open, setOpen] = useState(false);
  const [billNumber, setBillNumber] = useState(data?.billNumber);
  const [taxPercentage, setTaxPercentage] = useState(data?.taxPercentage);
  const [discountPercentage, setDiscountPercentage] = useState(data?.discountPercentage);
  const [amount, setAmount] = useState(data?.amount);
  const [notes, setNotes] = useState(data?.notes);
  const [type, setType] = useState("");
  const { id } = useParams();
  const location = useLocation();

  const handleOpenModal = () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالتعديل");
    }
    setOpen(true);
  };

  useEffect(() => {
    if (location.pathname.split("/")[1] === "client-tax") {
      setType("client-tax");
    } else {
      setType("supplier-tax");
    }
  }, [location]);

  const handleEdit = async () => {
    // const response = await putData(`taxes/${data._id}`, { billNumber, taxPercentage, discountPercentage, amount }, localStorage.getItem("token"));
    // console.log(response);
    // if (response.data) {
    //   toast.success("تم التعديل بنجاح");
    //   window.location.reload();
    // }
    if (type === "client-tax") {
      const response = await putData(`clint_Tax/${id}`, { bell_num: billNumber, taxRate: taxPercentage, discountRate: discountPercentage, amount, Notes: notes }, localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        toast.success("تم التعديل بنجاح");
        window.location.reload();
      }
    } else {
      const response = await putData(`supplayr_Tax/${id}`, { Bell_num: billNumber, taxRate: taxPercentage, discountRate: discountPercentage, amount, Notes: notes }, localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        toast.success("تم التعديل بنجاح");
        window.location.reload();
      }
    }
  };

  return (
    <>
      <button onClick={handleOpenModal} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 rounded-xl">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-4 sm:p-8 rounded-xl w-[300px] sm:w-[450px] md:w-[550px]">
            <div className={`flex items-center justify-end mb-4`}>
              <button onClick={() => setOpen(false)}>
                <i className="fa-solid fa-x text-2xl text-[#a3aab5] hover:text-black duration-300 cursor-pointer"></i>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-right mb-4">
              <label className="font-medium text-lg">رقم الفاتورة</label>
              <input value={billNumber} onChange={(e) => setBillNumber(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-4">
              <label className="font-medium text-lg">نسبة الضريبة</label>
              <input value={taxPercentage} onChange={(e) => setTaxPercentage(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-4">
              <label className="font-medium text-lg">نسبة الخصم</label>
              <input value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-4">
              <label className="font-medium text-lg">المبلغ</label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" />
            </div>
            <div className="flex flex-col gap-3 text-right mb-4">
              <label className="font-medium text-lg">ملاحظات</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right resize-none"></textarea>
            </div>
            <div className="flex justify-center">
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

export default EditTaxModel;
