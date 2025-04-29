import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { getAccessToken } from "../utils/local-storage";

import axios from "../config/axios";

import { FiSearch } from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi2";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import EvaLoading from "../component/EvaLoading";

import io from "socket.io-client";
import DisplayDate from "../component/DisplayDate";
// const socket = io.connect("http://192.168.0.169:9999");
export default function PrepressWorkPage() {
  const [selectStatus, setSelectStatus] = useState(1);

  const [rejectRemark, setRejectRemark] = useState(null);
  ///Lang state
  const [changeLang, setChangeLang] = useState("EN");
  const [isOpenChangeLang, setIsOpenChangeLang] = useState(false);
  const {
    logout,
    authUser,
    prepressGetNewJob,
    displayPrepressNewJob,
    prepressRejectNewJob,
    prepressFinishNewJob,
    prepressFinishJobAfterChecked,
    displayPrepressWaitToConfirmJobs,
    displayPrepressCompleted,
    displayPrepressWaitToCheck,
    displayPrepressCompletedLayout,
    displayPrepressChecking,
    errorPrepressGetNewJob,
    successPrepressGetNewJob,
    loading,
    errorPrepressRejectNewJob,
    isSales,
    langData,
  } = useAuth();


  console.log(displayPrepressNewJob)
  const sideBar = [
    {
      id: 1,
      title:
        changeLang === "EN"
          ? langData[96] && langData[96][0]
          : changeLang === "TH" ? langData[96] && langData[96][1] : langData[96] && langData[96][2],
    },
    {
      id: 2,
      title:
        changeLang === "EN"
          ? langData[97] && langData[97][0]
          : changeLang === "TH" ? langData[97] && langData[97][1] : langData[97] && langData[97][2],
    },
    {
      id: 3,
      title:
        changeLang === "EN"
          ? langData[99] && langData[99][0]
          : changeLang === "TH" ? langData[99] && langData[99][1] : langData[99] && langData[99][2],
    },
    {
      id: 4,
      title:
        changeLang === "EN"
          ? langData[98] && langData[98][0]
          : changeLang === "TH" ? langData[98] && langData[98][1] : langData[98] && langData[98][2],
    },
    {
      id: 5,
      title:
        changeLang === "EN"
          ? "Completed Artwork Jobs"
          : changeLang === "TH" ? "งานอาร์ทเวิร์คเสร็จเรียบร้อย" : "已完成的艺术品工作"
    },
    {
      id: 6,
      title:
        changeLang === "EN"
          ? "Completed Layout Jobs"
          : changeLang === "TH" ? "งานเรย์เอาท์เสร็จเรียบร้อย" : "已完成的布局作业"
    },

  ];
  const [isOpenRejectNewOrder, setIsOpenRejectNewOrder] = useState(false);

  const [isOpenNewOrder, setIsOpenNewOrder] = useState(false);

  const [selectWaitTiConfirm, setSelectWaitToConfirm] = useState(false);

  const [isHoverRemark, setIsHoverRemark] = useState(false);

  const [readAllQueue, setReadAllQueue] = useState('')

  if (!getAccessToken()) {
    window.location.href = "/";
  }
  const handleLogout = () => {
    logout();
  };
  const userLanguage = navigator.language || navigator.userLanguage;
  // Display the language in the console

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
  useEffect(() => {
    axios.get('/prepress/readAllQueue').then((res) => setReadAllQueue(res.data))
  }, [])

  // useEffect(() => {

  //   if (displayPrepressNewJob) {


  //     socket.emit("getNewJob", displayPrepressNewJob);
  //   }
  // }, [displayPrepressNewJob]);

  const handleOnChangeRejectRemark = (e) => {
    setRejectRemark(e.target.value);
  };

  const handleRejectNewJob = () => {

    // if(displayPrepressNewJob.status == 'checkingLayout'){

    //   displayPrepressNewJob.rejectedRemark = rejectRemark;
    // }


    displayPrepressNewJob.rejectedRemark = rejectRemark;

    
    prepressRejectNewJob(displayPrepressNewJob);
    socket.emit("rejectNewJob", displayPrepressNewJob);
    return;
  };

  const handleFinishNewJob = () => {
    if (displayPrepressNewJob.status === "checking") {
      prepressFinishJobAfterChecked(displayPrepressNewJob);
      // socket.emit("finishNewJob", displayPrepressNewJob);
      return;
    }
    if(displayPrepressNewJob.status === "checkingLayout" ){
      prepressFinishJobAfterChecked(displayPrepressNewJob);
      return
    }

    // socket.emit("finishNewJob", displayPrepressNewJob);
    prepressFinishNewJob(displayPrepressNewJob);
  };

  const handleGetNewJob = () => {
    prepressGetNewJob();
  };



  return (
    <div>

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
                    className={`cursor-pointer w-full h-[4rem] flex justify-center items-center  hover:bg-gray-100 hover:bg-opacity-60
                      ${selectStatus === data.id
                        ? "bg-white text-[#C8262D] font-bold pt-10 pb-10"
                        : ""
                      }`}
                    key={data.id}
                  >
                    <div className="w-[80%] flex justify-center">
                      <div className="w-[70%]">{data.title}</div>
                    </div>

                    <div className="w-[20%]">
                      {displayPrepressNewJob?.status && data.id === 1 && (
                        <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                          1
                        </div>
                      )}

                      {displayPrepressWaitToCheck[0]?.status &&
                        data.id === 2 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayPrepressWaitToCheck.length}
                          </div>
                        )}

                      {displayPrepressChecking[0]?.status &&
                        data.id === 3 && (
                          <div className="flex  justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayPrepressChecking.length}
                          </div>
                        )}

                      {displayPrepressWaitToConfirmJobs[0]?.status && data.id === 4 && (
                        <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                          {displayPrepressWaitToConfirmJobs.length}
                        </div>
                      )}
                      {
                        displayPrepressCompleted[0]?.status && data.id === 5 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayPrepressCompleted.length}
                          </div>
                        )}
                      {
                        displayPrepressCompletedLayout[0]?.status && data.id === 6 && (
                          <div className="flex justify-center animate-bounce font-extrabold text-red-500 text-center">
                            {displayPrepressCompletedLayout.length}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[3rem] z-20 left-0 bottom-0 bg-[#C8262D] flex justify-center items-center">
              <p className="text-white text-[0.8rem] font-semibold text-center">
                Created by AD MEWorx.
              </p>
            </div>

          </div>

          <div className="w-[85vw] h-screen flex flex-col px-[4rem] bg-white right-0 absolute">
            <div className="w-full h-[6rem] z-10 flex justify-between">
              <div className="h-full flex items-center gap-5">
                <p className="text-[1.75rem] font-semibold">
                  {authUser.email}
                </p>

                <div className="font-semibold">All Queues :

                </div>
                <div className="animate-bounce text-red-700 text-2xl">{readAllQueue.length}</div>
              </div>
              <div className=" h-full flex flex-row items-center">

                <div className="flex flex-col items-center justify-start h-[2rem]">
                  <div className="mx-[0.5rem] cursor-pointer text-[1.1rem]">
                    <div
                      onClick={() => setIsOpenChangeLang(!isOpenChangeLang)}
                      className="px-[0.5rem] py-[0.25rem] font-semibold hover:text-[#C8262D]"
                    >
                      {changeLang === "EN" && <div>EN</div>}
                      {changeLang === "TH" && <div>TH</div>}
                      {changeLang === "CN" && <div >CN</div>}
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
                      <div className="cursor-pointer" onClick={() => {
                        setIsOpenChangeLang(!isOpenChangeLang)
                        setChangeLang("CN")
                      }}>CN</div>
                    </div>
                  )}
                </div>

                <button
                  className="flex h-[2rem] w-[6rem] p-[0.5rem] ml-[0.75rem] text-[1.1rem] justify-center items-center font-semibold hover:text-[#C8262D]"
                  onClick={handleLogout}
                >
                  {" "}
                  {changeLang === "EN"
                    ? langData[94] && langData[94][0]
                    : changeLang === "TH" ? langData[94] && langData[94][1] : langData[94] && langData[94][2]}
                </button>
              </div>
            </div>

            <div>
              {selectStatus === 1 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center gap-5">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[112] && langData[112][0]
                          : changeLang === "TH" ? langData[112] && langData[112][1] : langData[112] && langData[112][2]}
                      </p>
                      {successPrepressGetNewJob && (
                        <p className="text-green-500 font-extrabold text-xl">
                          {successPrepressGetNewJob}
                        </p>
                      )}
                      {errorPrepressGetNewJob && (
                        <p className="text-[#C8262D] font-extrabold text-xl">
                          {errorPrepressGetNewJob}
                        </p>
                      )}
                      {errorPrepressRejectNewJob && (
                        <p className="text-[#C8262D] font-extrabold text-xl">
                          {errorPrepressRejectNewJob}
                        </p>
                      )}
                    </div>
                    <div className=" flex flex-row items-center">
                      <button
                        disabled={displayPrepressNewJob ? true : false}
                        onClick={() => handleGetNewJob()}
                        className={`bg-[#F1F1F1] flex flex-row items-center py-[0.25rem] px-[0.75rem] border-[#C2C2C2] border-[0.1rem] rounded-[0.5rem] mb-1 ${displayPrepressNewJob
                            ? "cursor-not-allowed opacity-30 "
                            : "hover:bg-[#C8262D] hover:text-white"
                          }`}
                      >
                        <div className="pr-[0.5rem]">
                          <FiPlusCircle />
                        </div>
                        <p className="text-[1rem] font-semibold">
                          {changeLang === "EN"
                            ? langData[113] && langData[113][0]
                            : changeLang === "TH" ? langData[113] && langData[113][1] : langData[113] && langData[113][2]}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[103] && langData[103][0]
                          : changeLang === "TH" ? langData[103] && langData[103][1] : langData[103] && langData[103][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[104] && langData[104][0]
                          : changeLang === "TH" ? langData[104] && langData[104][1] : langData[104] && langData[104][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[105] && langData[105][0]
                          : changeLang === "TH" ? langData[105] && langData[105][1] : langData[105] && langData[105][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[106] && langData[106][0]
                          : changeLang === "TH" ? langData[106] && langData[106][1] : langData[106] && langData[106][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[107] && langData[107][0]
                          : changeLang === "TH" ? langData[107] && langData[107][1] : langData[107] && langData[107][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[108] && langData[108][0]
                          : changeLang === "TH" ? langData[108] && langData[108][1] : langData[108] && langData[108][2]}
                      </p>
                    </div>
                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                      <p></p>
                    </div>
                  </div>
                  {!displayPrepressNewJob && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${displayPrepressNewJob && "overflow-y-scroll h-[60vh]"
                      }`}
                  >
                    {displayPrepressNewJob && (
                      <div
                        className={`w-full h-[4rem] flex flex-row  rounded-[0.5rem]   ${isOpenNewOrder
                            ? "bg-[#C8262D] text-white"
                            : "bg-[#F1F1F1]"
                          }
                  `}
                      >
                        <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                          <DisplayDate
                            timestamp={displayPrepressNewJob.timeStamp}
                          />
                        </div>
                        <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                          <p>{displayPrepressNewJob?.orderNumber}</p>
                        </div>
                        <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                          <p>{displayPrepressNewJob?.erpNumber}</p>
                        </div>
                        <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                          <p className="truncate w-[13rem]">
                            {isSales.map((data) => {
                              if (displayPrepressNewJob?.userId === data.id) {
                                return data.email;
                              }
                            })}
                          </p>
                        </div>
                        <div
                          onMouseOver={() => setIsHoverRemark(true)}
                          onMouseLeave={() => setIsHoverRemark(false)}
                          className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                        >
                          <p className="truncate w-[4rem]">
                            {displayPrepressNewJob?.revisedRemark
                              ? displayPrepressNewJob?.revisedRemark
                              : displayPrepressNewJob.checkedRemark || "--"}
                          </p>
                        </div>
                        <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                          <p className="font-semibold truncate w-[12rem]">
                            {displayPrepressNewJob?.status}
                          </p>
                        </div>
                        <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                          <IoIosMore
                            onClick={() => {
                              setIsHoverRemark(true)
                              setIsOpenNewOrder(!isOpenNewOrder);
                              setSelectWaitToConfirm(displayPrepressNewJob.id);
                            }}
                            className="cursor-pointer text-2xl"
                          />
                          {isOpenNewOrder && (
                            <div>
                              <div className="  bg-gray-200 absolute  flex flex-col  right-[5%] -translate-y-[62px]">
                                <button
                                  onClick={() => {
                                    return handleFinishNewJob();
                                  }}
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black"
                                >
                                  Finish
                                </button>
                                {displayPrepressNewJob.prepressOwner ===
                                  authUser.email &&
                                  displayPrepressNewJob.prepressToCheck ===
                                  null && (
                                    <button
                                      onClick={() => {
                                        setIsOpenRejectNewOrder(
                                          !isOpenRejectNewOrder
                                        );
                                      }}
                                      className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black"
                                    >
                                      Reject
                                    </button>
                                  )}
                                  {
                                    displayPrepressNewJob.status == 'checkingLayout' && (
                                      <button
                                      onClick={() => {
                                        setIsOpenRejectNewOrder(
                                          !isOpenRejectNewOrder
                                        );
                                      }}
                                      className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black"
                                    >
                                      Reject 
                                    </button>
                                    )
                                  }
                                {displayPrepressNewJob.prepressToCheck ===
                                  authUser.email &&  displayPrepressNewJob.status !== 'checkingLayout' &&(
                                    <button
                                      onClick={() => {
                                        setIsOpenRejectNewOrder(
                                          !isOpenRejectNewOrder
                                        );
                                      }}
                                      className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black"
                                    >
                                      Reject
                                    </button>
                                  )}
                                <button
                                  onClick={() =>
                              {      setIsHoverRemark(false)
                                    setIsOpenNewOrder(!isOpenNewOrder)}
                                  }
                                  className="hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                          {isOpenRejectNewOrder && (
                            <div className="w-[50vh] h-[350px] rounded-lg right-[50px] top-[158px] bg-[#E3E3E3] text-black absolute ">
                              <div className="flex justify-between">
                                <div className="flex justify-between w-full bg-[#C8262D] rounded-t-md ">
                                  <div className=""></div>
                                  <button
                                    className="pr-1 pt-1 text-white font-semibold text-2xl"
                                    onClick={() =>
                                      setIsOpenRejectNewOrder(
                                        !isOpenRejectNewOrder
                                      )
                                    }
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between pt-5">
                                <div className="pl-5">Order No.</div>
                                <div className="pr-5">
                                  {displayPrepressNewJob.orderNumber}
                                </div>
                              </div>
                              <div className="flex justify-between ">
                                <div className="pl-5">ERP</div>
                                <div className="pr-5">
                                  {displayPrepressNewJob.erpNumber}
                                </div>
                              </div>
                              <div className="pt-5">
                                <div className="flex pl-5">Remark</div>
                                <div className=" pt-2  ">
                                  <textarea
                                    onChange={handleOnChangeRejectRemark}
                                    className=" w-[90%] h-[100px]  bg-[#FFFFFF] pt-2 rounded-md overflow-clip
                                "
                                  ></textarea>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <div className="flex gap-5 pt-5 w-full justify-evenly">
                                  <button
                                    className="bg-[#C8262D] text-white w-[150px] pt-2 pb-2 rounded-md border-[1px]  border-black"
                                    onClick={() => {
                                      handleRejectNewJob();
                                    }}
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    className="w-[150px] rounded-md p- border-[1px] bg-white text-black border-black"
                                    onClick={() =>
                                      setIsOpenRejectNewOrder(
                                        !isOpenRejectNewOrder
                                      )
                                    }
                                  >
                                    cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {isHoverRemark && (
                          <div className="bg-gray-400  w-[35vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                            <div className="py-[0.25rem] w-full">
                              <p className="text-[1.25rem] font-bold text-[#C8262D]">
                                Remark
                              </p>
                            </div>
                            <div className="w-full py-[0.25rem] flex justify-between">
                              <div className="w-[30%]">Time</div>
                              <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                <DisplayDate
                                  timestamp={displayPrepressNewJob.timeStamp}
                                />
                              </div>
                            </div>
                            <div className="py-[0.25rem] flex justify-between">
                              <div className="w-[30%]">Order NO.</div>
                              <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                {displayPrepressNewJob.orderNumber}
                              </div>
                            </div>
                            <div className="py-[0.25rem] flex justify-between">
                              <div className="w-[30%]">ERP</div>
                              <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                {displayPrepressNewJob.erpNumber}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="pt-[0.5rem] pb-[0.5rem]">sales</div>
                              <div className="w-full text-black text-[0.8rem] bg-white h-[4rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                {displayPrepressNewJob.revisedRemark
                                  && displayPrepressNewJob.revisedRemark
                              }
                              </div>
                              <div className="pt-[0.5rem] pb-[0.5rem]">
                                Prepress Owner
                              </div>
                              <div className="w-full  text-black text-[0.8rem]  bg-white h-[4rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                {displayPrepressNewJob.rejectedRemark
                                  ? displayPrepressNewJob.rejectedRemark
                                  : "--"}
                              </div>
                              <div className="pt-[0.5rem] pb-[0.5rem]">
                                Prepress Checker
                              </div>
                              <div className="w-full text-black text-[0.8rem]  bg-white h-[4rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                {displayPrepressNewJob.checkedRemark
                                  ? displayPrepressNewJob.checkedRemark
                                  : "--"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectStatus === 2 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[116] && langData[116][0]
                          : changeLang === "TH" ? langData[116] && langData[116][1] : langData[116] && langData[116][2]}
                      </p>
                    </div>
                    <div className="h-full flex flex-row items-center"></div>
                  </div>
                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[103] && langData[103][0]
                          : changeLang === "TH" ? langData[103] && langData[103][1] : langData[103] && langData[103][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[104] && langData[104][0]
                          : changeLang === "TH" ? langData[104] && langData[104][1] : langData[104] && langData[104][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[105] && langData[105][0]
                          : changeLang === "TH" ? langData[105] && langData[105][1] : langData[105] && langData[105][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[106] && langData[106][0]
                          : changeLang === "TH" ? langData[106] && langData[106][1] : langData[106] && langData[106][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[107] && langData[107][0]
                          : changeLang === "TH" ? langData[107] && langData[107][1] : langData[107] && langData[107][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[108] && langData[108][0]
                          : changeLang === "TH" ? langData[108] && langData[108][1] : langData[108] && langData[108][2]}
                      </p>
                    </div>
                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                      <p></p>
                    </div>
                  </div>
                  {!displayPrepressWaitToCheck[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${displayPrepressWaitToCheck[0] &&
                      "overflow-y-scroll h-[60vh]"
                      }`}
                  >
                    {displayPrepressWaitToCheck &&
                      displayPrepressWaitToCheck?.map((data) => {
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
                            key={data.id}
                            className={`w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1`}

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
                              <p className="font-semibold truncate w-[13rem] text-black">
                                {isSales.map((el) => {
                                  if (data.userId === el.id) {
                                    return el.email;
                                  }
                                })}
                              </p>
                            </div>
                            <div
                              onMouseOver={() => setIsHoverRemark(true)}
                              onMouseLeave={() => setIsHoverRemark(false)}
                              className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                            >
                              <p className="font-semibold truncate w-[4rem]">
                                {data.revisedRemark ? data.revisedRemark : "-"}
                              </p>
                            </div>
                            <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                              <p className="font-semibold truncate w-[12rem]">
                                {data.status === "waitForPrepressToCheck" &&
                                  "Wait For Prepress To Check"}
                              </p>
                            </div>
                            <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]"></div>
                            {isHoverRemark && (
                              <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                                <div className="py-[0.25rem] w-full">
                                  <p className="text-[1.25rem] font-bold text-[#C8262D]">
                                    Remark
                                  </p>
                                </div>
                                <div className="w-full py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Time</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    <DisplayDate timestamp={data.timeStamp} />
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Order NO.</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.orderNumber}
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">ERP</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.erpNumber}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    sales
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.revisedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Owner
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.rejectedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Checker
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.checkedRemark}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {selectStatus === 3 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[125] && langData[125][0]
                          : changeLang === "TH" ? langData[125] && langData[125][1] : langData[125] && langData[125][2]}
                      </p>
                    </div>
                    <div className="h-full flex flex-row items-center"></div>
                  </div>
                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[103] && langData[103][0]
                          : changeLang === "TH" ? langData[103] && langData[103][1] : langData[103] && langData[103][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[104] && langData[104][0]
                          : changeLang === "TH" ? langData[104] && langData[104][1] : langData[104] && langData[104][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[105] && langData[105][0]
                          : changeLang === "TH" ? langData[105] && langData[105][1] : langData[105] && langData[105][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[106] && langData[106][0]
                          : changeLang === "TH" ? langData[106] && langData[106][1] : langData[106] && langData[106][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[107] && langData[107][0]
                          : changeLang === "TH" ? langData[107] && langData[107][1] : langData[107] && langData[107][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[108] && langData[108][0]
                          : changeLang === "TH" ? langData[108] && langData[108][1] : langData[108] && langData[108][2]}
                      </p>
                    </div>
                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                      <p></p>
                    </div>
                  </div>
                  {!displayPrepressChecking[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${displayPrepressChecking[0] &&
                      "overflow-y-scroll h-[60vh]"
                      }`}
                  >
                    {displayPrepressChecking &&
                      displayPrepressChecking?.map((data) => {
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
                            key={data.id}
                            className={`w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1`}

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
                                {isSales.map((el) => {
                                  if (el.id === data.userId) {
                                    return el.email;
                                  }
                                })}
                              </p>
                            </div>
                            <div
                              onMouseOver={() => setIsHoverRemark(true)}
                              onMouseLeave={() => setIsHoverRemark(false)}
                              className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                            >
                              <p className="font-semibold truncate w-[4rem]">
                                {data.revisedRemark ? data.revisedRemark : "-"}
                              </p>
                            </div>
                            <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                              <p className="font-semibold truncate w-[12rem]">
                                {data.status === "waitToConfirm" &&
                                  "Wait To Confirm"}
                              </p>
                            </div>
                            <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]"></div>
                            {isHoverRemark && (
                              <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                                <div className="py-[0.25rem] w-full">
                                  <p className="text-[1.25rem] font-bold text-[#C8262D]">
                                    Remark
                                  </p>
                                </div>
                                <div className="w-full py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Time</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    <DisplayDate timestamp={data.timeStamp} />
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Order NO.</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.orderNumber}
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">ERP</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.erpNumber}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    sales
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.revisedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Owner
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.rejectedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Checker
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.checkedRemark}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {selectStatus === 4 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[119] && langData[119][0]
                          : changeLang === "TH" ? langData[119] && langData[119][1] : langData[119] && langData[119][2]}
                      </p>
                    </div>
                    <div className="h-full flex flex-row items-center"></div>
                  </div>
                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[103] && langData[103][0]
                          : changeLang === "TH" ? langData[103] && langData[103][1] : langData[103] && langData[103][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[104] && langData[104][0]
                          : changeLang === "TH" ? langData[104] && langData[104][1] : langData[104] && langData[104][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[105] && langData[105][0]
                          : changeLang === "TH" ? langData[105] && langData[105][1] : langData[105] && langData[105][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[106] && langData[106][0]
                          : changeLang === "TH" ? langData[106] && langData[106][1] : langData[106] && langData[106][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[107] && langData[107][0]
                          : changeLang === "TH" ? langData[107] && langData[107][1] : langData[107] && langData[107][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[108] && langData[108][0]
                          : changeLang === "TH" ? langData[108] && langData[108][1] : langData[108] && langData[108][2]}
                      </p>
                    </div>
                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                      <p></p>
                    </div>
                  </div>
                  {!displayPrepressWaitToConfirmJobs[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${displayPrepressWaitToConfirmJobs[0] &&
                      "overflow-y-scroll h-[60vh]"
                      }`}
                  >
                    {displayPrepressWaitToConfirmJobs &&
                      displayPrepressWaitToConfirmJobs?.map((data) => {
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
                            key={data.id}
                            className={`w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1`}

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
                                {isSales.map((el) => {
                                  if (el.id === data.userId) {
                                    return el.email;
                                  }
                                })}
                              </p>
                            </div>
                            <div
                              onMouseOver={() => setIsHoverRemark(true)}
                              onMouseLeave={() => setIsHoverRemark(false)}
                              className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                            >
                              <p className="font-semibold truncate w-[4rem]">
                                {data.revisedRemark ? data.revisedRemark : "-"}
                              </p>
                            </div>
                            <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                              <p className="font-semibold truncate w-[12rem]">
                                {data.status === "waitToConfirm" &&
                                  "Wait To Confirm"}
                              </p>
                            </div>
                            <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]"></div>
                            {isHoverRemark && (
                              <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                                <div className="py-[0.25rem] w-full">
                                  <p className="text-[1.25rem] font-bold text-[#C8262D]">
                                    Remark
                                  </p>
                                </div>
                                <div className="w-full py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Time</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    <DisplayDate timestamp={data.timeStamp} />
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Order NO.</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.orderNumber}
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">ERP</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.erpNumber}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    sales
                                  </div>
                                  <div className="w-full bg-white h-[4rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.revisedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Owner
                                  </div>
                                  <div className="w-full bg-white h-[4rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.rejectedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Checker
                                  </div>
                                  <div className="w-full bg-white h-[4rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.checkedRemark}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {selectStatus === 5 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[122] && langData[122][0]
                          : changeLang === "TH" ? langData[122] && langData[122][1] : langData[122] && langData[122][2]}
                      </p>
                    </div>
                    <div className="h-full flex flex-row items-center"></div>
                  </div>
                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[103] && langData[103][0]
                          : changeLang === "TH" ? langData[103] && langData[103][1] : langData[103] && langData[103][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[104] && langData[104][0]
                          : changeLang === "TH" ? langData[104] && langData[104][1] : langData[104] && langData[104][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[105] && langData[105][0]
                          : changeLang === "TH" ? langData[105] && langData[105][1] : langData[105] && langData[105][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[106] && langData[106][0]
                          : changeLang === "TH" ? langData[106] && langData[106][1] : langData[106] && langData[106][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[107] && langData[107][0]
                          : changeLang === "TH" ? langData[107] && langData[107][1] : langData[107] && langData[107][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[108] && langData[108][0]
                          : changeLang === "TH" ? langData[108] && langData[108][1] : langData[108] && langData[108][2]}
                      </p>
                    </div>
                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                      <p></p>
                    </div>
                  </div>
                  {!displayPrepressCompleted[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${displayPrepressCompleted[0] &&
                      "overflow-y-scroll h-[60vh]"
                      }`}
                  >
                    {displayPrepressCompleted &&
                      displayPrepressCompleted?.map((data) => {

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
                            key={data.id}
                            className={`w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1 ${selectWaitTiConfirm == data.id
                                ? "bg-[#C8262D] text-white"
                                : ""
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
                                {isSales.map((el) => {
                                  if (el.id === data.userId) {
                                    return el.email;
                                  }
                                })}
                              </p>
                            </div>
                            <div
                              onMouseOver={() => setIsHoverRemark(true)}
                              onMouseLeave={() => setIsHoverRemark(false)}
                              className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                            >
                              <p className="font-semibold truncate w-[4rem]">
                                {data.revisedRemark ? data.revisedRemark : "-"}
                              </p>
                            </div>
                            <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                              <p className="font-semibold truncate w-[12rem]">
                                {data.status}
                              </p>
                            </div>
                            <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">

                            </div>
                            {isHoverRemark && (
                              <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                                <div className="py-[0.25rem] w-full">
                                  <p className="text-[1.25rem] font-bold text-[#C8262D]">
                                    Remark
                                  </p>
                                </div>
                                <div className="w-full py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Time</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    <DisplayDate timestamp={data.timeStamp} />
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Order NO.</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.orderNumber}
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">ERP</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.erpNumber}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    sales
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.revisedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Owner
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.rejectedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Checker
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.checkedRemark}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {selectStatus === 6 && (
                <div>
                  <div className="w-full h-[6rem] flex justify-between">
                    <div className="h-full flex items-center">
                      <p className="text-[1.25rem] font-semibold">
                        {changeLang === "EN"
                          ? langData[127] && langData[127][0]
                          : changeLang === "TH" ? langData[127] && langData[127][1] : langData[127] && langData[127][2]}
                      </p>
                    </div>
                    <div className="h-full flex flex-row items-center"></div>
                  </div>
                  <div className="w-full h-[4rem] flex flex-row pr-[1.25rem]">
                    <div className="h-full w-[16%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[103] && langData[103][0]
                          : changeLang === "TH" ? langData[103] && langData[103][1] : langData[103] && langData[103][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[104] && langData[104][0]
                          : changeLang === "TH" ? langData[104] && langData[104][1] : langData[104] && langData[104][2]}
                      </p>
                    </div>
                    <div className="h-full w-[14%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[105] && langData[105][0]
                          : changeLang === "TH" ? langData[105] && langData[105][1] : langData[105] && langData[105][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[106] && langData[106][0]
                          : changeLang === "TH" ? langData[106] && langData[106][1] : langData[106] && langData[106][2]}
                      </p>
                    </div>
                    <div className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[107] && langData[107][0]
                          : changeLang === "TH" ? langData[107] && langData[107][1] : langData[107] && langData[107][2]}
                      </p>
                    </div>
                    <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                      <p>
                        {changeLang === "EN"
                          ? langData[108] && langData[108][0]
                          : changeLang === "TH" ? langData[108] && langData[108][1] : langData[108] && langData[108][2]}
                      </p>
                    </div>
                    <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">
                      <p></p>
                    </div>
                  </div>
                  {!displayPrepressCompletedLayout[0] && (
                    <div className=" text-2xl font-semibold">
                      No Information...
                    </div>
                  )}

                  <div
                    className={`w-auto   pr-[0.25rem] ${displayPrepressCompletedLayout[0] &&
                      "overflow-y-scroll h-[60vh]"
                      }`}
                  >
                    {displayPrepressCompletedLayout &&
                      displayPrepressCompletedLayout?.map((data) => {

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
                            key={data.id}
                            className={`w-full h-[4rem] flex flex-row bg-[#F1F1F1] rounded-[0.5rem] mb-1 ${selectWaitTiConfirm == data.id
                                ? "bg-[#C8262D] text-white"
                                : ""
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
                                {isSales.map((el) => {
                                  if (el.id === data.userId) {
                                    return el.email;
                                  }
                                })}
                              </p>
                            </div>
                            <div
                              onMouseOver={() => setIsHoverRemark(true)}
                              onMouseLeave={() => setIsHoverRemark(false)}
                              className="h-full w-[10%] flex items-center justify-center text-center px-[0.5%]"
                            >
                              <p className="font-semibold truncate w-[4rem]">
                                {data.revisedRemark ? data.revisedRemark : "-"}
                              </p>
                            </div>
                            <div className="h-full w-[20%] flex items-center justify-center text-center px-[0.5%]">
                              <p className="font-semibold truncate w-[12rem]">
                                {data.status}
                              </p>
                            </div>
                            <div className="h-full w-[6%] flex items-center justify-center text-center px-[0.5%]">

                            </div>
                            {isHoverRemark && (
                              <div className="bg-[#E3E3E3]  w-[24vw] max-h-[60rem] px-[1rem] pt-[0.5rem] pb-[1rem] top-64  absolute rounded-md">
                                <div className="py-[0.25rem] w-full">
                                  <p className="text-[1.25rem] font-bold text-[#C8262D]">
                                    Remark
                                  </p>
                                </div>
                                <div className="w-full py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Time</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    <DisplayDate timestamp={data.timeStamp} />
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">Order NO.</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.orderNumber}
                                  </div>
                                </div>
                                <div className="py-[0.25rem] flex justify-between">
                                  <div className="w-[30%]">ERP</div>
                                  <div className="w-[70%] truncate flex justify-end items-center pl-[0.5rem]">
                                    {data.erpNumber}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    sales
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.revisedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Owner
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.rejectedRemark}
                                  </div>
                                  <div className="pt-[0.5rem] pb-[0.5rem]">
                                    Prepress Checker
                                  </div>
                                  <div className="w-full bg-white h-[2rem] rounded-md overflow-y-scroll pl-[0.5rem] pr-[0.25rem] py-[0.25rem]">
                                    {data.checkedRemark}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
