import { useAuth } from "../hooks/use-auth";
import { getAccessToken } from "../utils/local-storage";

import axios from "../config/axios";
import { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi2";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";

import EvaLoading from "../component/EvaLoading";
import DisplayDate from "../component/DisplayDate";

export default function ProductionPlanningWorkPage() {
  const [allOrders, setAllOrders] = useState([]);
  const [inQueueOrders, setInQueueOrders] = useState([]);

  const [isOpenQueueModal, setIsOpenQueueModal] = useState(false);

  const [selectOrderInQueue, setSelectOrderInQueue] = useState("");
  const [loading, setLoading] = useState(false);

  const [isSales, setIsSales] = useState([]);
  const [completedOrderData, setCompletedOrderData] = useState([]);

  const { logout, langData ,authUser} = useAuth();
  if (!getAccessToken()) {
    window.location.href = "/";
  }
  const handleLogout = () => {
    logout();
  };
  const [changeLang, setChangeLang] = useState("EN");
  const [isOpenChangeLang, setIsOpenChangeLang] = useState(false);
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
      .get("/admin/readAllCompletedOrders")
      .then((res) => setCompletedOrderData(res.data));
  }, [loading]);

  const handleMoveOrderInQueue = (data) => {
    setLoading(true);

    axios.post("/admin/moveCompletedOrderInQueue", {data:data ,authUser: authUser});
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };
  const handleMoveOutFromQueue = (data) => {
    setLoading(true);
    axios.post("/admin/moveOutCompletedOrderInQueue", data);
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };
  return (
    <div>
      {loading ? (
        <EvaLoading />
      ) : (
        <div className="">
          <div className="h-screen w-screen flex flex-row justify-center items-center">
            <div className="bg-[#F1F1F1]  w-[10vw] h-screen flex flex-col justify-between absolute left-0">
              <div className="h-screen w-[10vw] absolute">
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
                <div className="w-full flex flex-col items-center bg-white text-[#C8262D] cursor-pointer h-[4rem] justify-between">
                  <div className="w-full flex flex-row justify-between">
                    <div className="w-[80%] flex justify-center">
                      <div className="w-[70%]">
                        <button className="w-full h-[4rem] flex items-center">
                          <p className="text-[#C8262D] text-[1rem] font-bold text-left">
                            Overview
                          </p>
                        </button>
                      </div>
                    </div>

                    <div className="w-[20%] h-full"></div>
                  </div>
                </div>
              </div>
              <div className="h-[3rem] z-20 bg-[#C8262D] flex justify-center items-center">
                <p className="text-white text-[0.8rem] font-semibold text-center">
                  Created by AD MEWorx.
                </p>
              </div>
            </div>

            <div className="w-[90vw] h-screen flex flex-col px-[1rem] bg-white right-0 absolute">
              <div className="w-full h-[6rem] flex justify-between px-[1rem]">
                <div className="h-full flex items-center">
                  <p className="text-[1.75rem] font-semibold">
                    {changeLang === "EN"
                      ? langData[142] && langData[142][0]
                      : changeLang === "TH"
                      ? langData[142] && langData[142][1]
                      : langData[142] && langData[142][2]}
                  </p>
                </div>
                <div className=" h-full flex flex-row items-center">
                  <div className="flex flex-col items-center justify-start h-[2rem] z-50">
                    <div className="mx-[0.5rem] cursor-pointer text-[1.1rem]">
                      <div
                        onClick={() => setIsOpenChangeLang(!isOpenChangeLang)}
                        className="px-[0.5rem] py-[0.25rem] font-semibold hover:text-[#C8262D]"
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
                          className="text-[1rem] cursor-pointer hover:text-[#C8262D]"
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
                  <button
                    className=" p-[0.5rem] ml-[0.75rem] text-[1.1rem] font-semibold hover:text-[#C8262D]"
                    onClick={handleLogout}
                  >
                    {" "}
                    {changeLang === "EN"
                      ? langData[94] && langData[94][0]
                      : changeLang === "TH"
                      ? langData[94] && langData[94][1]
                      : langData[94] && langData[94][2]}
                  </button>
                </div>
              </div>

              <div className=" flex flex-row w-[100%]">
                <div className="w-[55%] h-full flex flex-col items-center">
                  <div className="w-full h-full px-[0.5] flex flex-col">
                    <div className="w-full h-[4rem] flex justify-center">
                      <div className="h-full flex items-center">
                        <p className="text-[1.25rem] font-semibold">
                          {changeLang === "EN"
                            ? langData[146] && langData[146][0]
                            : changeLang === "TH"
                            ? langData[146] && langData[146][1]
                            : langData[146] && langData[146][2]}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-full flex flex-col items-end">
                      <div className="w-full h-[60vh] mb-[0.5rem] py-[0.5rem] bg-[#F1F1F1] flex flex-col rounded-[0.5rem]">
                        <div className="w-full h-full pl-[1rem]  flex flex-col rounded-[0.5rem] pr-[0.25rem]">
                          <div className="h-[4rem] flex flex-row justify-between items-center mb-[0.5rem] pr-[1.25rem]">
                            <div className="w-[6%] items-center text-center px-[0.5%]">
                              <p className="text-[0.8rem]">#</p>
                            </div>
                            <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[49] && langData[49][0]
                                  : changeLang === "TH"
                                  ? langData[49] && langData[49][1]
                                  : langData[49] && langData[49][2]}
                              </p>
                            </div>
                            <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[50] && langData[50][0]
                                  : changeLang === "TH"
                                  ? langData[50] && langData[50][1]
                                  : langData[50] && langData[50][2]}
                              </p>
                            </div>
                            <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[51] && langData[51][0]
                                  : changeLang === "TH"
                                  ? langData[51] && langData[51][1]
                                  : langData[50] && langData[50][2]}
                              </p>
                            </div>
                            <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[106] && langData[106][0]
                                  : changeLang === "TH"
                                  ? langData[106] && langData[106][1]
                                  : langData[106] && langData[106][2]}
                              </p>
                            </div>

                            <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[52] && langData[52][0]
                                  : changeLang === "TH"
                                  ? langData[52] && langData[52][1]
                                  : langData[52] && langData[52][2]}
                              </p>
                            </div>
                            <div className="w-[14%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[108] && langData[108][0]
                                  : changeLang === "TH"
                                  ? langData[108] && langData[108][1]
                                  : langData[108] && langData[108][2]}
                              </p>
                            </div>
                            <div className="w-[10%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black"></p>
                            </div>
                          </div>
                          <div className="overflow-y-scroll h-full pr-[0.25rem]">
                            {completedOrderData.map((data) => {
                              return (
                                <div
                                  key={data.id}
                                  className="bg-white h-[4rem] flex flex-row justify-between items-center mb-[0.5rem] rounded-[0.5rem]"
                                >
                                  <div className="w-[6%] py-[0.25rem] items-center text-center px-[0.5%]">
                                    <p className="text-[0.8rem]">#</p>
                                  </div>
                                  <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                    <p className="text-[0.8rem]">
                                      <DisplayDate timestamp={data.timeStamp} />
                                    </p>
                                  </div>
                                  <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                    <p className="text-black font-semibold text-[0.8rem]">
                                      {data.orderNumber}
                                    </p>
                                  </div>
                                  <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                    <p className="text-black font-semibold text-[0.8rem]">
                                      {data.erpNumber}
                                    </p>
                                  </div>
                                  <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                    <p className="text-black font-semibold truncate text-[0.8rem]">
                                      {data.userId}
                                    </p>
                                  </div>

                                  <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                                    <p className="text-black font-semibold truncate text-[0.8rem]">
                                      {data.prepressOwner}
                                    </p>
                                  </div>
                                  <div className="w-[14%] flex justify-center items-center text-center px-[0.5%]">
                                    <p className="text-black font-semibold truncate text-[0.8rem]">
                                      {data.status}
                                    </p>
                                  </div>
                                  <div className="w-[10%] flex justify-center items-center text-center px-[0.5%]">
                                    <button
                                      onClick={() =>
                                        handleMoveOrderInQueue(data)
                                      }
                                      className="bg-red-600 text-white py-[0.5rem] px-[0.5rem] rounded-md text-[0.8rem] font-bold"
                                    >
                                      {changeLang === "EN"
                                        ? langData[151] && langData[151][0]
                                        : changeLang === "TH"
                                        ? langData[151] && langData[151][1]
                                        : langData[151] && langData[151][2]}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mr-[1.5rem]">
                      <div className="w-full flex flex-row items-center justify-end">
                        <p className="text-[0.75rem] mr-[0.25rem]"></p>
                        <p className="text-[0.75rem] font-semibold mx-[0.1rem]"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[45%] h-full flex flex-col items-center">
                  <div className="w-full h-full px-[0.5rem] flex flex-col">
                    <div className="w-full h-[4rem] flex justify-center">
                      <div className="h-full flex items-center">
                        <p className="text-[1.25rem] font-semibold">
                          {changeLang === "EN"
                            ? langData[156] && langData[156][0]
                            : changeLang === "TH"
                            ? langData[156] && langData[156][1]
                            : langData[156] && langData[156][2]}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-full flex flex-col items-end">
                      <div className="w-full h-[60vh] mb-[0.5rem] py-[0.5rem] bg-[#F1F1F1] flex flex-col rounded-[0.5rem]">
                        <div className="w-full h-full pl-[1rem]  flex flex-col rounded-[0.5rem] pr-[0.25rem]">
                          <div className="h-[4rem] flex flex-row justify-between items-center mb-[0.5rem] pr-[1.25rem]">
                            <div className="w-[6%] py-[0.25rem] items-center text-center px-[0.5%]">
                              <p className="text-[0.8rem]">#</p>
                            </div>

                            <div className="w-[22%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[104] && langData[104][0]
                                  : changeLang === "TH"
                                  ? langData[104] && langData[104][1]
                                  : langData[104] && langData[104][2]}
                              </p>
                            </div>
                            <div className="w-[22%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[105] && langData[105][0]
                                  : changeLang === "TH"
                                  ? langData[105] && langData[105][1]
                                  : langData[105] && langData[105][2]}
                              </p>
                            </div>
                            <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[106] && langData[106][0]
                                  : changeLang === "TH"
                                  ? langData[106] && langData[106][1]
                                  : langData[106] && langData[106][2]}
                              </p>
                            </div>

                            <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[52] && langData[52][0]
                                  : changeLang === "TH"
                                  ? langData[52] && langData[52][1]
                                  : langData[52] && langData[52][2]}
                              </p>
                            </div>
                            <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                              <p className="text-black font-semibold text-[0.8rem]">
                                {changeLang === "EN"
                                  ? langData[54] && langData[54][0]
                                  : changeLang === "TH"
                                  ? langData[54] && langData[54][1]
                                  : langData[54] && langData[54][2]}
                              </p>
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
                                        className={`h-[4rem] flex flex-row justify-between items-center mb-[0.5rem] rounded-[0.5rem]
                                        ${
                                          selectOrderInQueue.id === data.id
                                            ? "bg-[#C8262D] text-white"
                                            : "bg-white text-black"
                                        }`}
                                      >
                                        <div className="w-[6%]  px-[0.5%] py-[0.25rem] flex justify-center items-center text-center">
                                          <p className="font-semibold text-[0.8rem]">
                                            {i + 1}
                                          </p>
                                        </div>

                                        <div className="w-[22%] flex justify-center items-center text-center px-[0.5%]">
                                          <p className="text-[0.8rem]">
                                            {data.orderNumber}
                                          </p>
                                        </div>
                                        <div className="w-[22%] flex justify-center items-center text-center px-[0.5%]">
                                          <p className="text-[0.8rem]">
                                            {data.erpNumber}
                                          </p>
                                        </div>
                                        <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                          <p className="truncate text-[0.8rem]">
                                            {isSales.map((el) => {
                                              if (data.userId === el.id) {
                                                return el.email;
                                              }
                                            })}
                                          </p>
                                        </div>
                                        <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                                          <p className="truncate text-[0.8rem]">
                                            {data.prepressOwner}
                                          </p>
                                        </div>
                                        <div className="w-[16%] flex justify-center text-center px-[0.5%]">
                                          <p className="truncate text-[0.8rem]">
                                            {data.status}
                                          </p>
                                        </div>
                                        {data.status === "readyToLayout" && (
                                          <div className="  h-full flex justify-center items-center text-center "></div>
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

                    <div className="flex flex-col mr-[1.5rem]">
                      <div className="w-full flex flex-row items-center justify-end">
                        <p className="text-[0.75rem] mr-[0.25rem]">
                          Jobs in Queue :{" "}
                        </p>
                        <p className="text-[0.75rem] font-semibold mx-[0.1rem]">
                          {inQueueOrders.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
