import { useAuth } from "../hooks/use-auth";
import { getAccessToken } from "../utils/local-storage";

import axios from "../config/axios";
import { useEffect, useState } from "react";

import EvaLoading from "../component/EvaLoading";

import AdminNavData from "../adminComponent/AdminNavData";

export default function AdminWorkPage() {
  const [allOrders, setAllOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [isSales, setIsSales] = useState([]);
  const [isPrepress, setIsPrepress] = useState([]);
  const [selectSidebar, setSelectSidebar] = useState(1);

  const [inQueueOrders, setInQueueOrders] = useState([]);

  const [displayNewJobStatus, setDisplayNewJobStatus] = useState([]);

  const [displayHoldingStatus, setDisplayHoldingStatus] = useState([]);

  const [displayRejectedByPrepressStatus, setDisplayRejectedByPrepressStatus] =
    useState([]);

  const [displayWorkingStatus, setDisplayWorkingStatus] = useState([]);

  const [displayWaitToConfirmStatus, setDisplayWaitToConfirmStatus] = useState(
    []
  );

  const [displayCompletedArtwork, setDisplayCompletedArtwork] = useState([]);
  const [displayCompeletedLayoutWork, setDisplayCompletedLayoutWork] = useState(
    []
  );
  const [selectToolMore, setSelectToolMore] = useState(null);

  const [selectDetail, setSelectDetail] = useState(false)

  const [selectManage, setSelectManage] = useState(false)

  const [manageInput, setManageInput] = useState({
    
  })

  const { logout, authUser } = useAuth();
  if (!getAccessToken()) {
    window.location.href = "/";
  }

  const sideBar = [
    { id: 1, title: "Overview", display: inQueueOrders },
    { id: 2, title: "New Jobs", display: displayNewJobStatus },
    { id: 3, title: "Sales Holding", display: displayHoldingStatus },
    {
      id: 4,
      title: "Rejected By Prepress",
      display: displayRejectedByPrepressStatus,
    },
    { id: 5, title: "On Working", display: displayWorkingStatus },
    {
      id: 6,
      title: "Pending Confirmation",
      display: displayWaitToConfirmStatus,
    },
    { id: 7, title: "Completed Artwork", display: displayCompletedArtwork },
    {
      id: 8,
      title: "Completed Layoutwork",
      display: displayCompeletedLayoutWork,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    axios.get("/admin/readAllOrders").then((res) => {
      setAllOrders(res.data);
    });

    axios.get("/admin/readAllSales").then((res) => {
      setIsSales(res.data);
    });
    axios.get("/admin/readInQueueOrders").then((res) => {
      setInQueueOrders(res.data);
    });
    axios
      .get("/admin/readNewJobStatusOrders")
      .then((res) => setDisplayNewJobStatus(res.data));

    // axios
    //   .get("/admin/readHoldingJobStatusOrder")
    //   .then((res) => setDisplayHoldingStatus(res.data));

    // axios
    //   .get("/admin/readRejectedByPrepressStatusOrder")
    //   .then((res) => setDisplayRejectedByPrepressStatus(res.data));

    axios
      .get("/admin/readWorkingStatusOrders")
      .then((res) => setDisplayWorkingStatus(res.data));

    // axios
    //   .get("/admin/readWaitToConfirmStatusOrder")
    //   .then((res) => setDisplayWaitToConfirmStatus(res.data));

    axios.get("/sales/readAllPrepress").then((res) => setIsPrepress(res.data));

    axios
      .get("/admin/readAllCompletedOrders")
      .then((res) => setDisplayCompletedArtwork(res.data));
    axios
      .get("/admin/readAllCompletedLayoutOrders")
      .then((res) => setDisplayCompletedLayoutWork(res.data));
  }, [loading]);


  const adminTriggerQueueStatus = async (input) => {
    setLoading(true)
    console.log(input)
   await axios.post('/admin/adminTriggerQueueStatus', {isActive : input} ).finally(()=>{

      setTimeout(()=>{
        setLoading(false)
      },500)
    })
  }

  const adminManageOrder = async () => {
    await axios.post('/admin/adminManageOrder', {manageInput , authUser} )
  }


  return (
    <div>
      {loading ? (
        <EvaLoading />
      ) : (
        <div className="">
                               <div className="w-[85%]  grid grid-cols-4 block xl:hidden ">
                        {sideBar.map((data) => {
                          return (
                            <button
                              onClick={() => setSelectSidebar(data.id)}
                              key={data.id}
                              className={`w-full h-[4rem] flex justify-between pr-5 items-center border-2 pl-5 ${
                                selectSidebar === data.id &&
                                "bg-white text-red-500 "
                              }`}
                            >
                              <p className="text-[1.05rem] font-bold text-left">
                                {data.title}
                              </p>
                              {data.id === 1 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {inQueueOrders.length}
                                </div>
                              )}
                              {data.id === 2 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayNewJobStatus.length}
                                </div>
                              )}
                              {data.id === 3 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayHoldingStatus.length}
                                </div>
                              )}
                              {data.id === 4 && (
                                <div className="flex justify-center font-extrabold text-red-500 text-center left-0">
                                  {displayRejectedByPrepressStatus.length}
                                </div>
                              )}
                              {data.id === 5 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayWorkingStatus.length}
                                </div>
                              )}
                              {data.id === 6 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayWaitToConfirmStatus.length}
                                </div>
                              )}
                              {data.id === 7 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayCompletedArtwork.length}
                                </div>
                              )}
                              {data.id === 8 && (
                                <div className="flex justify-center font-extrabold text-red-500 text-center left-0">
                                  {displayCompeletedLayoutWork.length}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
          <div className="h-screen w-screen flex flex-col justify-center items-center desktop:flex-row">
            <div className="bg-[#F1F1F1]  w-[15vw] h-screen hidden flex-col justify-between absolute left-0 desktop:flex">
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
                <div className="w-full flex flex-col items-center  cursor-pointer  justify-between overflow-auto ">
                  <div className="w-full flex flex-row justify-between">
                    <div className="w-[100%]  flex justify-center">
                      <div className="w-[100%] ">
                        {sideBar.map((data) => {
                          return (
                            <button
                              onClick={() => setSelectSidebar(data.id)}
                              key={data.id}
                              className={`w-full h-[4rem] flex justify-between pr-5 items-center pl-5 ${
                                selectSidebar === data.id &&
                                "bg-white text-red-500 "
                              }`}
                            >
                              <p className="text-[1.05rem] font-bold text-left">
                                {data.title}
                              </p>
                              {data.id === 1 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {inQueueOrders.length}
                                </div>
                              )}
                              {data.id === 2 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayNewJobStatus.length}
                                </div>
                              )}
                              {data.id === 3 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayHoldingStatus.length}
                                </div>
                              )}
                              {data.id === 4 && (
                                <div className="flex justify-center font-extrabold text-red-500 text-center left-0">
                                  {displayRejectedByPrepressStatus.length}
                                </div>
                              )}
                              {data.id === 5 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayWorkingStatus.length}
                                </div>
                              )}
                              {data.id === 6 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayWaitToConfirmStatus.length}
                                </div>
                              )}
                              {data.id === 7 && (
                                <div className="flex justify-center  font-extrabold text-red-500 text-center left-0">
                                  {displayCompletedArtwork.length}
                                </div>
                              )}
                              {data.id === 8 && (
                                <div className="flex justify-center font-extrabold text-red-500 text-center left-0">
                                  {displayCompeletedLayoutWork.length}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[3rem] w-[15vw] z-20 bg-[#C8262D] flex justify-center items-center">
                <p className="text-white text-[0.8rem] font-semibold text-center">
                  Created by AD MEWorx.
                </p>
              </div>
            </div>

            <div className="w-[100vw] h-screen flex flex-col px-[2rem] bg-white right-0 relative desktop:w-[85vw] desktop:absolute">
              <div className="w-full h-[6rem] flex justify-between">
                <div className="h-full flex items-center gap-5">
                  <p className="text-[1.75rem] font-semibold">Welcome Admin</p>
                {/* <button 
                onClick={()=> window.location = '/adminWorkPage'}
                className=" flex items-center bg-[#C8262D] text-white p-1 rounded-md">REFRESH</button> */}
                </div>
                <div className=" h-full flex flex-row items-center">
                  <button
                    className=" p-[0.5rem] ml-[0.75rem] text-[1.1rem] font-semibold hover:text-[#C8262D]"
                    onClick={handleLogout}
                  >
                    {" "}
                    logout
                  </button>
                </div>
              </div>

              <div className=" flex flex-col w-[100%]">
                {sideBar?.map((data, navDataIndex) => {
                  return (
                    selectSidebar === data.id && (
                      <div key={navDataIndex}>
                        <AdminNavData
                        selectSidebar={selectSidebar}
                        allOrders={allOrders}
                          navDataIndex={navDataIndex}
                          title={data.title}
                          display={data.display}
                          isPrepress={isPrepress}
                          isSales={isSales}

                          setSelectToolMore={setSelectToolMore}
                          selectToolMore={selectToolMore}

                          setSelectDetail={setSelectDetail}
                          selectDetail={selectDetail}

                          selectManage={selectManage}
                          setSelectManage={setSelectManage}

                          adminTriggerQueueStatus={adminTriggerQueueStatus}
                          adminManageOrder={adminManageOrder}
                          setManageInput={setManageInput}
                          manageInput={manageInput}
                        />
                       

                          
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
