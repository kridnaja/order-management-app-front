import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { getAccessToken } from "../utils/local-storage";

import { FiSearch } from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi2";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { MdPreview } from "react-icons/md";
import EvaLoading from "../component/EvaLoading";

import io from "socket.io-client";
import axios from "axios";
import EditOrderPrintPage from "./EditOrderPrintPage";
import DisplayDate from "../component/DisplayDate";
// import QueueMoreModal from "../adminComponent/QueueMoreModal";
import ReNewPrintPage from "./ReNewOrderPrintPage";
import PreviewOrderPrintPage from "./PreviewOrderPrintPage";
// const socket = io.connect("http://192.168.0.169:9999");
export default function SalesWorkPage() {
  const {
    //////
    logout,
    loading,
    reLoadFunction,
    selectSalesStatus,
    salesDeleteOrder,
    salesAddOrderInQueueAfterGotRejected,
    salesReviseOrderAndAddInQueue,
    salesConfirmOrder,
    salesHoldOrder,
    authUser,
    displayNewJobs,
    displayRejectedJobs,
    displayRevisedJobs,
    displayInQueueJobs,
    displayWaitToConfirmJobs,
    displayOnWorkingJobs,
    displayCompletedJobs,
    displayOnHoldingJobs,
    errorSalesReviseJob,
    ////
    langData,
  } = useAuth();
  ////
  const [selectStatus, setSelectStatus] = useState(
    selectSalesStatus ? selectSalesStatus : 1
  );
  const [selectOrderToEdit, setSelectOrderToEdit] = useState("");

  const [isOpenSelectOrderToEdit, setIsOpenSelectOrderToEdit] = useState(false);

  const [isOpenDeleteNewJob, setIsOpenDeleteNewJob] = useState(false);
  const [selectNewJobTODelete, setSelectNewJobToDelete] = useState("");

  const [selectAddRejectedJobInQueue, setSelectAddRejectedJobInQueue] =
    useState("");

  const [selectEditHoldingJob, setSelectEditHoldingJob] = useState("");
  const [selectHoldRevisedJob, setSelectHoldRevisedJob] = useState("");
  const [selectHoldInQueueJob, setSelectHoldInQueueJob] = useState("");
  const [selectInRevisedQueue, setSelectInRevisedQueue] = useState("");
  const [selectInQueue, setSelectInQueue] = useState("");
  const [selectWaitToConfirm, setSelectWaitToConfirm] = useState("");

  const [selectCompleted, setSelectCompleted] = useState("");
  const [selectToPreview, setSelectToPreview] = useState("");
  const [isOpenWaitToConfirm, setIsOpenWaitToConFirm] = useState(false);
  const [isOpenRevise, setIsOpenRevise] = useState(false);
  const [revisedInput, setRevisedInput] = useState({
    id: "",
    orderNumber: "",
    erpNumber: "",
    revisedRemark: "",
  });

  const [selectHoverRemark, setSelectHoverRemark] = useState("");

  if (!getAccessToken()) {
    window.location.href = "/";
  }
  // overview function ///
  const [allOrders, setAllOrders] = useState([]);
  const [inQueueOrders, setInQueueOrders] = useState([]);

  const [isOpenQueueModal, setIsOpenQueueModal] = useState(false);

  const [selectOrderInQueue, setSelectOrderInQueue] = useState("");
  const [salesLoading, setSalesLoading] = useState(false);

  const [isSales, setIsSales] = useState([]);

  const [isPrepress, setIsPrepress] = useState([]);

  const [displayWorkingStatus, setDisplayWorkingStatus] = useState([]);
  const [displayNewJobStatus, setDisplayNewJobStatus] = useState([]);

  const [isOpenReNewPrintPage, setIsOpenReNewPrintPage] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  useEffect(() => {
    axios.get("/admin/readAllOrders").then((res) => {
      setAllOrders(res.data);
    });

    axios.get("/admin/readAllSales").then((res) => {
      setIsSales(res.data);
    });
    axios
      .get("/admin/readInQueueOrders")
      .then((res) => setInQueueOrders(res.data));

    axios
      .get("/admin/readWorkingStatusOrders")
      .then((res) => setDisplayWorkingStatus(res.data));

    axios
      .get("/admin/readNewJobStatusOrders")
      .then((res) => setDisplayNewJobStatus(res.data));
    axios.get("/sales/readAllPrepress").then((res) => setIsPrepress(res.data));
  }, [loading]);
  // overview function ///
  const [previewData, setPreviewData] = useState("");
  useEffect(() => {
    axios
      .get(`/sales/readPreview?orderNumber=${selectToPreview.orderNumber}`)
      .then((res) => setPreviewData(res.data));
  }, [selectToPreview]);
  ///
  const handleLogout = () => {
    logout();
  };

  const handleDeleteNewJob = async () => {
    await salesDeleteOrder(selectNewJobTODelete);
  };

  const handleAddOrderInQueueAfterGotRejected = (data) => {
    salesAddOrderInQueueAfterGotRejected(data);
  };

  const handleOnchangeRevisedInput = (e) => {
    setRevisedInput({ ...revisedInput, [e.target.name]: e.target.value });
  };
  const handleReviseOrderAndAddInQueue = () => {
    selectWaitToConfirm.revisedRemark = revisedInput.revisedRemark;
    salesReviseOrderAndAddInQueue(selectWaitToConfirm);
  };
  const handleConfirmOrder = (data) => {
    salesConfirmOrder(data);
  };
  const handleHoldOrder = (data) => {
    salesHoldOrder(data);
  };

  const [readNoti, setReadNoti] = useState([]);
  const [isOpenNoti, setIsOpenNoti] = useState(false);

  ///Lang state
  const [changeLang, setChangeLang] = useState("EN");
  const [isOpenChangeLang, setIsOpenChangeLang] = useState(false);

  // const handleSelectNoti = (data) => {
  //   if (data.notiStatus == "Wait To ConFirm") {
  //     setSelectStatus(7);
  //     reLoadFunction(7);
  //     socket.emit("deleteOrderFromReadNoti", data);
  //   }
  //   if (data.notiStatus == "Rejected") {
  //     socket.emit("deleteOrderFromReadNoti", data);
  //     reLoadFunction(3);
  //     setSelectStatus(3);
  //   }
  //   if (
  //     data.notiStatus == "working" ||
  //     data.notiStatus == "Wait for checking again"
  //   ) {
  //     socket.emit("deleteOrderFromReadNoti", data);
  //     reLoadFunction(6);
  //     setSelectStatus(6);
  //   }
  //   if (data.notiStatus == "checking") {
  //     socket.emit("deleteOrderFromReadNoti", data);
  //     reLoadFunction(6);
  //     setSelectStatus(6);
  //   }
  //   if (data.notiStatus == "Rejected After Checked") {
  //     socket.emit("deleteOrderFromReadNoti", data);
  //     reLoadFunction(6);
  //     setSelectStatus(6);
  //   }
  // };

  // const handleReadAllNoti = () => {
  //   socket.emit("deleteAllOrderFromReadNoti", authUser);
  //   setReadNoti([]);
  //   setIsOpenNoti(false);
  // };

  // useEffect(() => {
  //   axios.get(`/sales/readNoti?userId=${authUser.id}`).then((res) => {
  //     setReadNoti(res.data);
  //   });
  // }, [isOpenNoti]);

  // useEffect(() => {
  //   socket.on(`render_noti${authUser.id}`, (data) => {
  //     if (data) {
  //       setReadNoti((readNoti) => [...readNoti, data.data]);
  //     }
  //   });

  //   socket.on(`renderReject_noti${authUser.id}`, (data) => {
  //     setReadNoti((readNoti) => [...readNoti, data.data]);
  //   });
  // }, [socket]);

  const sideBar = [
    {
      id: 1,
      title:
        changeLang === "EN"
          ? langData[38] && langData[38][0]
          : changeLang === "TH"
          ? langData[38] && langData[38][1]
          : langData[38] && langData[38][2],
    },
    {
      id: 2,
      title:
        changeLang === "EN"
          ? langData[38] && langData[39][0]
          : changeLang === "TH"
          ? langData[39] && langData[39][1]
          : langData[39] && langData[39][2],
    },
    {
      id: 3,
      title:
        changeLang === "EN"
          ? langData[38] && langData[40][0]
          : changeLang === "TH"
          ? langData[40] && langData[40][1]
          : langData[40] && langData[40][2],
    },
    {
      id: 4,
      title:
        changeLang === "EN"
          ? langData[38] && langData[41][0]
          : changeLang === "TH"
          ? langData[41] && langData[41][1]
          : langData[41] && langData[41][2],
    },
    {
      id: 5,
      title:
        changeLang === "EN"
          ? langData[38] && langData[42][0]
          : changeLang === "TH"
          ? langData[42] && langData[42][1]
          : langData[42] && langData[42][2],
    },
    {
      id: 6,
      title:
        changeLang === "EN"
          ? langData[38] && langData[43][0]
          : changeLang === "TH"
          ? langData[43] && langData[43][1]
          : langData[43] && langData[43][2],
    },
    {
      id: 7,
      title:
        changeLang === "EN"
          ? langData[38] && langData[44][0]
          : changeLang === "TH"
          ? langData[44] && langData[44][1]
          : langData[44] && langData[44][2],
    },
    {
      id: 8,
      title:
        changeLang === "EN"
          ? langData[38] && langData[45][0]
          : changeLang === "TH"
          ? langData[45] && langData[45][1]
          : langData[45] && langData[45][2],
    },
  ];
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const userLanguage = navigator.language || navigator.userLanguage;

  useEffect(() => {
    if (userLanguage === "en") {
      setChangeLang("EN");
    }
    if (userLanguage === "th") {
      setChangeLang("TH");
    }
    if (userLanguage === "cn") {
      setChangeLang("EN");
    }
  }, []);

  // useEffect(() => {
  //   socket.on("message", (msg) => {
  //     setReadNoti((readNoti) => [...readNoti, msg.id]);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   let call = () => {
  //     if (authUser) {
  //       setRoom(authUser.id);
  //       socket.emit("joinRoom", authUser.id);
  //     }
  //   };
  //   call();
  // }, [authUser]);

  return (
    <div className=" bg-gray-200">
      {isOpenSelectOrderToEdit && (
        <EditOrderPrintPage targetOrderIdToEdit={selectOrderToEdit.id} />
      )}
      {loading ? (
        <EvaLoading />
      ) : (
        <div className="h-screen w-screen flex flex-row justify-center items-center">
          <div className="bg-[#F1F1F1]  w-[15vw] h-screen flex flex-col justify-between absolute left-0">
            <div className="h-screen w-[15vw] absolute">
              <img
                src="src/assets/evanavbar.jpg"
                className="object-cover h-full w-full"
              />
            </div>

            <div className="w-full z-10">
              <div className="pb-[2rem] pt-[2rem]  flex flex-col items-center">
                <img
                  className="w-[6rem] h-[6rem] object-scale-down "
                  src={"src/assets/logo.svg"}
                />
              </div>
              <div className="w-full flex flex-col items-center">
                {sideBar.map((data) => (
                  <div
                    onClick={() => setSelectStatus(data.id)}
                    className={`cursor-pointer w-full h-[3rem] flex justify-between items-center hover:bg-gray-100 hover:bg-opacity-60
                      ${
                        selectStatus === data.id
                          ? "bg-white text-[#C8262D] font-bold"
                          : ""
                      }`}
                    key={data.id}
                  >
                    <div className="w-[80%] flex justify-center">
                      <div className="w-[70%]">{data.title}</div>
                    </div>

                    <div className="w-[20%]">
                      {displayNewJobs[0]?.status === "newJob" &&
                        data.id === 1 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayNewJobs.length}
                          </div>
                        )}

                      {displayOnHoldingJobs[0]?.status === "holding" &&
                        data.id === 2 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayOnHoldingJobs.length}
                          </div>
                        )}

                      {displayRejectedJobs[0]?.status === "rejected" &&
                        data.id === 3 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayRejectedJobs.length}
                          </div>
                        )}

                      {displayRevisedJobs[0]?.status === "revised" &&
                        data.id === 4 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayRevisedJobs.length}
                          </div>
                        )}

                      {displayInQueueJobs[0]?.status === "inQueue" &&
                        data.id === 5 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayInQueueJobs.length}
                          </div>
                        )}

                      {displayOnWorkingJobs[0]?.status && data.id === 6 && (
                        <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                          {displayOnWorkingJobs.length}
                        </div>
                      )}

                      {displayWaitToConfirmJobs[0]?.status ===
                        "waitToConfirm" &&
                        data.id === 7 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayWaitToConfirmJobs.length}
                          </div>
                        )}

                      {displayCompletedJobs[0]?.status && data.id === 8 && (
                        <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                          {displayCompletedJobs.length}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[3rem] z-10 bg-[#C8262D] flex justify-center items-center">
              <p className="text-white text-[0.8rem] font-semibold">
                Created by AD MEWorx.
              </p>
            </div>
          </div>

          <div className="w-[85vw] h-screen flex flex-col px-[1rem] bg-white right-0 absolute">
            <div className="w-full h-[6rem] flex justify-between z-10">
              <div className="h-full flex items-center gap-10">
                {authUser.email === "sc11@123eva.com" && (
                  <button
                    onClick={() => setSelectStatus(0)}
                    className={`${
                      selectStatus === 0
                        ? "bg-[#C8262D] text-white"
                        : "bg-white text-black border-2 border-black"
                    }  p-1 pr-2 pl-2 rounded-md`}
                  >
                    Sales Manager Overview
                  </button>
                )}
                {authUser.email === "sc56@123eva.com" && (
                  <button
                    onClick={() => setSelectStatus(0)}
                    className={`${
                      selectStatus === 0
                        ? "bg-[#C8262D] text-white"
                        : "bg-white text-black border-2 border-black"
                    }  p-1 pr-2 pl-2 rounded-md`}
                  >
                    Sales Manager Overview
                  </button>
                )}
                {authUser.email === "sc12@123eva.com" && (
                  <button
                    onClick={() => setSelectStatus(0)}
                    className={`${
                      selectStatus === 0
                        ? "bg-[#C8262D] text-white"
                        : "bg-white text-black border-2 border-black"
                    }  p-1 pr-2 pl-2 rounded-md`}
                  >
                    Sales Manager Overview
                  </button>
                )}

                <p className="text-[1.75rem] font-semibold">
                  Welcome back !! {authUser?.email}
                </p>
              </div>
              <div className=" h-full flex flex-row items-center">
                {/* <div className="px-[0.5rem] flex mx-[0.5rem]">
                  {readNoti.length ? (
                    <button
                      className="hover:text-[#C8262D]"
                      onClick={() => setIsOpenNoti(!isOpenNoti)}
                    >
                      <HiOutlineBell className="w-[2rem] h-[2rem] object-scale-down transform an" />
                      <div className="w-[20px] h-[20px] text-white rounded-full bg-red-500 p-[0.5rem] absolute translate-x-[16px] -translate-y-9 flex items-center justify-center text-[0.8rem] font-bold">
                        {readNoti.length && readNoti.length}
                      </div>
                    </button>
                  ) : (
                    <button>
                      <HiOutlineBell className="w-[1.75rem] h-[1.75rem] object-scale-down hover:text-[#C8262D]" />
                    </button>
                  )}

                  {isOpenNoti && (
                    <div className="absolute right-[0px] top-[86px] w-[24rem] border-[#C2C2C2] border-[0.1rem] bg-[#F5F5F5] flex flex-col  pl-[0.5rem] pt-[0.25rem] pb-[0.25rem] rounded-l-[0.75rem] ">
                      <div>
                        <button
                          onClick={handleReadAllNoti}
                          className="hover:bg-[#838383] hover:text-white px-[0.5rem] rounded-[0.25rem] text-[0.8rem]"
                        >
                          Read All
                        </button>
                      </div>
                      <div className="flex cursor-pointer flex-col max-h-[25rem] pr-[0.25rem] overflow-y-scroll rounded-[0.5rem] ">
                        {readNoti?.map((data, i) => {
                          return (
                            <div
                              onClick={() => {
                                setIsOpenNoti(false);

                                handleSelectNoti(data);
                              }}
                              key={i}
                              className="hover:bg-red-500 flex flex-col bg-[#C8262D] px-[0.75rem] pt-[0.25rem] pb-[0.75rem] rounded-[0.5rem] my-[0.25rem]"
                            >
                              <div className="w-full">
                                <div>
                                  <p className="text-white text-[1.25rem] font-semibold">
                                    {data?.notiOrderNumber}
                                  </p>
                                </div>
                                <div className="flex flex-row justify-between">
                                  <div className="w-[70%]">
                                    <li className="text-white">
                                      {data?.notiStatus}
                                    </li>
                                  </div>
                                  <div className="w-[50%]">
                                    <DisplayDate
                                      textColor={"text-white"}
                                      timestamp={data && data.timeStamp}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div> */}
                <div className="flex flex-col items-center justify-start h-[2rem]">
                  <div className="mx-[0.5rem] cursor-pointer text-[1.1rem]">
                    <div
                      onClick={() => setIsOpenChangeLang(!isOpenChangeLang)}
                      className="px-[0.5rem] py-[0.25rem] font-semibold hover:text-[#C8262D] "
                    >
                      {changeLang === "EN" && <div>EN</div>}
                      {changeLang === "TH" && <div>TH</div>}
                      {changeLang === "CN" && <div>CN</div>}
                    </div>
                  </div>
                  {isOpenChangeLang && (
                    <div className="bg-gray-200 p-1 border-2 border-black">
                      <div
                        className="text-[1rem] cursor-pointer hover:text-[#C8262D]"
                        onClick={() => {
                          setIsOpenChangeLang(!isOpenChangeLang);
                          setChangeLang("EN");
                        }}
                      >
                        EN
                      </div>
                      <div
                        className="text-[1rem] cursor-pointer hover:text-[#C8262D]"
                        onClick={() => {
                          setIsOpenChangeLang(!isOpenChangeLang);
                          setChangeLang("TH");
                        }}
                      >
                        TH
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setIsOpenChangeLang(!isOpenChangeLang);
                          setChangeLang("CN");
                        }}
                      >
                        CN
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex">
                  <button
                    className="flex h-[2rem] w-[6rem] p-[0.5rem] ml-[0.75rem] text-[1.1rem] justify-center items-center font-semibold hover:text-[#C8262D]"
                    onClick={handleLogout}
                  >
                    {" "}
                    {changeLang === "EN"
                      ? langData[83] && langData[83][0]
                      : changeLang === "TH"
                      ? langData[83] && langData[83][1]
                      : langData[83] && langData[83][2]}
                  </button>
                </div>
              </div>
            </div>

            <div>
              {selectStatus === 0 && (
                <div className="w-[100%] h-[80vh]  flex gap-[1rem]">
                  <div className="w-[50%] h-full flex flex-col justify-start">
                    <div className="w-[100%] flex flex-col items-center">
                      <div className="w-full h-[4rem] min-h-[4rem] flex">
                        <div className="h-full flex items-center">
                          <p className="text-[1rem] font-semibold">
                            All New Jobs Status : {displayNewJobStatus.length}
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-full flex flex-col items-end">
                        <div className="w-full h-[32vh] mb-[0.5rem] py-[1rem] bg-[#F1F1F1] flex flex-col rounded-[0.5rem]">
                          <div className="w-full h-full text-[0.7rem] pl-[1rem]  flex flex-col rounded-[0.5rem] pr-[0.25rem]">
                            <div className="h-[3rem] flex flex-row justify-between items-center mb-[0.5rem] pr-[1rem]">
                              <div className="w-[6%] py-[0.25rem] items-center text-center px-[0.5%]">
                                <p className="">#</p>
                              </div>
                              <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">Time</p>
                              </div>
                              <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Order NO.
                                </p>
                              </div>
                              <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  ERP NO.
                                </p>
                              </div>
                              <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Sales Owner
                                </p>
                              </div>

                              <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Prepress Owner
                                </p>
                              </div>
                              <div className="w-[14%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Status
                                </p>
                              </div>
                              <div className="w-[6%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black"></p>
                              </div>
                            </div>
                            <div className="overflow-y-scroll h-full pr-[0.25rem]">
                              {displayNewJobStatus.map((data, i) => {
                                return (
                                  <div className=" " key={i}>
                                    <div
                                      className={`h-[3rem]  text-[0.6rem] flex flex-row justify-between items-center mb-[0.5rem] rounded-[0.5rem]
                                      ${
                                        selectOrderInQueue.id === data.id
                                          ? "bg-[#C8262D] text-white"
                                          : "bg-white text-black"
                                      }`}
                                    >
                                      <div className="w-[6%]  px-[0.5%] py-[0.25rem] flex justify-center items-center text-center">
                                        <p className="font-semibold">{i + 1}</p>
                                      </div>
                                      <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                        <DisplayDate
                                          timestamp={data.createdAt}
                                        />
                                      </div>
                                      <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="">{data.orderNumber}</p>
                                      </div>
                                      <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="">{data.erpNumber}</p>
                                      </div>
                                      <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="truncate">
                                          {isSales.map((el) => {
                                            if (data.userId === el.id) {
                                              return el.nickName;
                                            }
                                          })}
                                        </p>
                                      </div>
                                      <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="truncate">
                                          {data.prepressOwner}
                                        </p>
                                      </div>
                                      <div className="w-[14%] flex justify-center text-center px-[0.5%]">
                                        <p className="truncate">
                                          {data.status}
                                        </p>
                                      </div>
                                      <div className=" w-[6%] h-full flex justify-center items-center text-center px-[0.5%]">
                                        <button
                                          onClick={() => {
                                            setSelectOrderInQueue(data);
                                            setIsOpenQueueModal(
                                              !isOpenQueueModal
                                            );
                                          }}
                                          className="px-[0.5rem] flex items-center justify-center"
                                        >
                                          <IoIosMore className="text-2xl cursor-pointer " />
                                        </button>
                                      </div>

                                      {selectOrderInQueue.id === data.id && (
                                        <QueueMoreModal
                                          isSales={isSales}
                                          setLoading={setSalesLoading}
                                          selectOrderInQueue={
                                            selectOrderInQueue
                                          }
                                          setSelectOrderInQueue={
                                            setSelectOrderInQueue
                                          }
                                          isOpen={isOpenQueueModal}
                                          setIsOpen={setIsOpenQueueModal}
                                        />
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] flex flex-col items-center">
                      <div className="w-full h-[4rem] min-h-[4rem] flex ">
                        <div className="h-full flex items-center">
                          <p className="text-[1rem] font-semibold">
                            All Jobs Prepress Are Working Right Now :{" "}
                            {displayWorkingStatus.length}
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-full flex flex-col items-end">
                        <div className="w-full h-[32vh] mb-[0.5rem] py-[1rem] bg-[#F1F1F1] flex flex-col rounded-[0.5rem]">
                          <div className="w-full text-[0.7rem] h-full pl-[1rem]  flex flex-col rounded-[0.5rem] pr-[0.25rem]">
                            <div className="h-[3rem] flex flex-row justify-between items-center mb-[0.5rem] pr-[1rem]">
                              <div className="w-[6%] py-[0.25rem] items-center text-center px-[0.5%]">
                                <p className="">#</p>
                              </div>
                              <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">Time</p>
                              </div>
                              <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Order NO.
                                </p>
                              </div>
                              <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  ERP NO.
                                </p>
                              </div>
                              <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Sales Owner
                                </p>
                              </div>

                              <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Prepress Owner
                                </p>
                              </div>
                              <div className="w-[14%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black font-semibold">
                                  Status
                                </p>
                              </div>
                              <div className="w-[6%] flex justify-center items-center text-center px-[0.5%]">
                                <p className="text-black"></p>
                              </div>
                            </div>
                            <div className="overflow-y-scroll h-full pr-[0.25rem]">
                              {displayWorkingStatus.map((data, i) => {
                                return (
                                  <div className=" " key={i}>
                                    <div
                                      className={`h-[3rem] text-[0.6rem]  flex flex-row justify-between items-center mb-[0.5rem] rounded-[0.5rem]
                                        ${
                                          selectOrderInQueue.id === data.id
                                            ? "bg-[#C8262D] text-white"
                                            : "bg-white text-black"
                                        }`}
                                    >
                                      <div className="w-[6%]  px-[0.5%] py-[0.25rem] flex justify-center items-center text-center">
                                        <p className="font-semibold">{i + 1}</p>
                                      </div>
                                      <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                        <DisplayDate
                                          timestamp={data.timeStamp}
                                        />
                                      </div>
                                      <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="">{data.orderNumber}</p>
                                      </div>
                                      <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="">{data.erpNumber}</p>
                                      </div>
                                      <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="truncate">
                                          {isSales.map((el) => {
                                            if (data.userId === el.id) {
                                              return el.nickName;
                                            }
                                          })}
                                        </p>
                                      </div>
                                      <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                        <p className="truncate">
                                          {isPrepress?.map((el) => {
                                            if (
                                              data.prepressOwner === el.email
                                            ) {
                                              return el.nickName;
                                            }
                                          })}
                                        </p>
                                      </div>
                                      <div className="w-[14%] flex justify-center text-center px-[0.5%]">
                                        <p className="truncate">
                                          {data.status}
                                        </p>
                                      </div>
                                      <div className=" w-[6%] h-full flex justify-center items-center text-center px-[0.5%]">
                                        <button
                                          onClick={() => {
                                            setSelectOrderInQueue(data);
                                            setIsOpenQueueModal(
                                              !isOpenQueueModal
                                            );
                                          }}
                                          className="px-[0.5rem] flex items-center justify-center"
                                        >
                                          <IoIosMore className="text-2xl cursor-pointer " />
                                        </button>
                                      </div>

                                      {selectOrderInQueue.id === data.id && (
                                        <QueueMoreModal
                                          isSales={isSales}
                                          setLoading={setSalesLoading}
                                          selectOrderInQueue={
                                            selectOrderInQueue
                                          }
                                          setSelectOrderInQueue={
                                            setSelectOrderInQueue
                                          }
                                          isOpen={isOpenQueueModal}
                                          setIsOpen={setIsOpenQueueModal}
                                        />
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[50%]  h-full flex flex-col">
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-[4rem] min-h-[4rem] flex justify-end pr-5">
                        <div className="h-full flex items-center">
                          <p className="text-[1rem] font-semibold">
                            All Jobs In Queue : {inQueueOrders.length}
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-full flex flex-col items-end">
                        <div className="w-full h-[70vh] mb-[0.5rem] py-[1rem] bg-[#F1F1F1] flex flex-col rounded-[0.5rem]">
                          <div className="w-full h-full pl-[1rem]  flex flex-col rounded-[0.5rem] pr-[0.25rem]">
                            <div className="h-[3rem] flex text-[0.9rem] flex-row justify-between items-center mb-[0.5rem] pr-[1rem]">
                              <div className="w-[6%] py-[0.25rem] items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="">#</p>
                              </div>
                              <div className="w-[12%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black font-semibold">Time</p>
                              </div>
                              <div className="w-[16%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black font-semibold">
                                  Order NO.
                                </p>
                              </div>
                              <div className="w-[16%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black font-semibold">
                                  ERP NO.
                                </p>
                              </div>
                              <div className="w-[15%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black font-semibold">
                                  Sales Owner
                                </p>
                              </div>

                              <div className="w-[15%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black font-semibold">
                                  Prepress Owner
                                </p>
                              </div>
                              <div className="w-[14%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black font-semibold">
                                  Status
                                </p>
                              </div>
                              <div className="w-[6%] flex justify-center items-center text-center px-[0.5%] text-[0.8rem]">
                                <p className="text-black"></p>
                              </div>
                            </div>
                            <div className="overflow-y-scroll h-full pr-[0.25rem]">
                              {inQueueOrders.map((ee, i) => {
                                let ad = allOrders.filter(
                                  (data) => data.id == ee.orderId
                                );
                                return (
                                  <div className=" " key={i}>
                                    {ad.map((data, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className={`h-[3rem] text-[0.7rem] flex flex-row justify-between items-center mb-[0.5rem] rounded-[0.5rem]
                                        ${
                                          selectOrderInQueue.id === data.id
                                            ? "bg-[#C8262D] text-white"
                                            : "bg-white text-black"
                                        }`}
                                        >
                                          <div className="w-[6%]  px-[0.5%] py-[0.25rem] flex justify-center items-center text-center">
                                            <p className="font-semibold">
                                              {i + 1}
                                            </p>
                                          </div>
                                          <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                            <DisplayDate
                                              timestamp={data.timeStamp}
                                            />
                                          </div>
                                          <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                            <p className="">
                                              {data.orderNumber}
                                            </p>
                                          </div>
                                          <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                            <p className="">{data.erpNumber}</p>
                                          </div>
                                          <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                            <p className="truncate">
                                              {isSales.map((el) => {
                                                if (data.userId === el.id) {
                                                  return el.nickName;
                                                }
                                              })}
                                            </p>
                                          </div>
                                          <div className="w-[15%] flex justify-center items-center text-center px-[0.5%]">
                                            <p className="truncate">
                                              {isPrepress?.map((el) => {
                                                if (
                                                  data.prepressOwner ===
                                                  el.email
                                                ) {
                                                  return el.nickName;
                                                }
                                              })}
                                            </p>
                                          </div>
                                          <div className="w-[14%] flex justify-center text-center px-[0.5%]">
                                            <p className="truncate">
                                              {data.status}
                                            </p>
                                          </div>
                                          <div className=" w-[6%] h-full flex justify-center items-center text-center px-[0.5%]">
                                            <button
                                              onClick={() => {
                                                setSelectOrderInQueue(data);
                                                setIsOpenQueueModal(
                                                  !isOpenQueueModal
                                                );
                                              }}
                                              className="px-[0.5rem] flex items-center justify-center"
                                            >
                                              <IoIosMore className="text-2xl cursor-pointer " />
                                            </button>
                                          </div>

                                          {selectOrderInQueue.id ===
                                            data.id && (
                                            <QueueMoreModal
                                              isSales={isSales}
                                              setLoading={setSalesLoading}
                                              selectOrderInQueue={
                                                selectOrderInQueue
                                              }
                                              setSelectOrderInQueue={
                                                setSelectOrderInQueue
                                              }
                                              isOpen={isOpenQueueModal}
                                              setIsOpen={setIsOpenQueueModal}
                                            />
                                          )}
                                        </div>
                                      );
                                    })}{" "}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectStatus === 1 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[58] && langData[58][0]
                          : changeLang === "TH"
                          ? langData[59] && langData[58][1]
                          : langData[59] && langData[58][2]}
                      </p>
                    </div>
                    {errorSalesReviseJob && (
                      <div className="h-full flex items-center">
                        <p className="text-red-400 font-extrabold">
                          {errorSalesReviseJob}
                        </p>
                      </div>
                    )}
                    <div className="h-full flex flex-row items-center">
                      <button
                        onClick={() =>
                          (window.location.href = "newOrderPrintPage")
                        }
                        className="bg-[#F1F1F1] flex flex-row items-center py-[0.25rem] px-[0.75rem] border-[#C2C2C2] border-[0.1rem] rounded-[0.5rem] hover:bg-[#C8262D] hover:text-white"
                      >
                        <div className="pr-[0.5rem]">
                          <FiPlusCircle />
                        </div>
                        <p className="text-[1rem] font-semibold">
                          {changeLang === "EN"
                            ? langData[59] && langData[59][0]
                            : changeLang === "TH"
                            ? langData[59] && langData[59][1]
                            : langData[59] && langData[59][2]}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-[4rem]  flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]"></div>
                  </div>
                  {!displayNewJobs[0] && (
                    <div className="mt-[2rem] text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayNewJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayNewJobs.map((data, i) => {
                      const date = new Date(+data.createdAt);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;

                      return (
                        <div
                          key={i}
                          className={`w-full h-[4rem] flex flex-row rounded-[0.5rem] mb-1 ${
                            selectNewJobTODelete.id === data.id
                              ? "bg-[#C8262D] text-white"
                              : "bg-[#F1F1F1] "
                          }`}
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold">{"-"}</p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold">
                              {data.status == "newJob" ? "New Job" : "-"}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                            <button
                              onClick={() => {
                                setSelectNewJobToDelete(data);
                                setIsOpenDeleteNewJob(!isOpenDeleteNewJob);
                              }}
                            >
                              <IoIosMore className="cursor-pointer text-2xl" />
                            </button>
                            {selectNewJobTODelete.id == data.id && (
                              <div className="  bg-gray-200   flex flex-row  -translate-x-32   ">
                                <button
                                  className="hover:bg-[#C8262D]  hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={handleDeleteNewJob}
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    setIsOpenSelectOrderToEdit(
                                      !isOpenSelectOrderToEdit
                                    );
                                    setSelectOrderToEdit(data);
                                  }}
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                >
                                  Edit
                                </button>
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => setSelectNewJobToDelete("")}
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectStatus == 2 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[62] && langData[62][0]
                        : changeLang === "TH"
                        ? langData[62] && langData[62][1]
                        : langData[62] && langData[62][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]"></div>
                  </div>
                  {!displayOnHoldingJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayOnHoldingJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayOnHoldingJobs?.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;

                      return (
                        <div
                          key={i}
                          className={`w-full h-[4rem] flex flex-row rounded-[0.5rem]  mb-1 ${
                            selectEditHoldingJob.id == data.id
                              ? "bg-[#C8262D] text-white"
                              : "bg-[#F1F1F1] "
                          } `}
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="font-semibold">
                              {data.rejectedRemark ? data.rejectedRemark : "-"}
                            </p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold">
                              {data.status == "holding" ? "On Holding" : ""}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                            <button
                              onClick={() => setSelectEditHoldingJob(data)}
                            >
                              <IoIosMore className="cursor-pointer text-2xl" />
                            </button>
                            {selectEditHoldingJob.id == data.id && (
                              <button className="bg-gray-200   flex flex-row   -translate-x-32">
                                <div
                                  onClick={() => {
                                    setSelectOrderToEdit(data);
                                    setIsOpenSelectOrderToEdit(
                                      !isOpenSelectOrderToEdit
                                    );
                                  }}
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                >
                                  Edit
                                </div>
                                <div
                                  onClick={() =>
                                    handleAddOrderInQueueAfterGotRejected(data)
                                  }
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                >
                                  Push
                                </div>
                                <div
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => setSelectEditHoldingJob("")}
                                >
                                  Cancel
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectStatus == 3 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[65] && langData[65][0]
                        : changeLang === "TH"
                        ? langData[65] && langData[65][1]
                        : langData[65] && langData[65][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center px-[0.5%] text-center"></div>
                  </div>
                  {!displayRejectedJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayRejectedJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayRejectedJobs?.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;

                      return (
                        <div
                          key={i}
                          className={`w-full h-[4rem] flex flex-row rounded-[0.5rem]  cursor-pointer mb-1 ${
                            selectAddRejectedJobInQueue.id == data.id
                              ? "bg-[#C8262D] text-white"
                              : "bg-[#F1F1F1] "
                          } `}
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>

                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="font-semibold truncate w-[4rem]">
                              {data.rejectedRemark ? data.rejectedRemark : "-"}
                            </p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[12rem]">
                              {data.status == "rejected" ? "Rejected" : ""}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                            <button
                              onClick={() =>
                                setSelectAddRejectedJobInQueue(data)
                              }
                            >
                              <IoIosMore className="cursor-pointer text-2xl" />
                            </button>
                            {selectAddRejectedJobInQueue.id == data.id && (
                              <button className="bg-gray-200  flex flex-row  -translate-x-32">
                                <div
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() =>
                                    handleAddOrderInQueueAfterGotRejected(data)
                                  }
                                >
                                  Push
                                </div>
                                <div
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() =>
                                    setSelectAddRejectedJobInQueue("")
                                  }
                                >
                                  Cancel
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectStatus == 4 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[68] && langData[68][0]
                        : changeLang === "TH"
                        ? langData[68] && langData[68][1]
                        : langData[68] && langData[68][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>

                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center px-[0.5%] text-center"></div>
                  </div>
                  {!displayRevisedJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayRevisedJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayRevisedJobs?.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;

                      return (
                        <div
                          key={i}
                          className={`w-full h-[4rem] flex flex-row rounded-[0.5rem]  mb-1 ${
                            selectInRevisedQueue.id == data.id
                              ? "bg-[#C8262D] text-white"
                              : "bg-[#F1F1F1] "
                          } `}
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="font-semibold truncate w-[4rem]">
                              {data.revisedRemark ? data.revisedRemark : "-"}
                            </p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[12rem]">
                              {data.status == "revised" ? "Revised" : ""}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                            <button
                              onClick={() => {
                                setSelectInRevisedQueue(data);
                                setSelectHoldRevisedJob(data);
                              }}
                            >
                              <IoIosMore className="cursor-pointer text-2xl" />
                            </button>
                            {selectHoldRevisedJob.id == data.id && (
                              <button className="bg-gray-200  flex flex-row  -translate-x-32">
                                <div
                                  onClick={() => handleHoldOrder(data)}
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                >
                                  Hold
                                </div>
                                <div
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => {
                                    setSelectHoldRevisedJob("");
                                    setSelectInRevisedQueue("");
                                  }}
                                >
                                  Cancel
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectStatus == 5 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[71] && langData[71][0]
                        : changeLang === "TH"
                        ? langData[71] && langData[71][1]
                        : langData[71] && langData[71][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>

                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center px-[0.5%] text-center"></div>
                  </div>
                  {!displayInQueueJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayInQueueJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayInQueueJobs.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;

                      return (
                        <div
                          key={i}
                          className={`w-full h-[4rem] flex flex-row rounded-[0.5rem]  mb-1 ${
                            selectInQueue.id == data.id
                              ? "bg-[#C8262D] text-white"
                              : "bg-[#F1F1F1] "
                          } `}
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="font-semibold truncate w-[4rem]">
                              {data.rejectedRemark ? data.rejectedRemark : "-"}
                            </p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[12rem]">
                              {data.status == "inQueue" ? "In Queue" : ""}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                            <button
                              onClick={() => {
                                setSelectInQueue(data);
                                setSelectHoldInQueueJob(data);
                              }}
                            >
                              <IoIosMore className="cursor-pointer text-2xl" />
                            </button>
                            {selectHoldInQueueJob.id == data.id && (
                              <button className="bg-gray-200 flex flex-row  -translate-x-32">
                                <div
                                  onClick={() => {
                                    handleHoldOrder(data);
                                  }}
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                >
                                  Hold
                                </div>
                                <div
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => {
                                    setSelectInQueue("");
                                    setSelectHoldInQueueJob("");
                                  }}
                                >
                                  Cancel
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectStatus == 6 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[74] && langData[74][0]
                        : changeLang === "TH"
                        ? langData[74] && langData[74][1]
                        : langData[74] && langData[74][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>

                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center px-[0.5%] text-center"></div>
                  </div>
                  {!displayOnWorkingJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayOnWorkingJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayOnWorkingJobs?.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;
                      return (
                        <div
                          key={i}
                          className="w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1"
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="font-semibold truncate w-[4rem]">
                              {data.rejectedRemark ? data.rejectedRemark : "-"}
                            </p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[12rem]">
                              {data.status === "working"
                                ? "On Working"
                                : data.status === "waitForPrepressToCheck"
                                ? "On Waiting For Prepress To Check "
                                : "On Checking"}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]"></div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectStatus == 7 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[77] && langData[77][0]
                        : changeLang === "TH"
                        ? langData[77] && langData[77][1]
                        : langData[77] && langData[77][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>

                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center px-[0.5%] text-center"></div>
                  </div>
                  {!displayWaitToConfirmJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayWaitToConfirmJobs[0] &&
                      "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayWaitToConfirmJobs.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;

                      return (
                        <div
                          key={i}
                          className={`w-full h-[4rem] flex flex-row rounded-[0.5rem] mb-1 ${
                            selectWaitToConfirm.id == data.id
                              ? "bg-[#C8262D] text-white"
                              : "bg-[#F1F1F1] "
                          }`}
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="truncate w-[4rem]">
                              {data.rejectedRemark ? data.rejectedRemark : "-"}
                            </p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[12rem]">
                              {data.status == "waitToConfirm"
                                ? "Wait To Confirm"
                                : ""}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                            <button
                              onClick={() => {
                                setIsOpenWaitToConFirm(!isOpenWaitToConfirm);
                                setSelectWaitToConfirm(data);
                              }}
                            >
                              <IoIosMore className="cursor-pointer text-2xl" />
                            </button>

                            {selectWaitToConfirm.id == data.id && (
                              <div className="bg-gray-200 flex flex-row  -translate-x-32">
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => handleConfirmOrder(data)}
                                >
                                  Confirm
                                </button>
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => setIsOpenRevise(true)}
                                >
                                  Revise
                                </button>
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => setSelectWaitToConfirm("")}
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                            {isOpenRevise && (
                              <div className="w-[20rem] h-auto rounded-lg right-[50px] top-[158px] text-black bg-[#E3E3E3] absolute ">
                                <div className="flex justify-end items-center bg-[#C8262D] mb-[0.5rem]">
                                  <button
                                    className="px-[0.5rem] py-[0.25rem] text-black font-semibold text-[1rem] flex"
                                    onClick={() =>
                                      setIsOpenRevise(!isOpenRevise)
                                    }
                                  >
                                    <p className="text-[1.5rem] text-white">
                                      x
                                    </p>
                                  </button>
                                </div>
                                <div className="flex px-5 py-[0.25rem] justify-between">
                                  <div className="w-[7rem] text-left">
                                    Order Number
                                  </div>
                                  <div>{selectWaitToConfirm.orderNumber}</div>
                                </div>
                                <div className="flex px-5 py-[0.25rem] justify-between">
                                  <div className="w-[7rem] text-left">
                                    ERP number
                                  </div>
                                  <div>{selectWaitToConfirm.erpNumber}</div>
                                </div>
                                <div className="px-[1.25rem] py-[0.25rem] flex items-start flex-col">
                                  Remark
                                  <div className="pt-2 w-full">
                                    <textarea
                                      name="revisedRemark"
                                      onChange={handleOnchangeRevisedInput}
                                      className=" w-[100%] h-[100px]  bg-[#FFFFFF] rounded-md overflow-y-scroll px-[0.5rem]"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="flex mb-[1rem]">
                                  <div className="flex gap-[1rem] w-full justify-center mt-[0.5rem]">
                                    <button
                                      onClick={() =>
                                        handleReviseOrderAndAddInQueue()
                                      }
                                      className="hover:bg-[#C8262D] hover:text-white w-[6rem] px-[1.25rem] py-[0.25rem] rounded-md border-[1px] bg-white text-black border-black"
                                    >
                                      Revise
                                    </button>
                                    <button
                                      className="hover:bg-[#C8262D] hover:text-white w-[6rem] px-[1.25rem] py-[0.25rem] rounded-md  border-[1px] bg-white text-black border-black"
                                      onClick={() =>
                                        setIsOpenRevise(!isOpenRevise)
                                      }
                                    >
                                      cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectStatus == 8 && (
                <div className="w-full h-[6rem]">
                  <div className="h-full flex items-center">
                    <p className="text-[1.25rem] font-semibold">
                      {changeLang === "EN"
                        ? langData[80] && langData[80][0]
                        : changeLang === "TH"
                        ? langData[80] && langData[80][1]
                        : langData[80] && langData[80][2]}
                    </p>
                  </div>

                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[49] && langData[49][0]
                          : changeLang === "TH"
                          ? langData[49] && langData[49][1]
                          : langData[49] && langData[49][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[50] && langData[50][0]
                          : changeLang === "TH"
                          ? langData[50] && langData[50][1]
                          : langData[50] && langData[50][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[51] && langData[51][0]
                          : changeLang === "TH"
                          ? langData[51] && langData[51][1]
                          : langData[51] && langData[51][2]}
                      </p>
                    </div>

                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[52] && langData[52][0]
                          : changeLang === "TH"
                          ? langData[52] && langData[52][1]
                          : langData[52] && langData[52][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[53] && langData[53][0]
                          : changeLang === "TH"
                          ? langData[53] && langData[53][1]
                          : langData[53] && langData[53][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center px-[0.5%] text-center">
                      <p>
                        {changeLang === "EN"
                          ? langData[54] && langData[54][0]
                          : changeLang === "TH"
                          ? langData[54] && langData[54][1]
                          : langData[54] && langData[54][2]}
                      </p>
                    </div>

                    <div className="h-full w-[6%] flex items-center justify-center px-[0.5%] text-center"></div>
                  </div>
                  {!displayCompletedJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${
                      displayCompletedJobs[0] && "overflow-y-scroll h-[60vh]"
                    }`}
                  >
                    {displayCompletedJobs?.map((data, i) => {
                      const date = new Date(+data.timeStamp);
                      // Step 3: Format Date object to Thailand timezone with milliseconds
                      const formatter = new Intl.DateTimeFormat("en-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      // Format the date and extract the formatted date part
                      const formattedDate = formatter.format(date);
                      // Construct the final formatted date string including milliseconds
                      const thailandTimeWithMillis = `${formattedDate}`;
                      return (
                        <div
                          key={i}
                          className="w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1"
                        >
                          <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="w-[10rem]">
                              {thailandTimeWithMillis}
                            </p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.orderNumber}</p>
                          </div>
                          <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                            <p>{data.erpNumber}</p>
                          </div>

                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[13rem]">
                              {isPrepress?.map((el) => {
                                if (data.prepressOwner === el.email) {
                                  return el.nickName;
                                }
                              })}
                            </p>
                          </div>
                          <div
                            onMouseOver={() => setSelectHoverRemark(data)}
                            onMouseLeave={() => setSelectHoverRemark("")}
                            className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                          >
                            <p className="font-semibold truncate w-[4rem]">
                              {data.rejectedRemark ? data.rejectedRemark : "-"}
                            </p>
                          </div>
                          <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                            <p className="font-semibold truncate w-[12rem]">
                              {data.status}
                            </p>
                          </div>

                          <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%] cursor-pointer">
                            <IoIosMore
                              onClick={() => {
                                setSelectToPreview(data);
                                setSelectCompleted(data);
                              }}
                              className="cursor-pointer text-2xl"
                            />
                            {selectCompleted.id == data.id && (
                              <div className="bg-gray-200 flex flex-row  -translate-x-32">
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => setIsOpenPreview(true)}
                                >
                                  Preview
                                </button>
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => {
                                    setIsOpenReNewPrintPage(true);
                                    setSelectOrderToEdit(data);
                                  }}
                                >
                                  Renew
                                </button>
                                <button
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-white"
                                  onClick={() => {
                                    setIsOpenPreview(false);
                                    setSelectCompleted("");
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {selectHoverRemark.id && (
                      <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                        <div className=""></div>
                        <div className="py-[0.25rem] w-full">
                          <p className="text-[1.25rem] font-bold text-[#C8262D]">
                            Remark
                          </p>
                        </div>
                        <div className="w-full py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Time</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            <DisplayDate
                              timestamp={selectHoverRemark.timeStamp}
                            />
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">Order NO.</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.orderNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem] flex justify-between">
                          <div className="w-[30%]">ERP</div>
                          <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                            {selectHoverRemark.erpNumber}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">sales</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem] flex">
                            {selectHoverRemark.revisedRemark
                              ? selectHoverRemark.revisedRemark
                              : "--"}
                          </div>
                        </div>
                        <div className="py-[0.25rem]">
                          <div className="py-[0.25rem]">Prepress</div>
                          <div className="w-full bg-white h-[6rem] rounded-md overflow-y-scroll">
                            {selectHoverRemark.rejectedRemark
                              ? selectHoverRemark.rejectedRemark
                              : "--"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isOpenReNewPrintPage && (
        <ReNewPrintPage targetOrderIdToEdit={selectOrderToEdit.id} />
      )}
      {isOpenPreview && <PreviewOrderPrintPage previewData={previewData} />}
    </div>
  );
}
