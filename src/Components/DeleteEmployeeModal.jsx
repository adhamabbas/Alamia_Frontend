import { useState } from "react";
import { deleteData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteEmployeeModal = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    toast.info("جاري مسح الحساب");
    const response = await deleteData(`users/${user._id}`, localStorage.getItem("token"));
    console.log(response);
    if(response === ""){
      toast.success("تم مسح الحساب بنجاح");
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="hover:text-red-500 duration-200 outline-none">
        <i className="fa-solid fa-trash"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 sm:p-12 rounded-xl w-[300px] sm:w-[450px] md:w-[550px]">
            <h3 className="text-center text-xl mb-8">هل انت متأكد انك تريد مسح حساب {user.name}</h3>
            <div className="flex justify-center items-center gap-6">
              <button onClick={handleDelete} className="text-white bg-red-500 py-2 px-6 text-lg font-medium">مسح</button>
              <button onClick={() => setOpen(false)} className="text-white bg-blue-500 py-2 px-6 text-lg font-medium">
                الغاء
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteEmployeeModal;
