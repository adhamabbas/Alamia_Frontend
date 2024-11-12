import { useState } from "react";
import { putData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";
import Select from "react-select";

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

const options = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager"},
  { value: "storage_employee", label: "Storage Employee"},
  { value: "bill_employee", label: "Bills Employee"},
];

const EditEmployeeModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");

  const handleEdit = async () => {
    if (role === "") {
      return toast.error("يجب اختيار الصلاحية");
    }
    toast.info("جاري تعديل الصلاحية");
    const response = await putData(`users/${user._id}`, { role }, localStorage.getItem("token"));
    if (response.data) {
      toast.success("تم تعديل الصلاحية بنجاح");
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="hover:text-lightGreen duration-200 outline-none">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 sm:p-12 rounded-xl w-[300px] sm:w-[450px] md:w-[550px]">
            <div className={`flex items-center justify-end mb-6`}>
              <button onClick={() => setOpen(false)}>
                <i className="fa-solid fa-x text-2xl text-[#a3aab5] hover:text-black duration-300 cursor-pointer"></i>
              </button>
            </div>
            <h3 className="text-right text-lg font-medium mb-2">الاسم: {user.name}</h3>
            <h3 dir="rtl" className="text-right text-lg font-medium mb-2 capitalize">
              الصلاحية: {user.role}
            </h3>
            <h3 dir="rtl" className="text-right text-lg font-medium mb-8">
              الايميل: {user.email}
            </h3>
            <div className="flex justify-center mb-10">
              <Select className="w-[250px]" onChange={(e) => setRole(e.value)} styles={customStyles} options={options} placeholder="الصلاحية" />
            </div>
            <div className="flex justify-center">
              <button onClick={handleEdit} className="bg-navyColor hover:bg-[#234863] duration-200 text-white py-2 px-8 text-lg font-medium rounded-lg">
                حفظ
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditEmployeeModal;
