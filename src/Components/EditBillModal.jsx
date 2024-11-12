import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation, useParams } from "react-router-dom";
import { putData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBillModal = ({ data }) => {
  const { userData } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [payed, setPayed] = useState(data?.payed);
  const [paymentType, setPaymentType] = useState(data?.paymentMethod);
  const [checkNumber, setCheckNumber] = useState(data?.checkNumber);
  const [checkDate, setCheckDate] = useState(data?.checkDate);
  const [bankName, setBankName] = useState(data?.bankName);
  const [type, setType] = useState("");

  const handleOpenModal = () => {
    if (userData.role !== "admin") {
      return toast.error("غير مسموح لك بالتعديل");
    }
    setOpen(true);
  };

  useEffect(() => {
    if (location.pathname.split("/")[1] === "receive-bill") {
      setType("receive-bill");
    } else {
      setType("pay-bill");
    }
  }, [location]);

  const handleEdit = async () => {
    if (type === "receive-bill") {
      const data = { payBell: payed, paymentMethod: paymentType, checkNumber, checkDate, bankName };
      if (setPaymentType === "cash") {
        delete data.checkNumber;
        delete data.checkDate;
        delete data.bankName;
      }
      const response = await putData(`sell_bell/${id}`, data, localStorage.getItem("token"));
      console.log(response);
      if (response.data) {
        toast.success("تم التعديل بنجاح");
        window.location.reload();
      }
    } else if (type === "pay-bill") {
      const data = { pay_bell: payed, payment_method: paymentType, check_number: checkNumber, check_date: checkDate, bank_name: bankName };
      if (setPaymentType === "cash") {
        delete data.check_number;
        delete data.check_date;
        delete data.bank_name;
      }
      const response = await putData(`buy_bell/${id}`, data, localStorage.getItem("token"));
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
          <div className="bg-white p-4 sm:p-12 rounded-xl w-[300px] sm:w-[450px] md:w-[550px]">
            <div className={`flex items-center justify-end mb-4`}>
              <button onClick={() => setOpen(false)}>
                <i className="fa-solid fa-x text-2xl text-[#a3aab5] hover:text-black duration-300 cursor-pointer"></i>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-right mb-6">
              <label className="font-medium text-lg" htmlFor="weight">
                المبلغ المدفوع
              </label>
              <input value={payed} onChange={(e) => setPayed(e.target.value)} className="bg-greyColor p-2 outline-none rounded-lg text-lg w-full text-right" type="number" id="payed" />
            </div>
            <div className="flex justify-center gap-6 mb-8">
              <div className="flex gap-2 items-center">
                <label htmlFor="cash" className="text-lg text-[#054A3D] font-medium">
                  كاش
                </label>
                <input defaultChecked={paymentType === "cash"} onChange={(e) => setPaymentType("cash")} type="radio" name="paymentType" id="cash" />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="check" className="text-lg text-[#054A3D] font-medium">
                  شيك
                </label>
                <input defaultChecked={paymentType === "check"} onChange={(e) => setPaymentType("check")} type="radio" name="paymentType" id="check" />
              </div>
            </div>
            {paymentType === "check" && (
              <>
                <div className="flex justify-center mb-8">
                  <input value={bankName} onChange={(e) => setBankName(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[60%]" type="text" placeholder="اسم البنك" />
                </div>
                <div className="flex justify-center mb-8">
                  <input value={checkNumber} onChange={(e) => setCheckNumber(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[60%]" type="number" placeholder="رقم الشيك" />
                </div>
                <div className="flex justify-center mb-8">
                  <input value={checkDate} onChange={(e) => setCheckDate(e.target.value)} className="border text-right outline-none py-2 px-1 rounded-xl w-[90%] sm:w-[60%]" type="date" placeholder="تاريخ الشيك" />
                </div>
              </>
            )}
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

export default EditBillModal;
