import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import DisplayDate from "../component/DisplayDate";
import AdminToolPopUp from "./AdminToolPopUp";
import AdminManagePopUp from "./AdminManagePopUp";

export default function AdminNavData({
  isSales,
  isPrepress,
  display,
  title,
  navDataIndex,
  allOrders,
  selectSidebar,

  setSelectToolMore,
  selectToolMore,

  setSelectDetail,
  selectDetail,

  setSelectManage,
  selectManage,

  adminTriggerQueueStatus,
  adminManageOrder,
  setManageInput,
  manageInput
}) {


  const isQueueActive = display.find((order)=> order.isActive == true)

  return (
    <div key={navDataIndex} className="w-[100%] h-full flex flex-col items-center">
      <div className="w-[100%] h-full flex flex-col">
        <div className="w-full h-[4rem] flex justify-center">
          <div className="h-full flex items-center gap-5">
            <div className="text-[1.25rem] font-semibold">
              {title} : {display?.length} 
            </div>
            {
              selectSidebar == 1 &&
               <div className="flex gap-5 text-[1.25rem] font-semibold"> 
                <div className="flex items-center">QUEUE STATUS :</div>
                  <button 
                  onClick={(e)=>{
                    window.location = '/adminWorkPage'
                    adminTriggerQueueStatus(e.target.value)}}
                  value={isQueueActive ? true : false}
                  className="bg-red-600 p-2 text-white rounded-md">    {isQueueActive ? 'ACTIVATED' : 'INACTIVATED'}</button>
              </div>
            }
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-end">
          <div className="w-full h-[60vh] mb-[0.5rem] py-[1rem] bg-[#F1F1F1] flex flex-col rounded-[0.5rem]">
            <div className="w-full h-full pl-[1rem]  flex flex-col rounded-[0.5rem] pr-[0.25rem]">
              <div className="flex flex-row justify-between items-center mb-[1rem] pr-[1.25rem]">
                <div className="w-[6%] py-[0.25rem] items-center text-center px-[0.5%]">
                  <div className="">#</div>
                </div>
                <div className="w-[8%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">
                    Date mm/dd/yyyy
                  </div>
                </div>
                <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">Order NO.</div>
                </div>
                <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">ERP NO.</div>
                </div>
                <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">Order Owner</div>
                </div>

                <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">Artwork Owner</div>
                </div>
                <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">
                    Artwork Checker
                  </div>
                </div>
                <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">Layout Checker</div>
                </div>
                <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black font-semibold">Status</div>
                </div>
                <div className="w-[6%] flex justify-center items-center text-center px-[0.5%]">
                  <div className="text-black"></div>
                </div>
              </div>
              <div className="overflow-y-scroll h-full pr-[0.25rem]">
                {display.map((displayData, i) => {
           
                  const upfatedTimeStamp = allOrders.find((data)=> data.id == displayData.orderId)


                  let targetOrder = allOrders.find((el) => el.id === displayData.orderId)

                  let targetSalesForOrderInQueue = isSales.find((el) => el.id ==  targetOrder?.userId)

                  let targetSalesForOrderOutQueue =  isSales.find((el) => el.id ==  displayData?.userId)


         
                  let targetArtworkOwnerInQueue = isPrepress.find((data)=> data.email == targetOrder?.prepressOwner )

                  let targetArtworkCheckerInQueue = isPrepress.find((data)=> data.email == targetOrder?.prepressToCheck )

                  let targetLayoutCheckerInQueue = isPrepress.find((data)=> data.email == targetOrder?.prepressToCheckLayout )


                  let targetArtworkOwnerOutQueue = isPrepress.find((data)=> data.email ==  displayData?.prepressOwner)

                  let targetArtworkCheckerOutQueue = isPrepress.find((data)=> data.email == displayData?.prepressToCheck )

                  let targetLayoutCheckerOutQueue = isPrepress.find((data)=> data.email == displayData?.prepressToCheckLayout)

                  return (
                    <div className=" " key={i}>
                      <div
                        className={`h-[4rem] flex flex-row justify-between items-center mb-[0.5rem] rounded-[0.5rem] bg-white
                     `}
                      >
                        <div className="w-[6%]  px-[0.5%] py-[0.25rem] flex justify-center items-center text-center">
                          <div className="font-semibold">{i + 1}</div>
                        </div>
                        <div className="w-[8%] flex justify-center items-center text-center px-[0.5%]">
                          <DisplayDate
                            timestamp={selectSidebar == 1 ? upfatedTimeStamp?.timeStamp : displayData.timeStamp}
                          />
                        </div>
                        <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                          <div className="">
                            {selectSidebar == 1 
                              ? allOrders.map((el, index) => {
                                  return (
                                    <div key={index}>
                                      {el.id == displayData.orderId && el.orderNumber}{" "}
                                    </div>
                                  );
                                })
                              : displayData.orderNumber}
                          </div>
                        </div>
                        <div className="w-[16%] flex justify-center items-center text-center px-[0.5%]">
                          <div className="">
                            {selectSidebar == 1 
                              ? allOrders.map((el, index) => {
                                  return (
                                    <div key={index}>
                                      {el.id == displayData?.orderId && el.erpNumber}{" "}
                                    </div>
                                  );
                                })
                              : displayData?.erpNumber}
                          </div>
                        </div>
                        <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                          <div className="truncate">
                            {selectSidebar == 1  ? targetSalesForOrderInQueue?.nickName : targetSalesForOrderOutQueue?.nickName}
                          </div>
                        </div>
                        <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                          <div className="truncate">
                            {selectSidebar == 1 
                              ? targetArtworkOwnerInQueue?.nickName|| 'N/A'
                              : targetArtworkOwnerOutQueue?.nickName || 'N/A'}
                          </div>
                        </div>
                        <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                          <div className="truncate">
                            {selectSidebar == 1 
                              ? targetArtworkCheckerInQueue?.nickName || 'N/A'
                              : targetArtworkCheckerOutQueue?.nickName|| 'N/A'}
                          </div>
                        </div>
                        <div className="w-[12%] flex justify-center items-center text-center px-[0.5%]">
                          <div className="truncate">
                            {selectSidebar == 1 
                              ? targetLayoutCheckerInQueue?.nickName || 'N/A'
                              : targetLayoutCheckerOutQueue?.nickName  || 'N/A'}
                          </div>
                        </div>
                        <div className="w-[12%] flex justify-center text-center px-[0.5%]">
                          <div className="truncate">
                            {selectSidebar == 1  ? targetOrder?.status : displayData?.status}
                          </div>
                        </div>
                        <div className=" w-[6%] h-full flex justify-center items-center text-center px-[0.5%]">
                          <button
                            onClick={() => {
                              if( selectSidebar == 1 ){

                                setSelectToolMore(displayData.orderId)
                                return
                              }
                              setSelectToolMore(displayData.id)
                            }}
                            className="px-[0.5rem] flex items-center justify-center"
                          >
                            <IoIosMore className="text-2xl cursor-pointer " />
                          </button>
                          {selectToolMore == (selectSidebar == 1 ? displayData.orderId : displayData.id) && (
                            <button className="flex flex-row items-center  -translate-x-24 h-[90%] text-white gap-1 bg-gray-300 rounded-md  ">
                              <div
                                onClick={() =>{
                                  if(selectSidebar == 1) {
                                    setSelectDetail(displayData.orderId)
                                    return
                                  }
                                  setSelectDetail(displayData.id)
                                }
                                }
                                className="w-[100%] h-[90%] px-2 py-2 bg-[#C8262D] "
                              >
                                Details
                              </div>
                   {  !isQueueActive &&  <div 
                              onClick={()=>{
                                if(selectSidebar == 1) {
                                  setManageInput({...manageInput, orderId : displayData.orderId})
                                  setSelectManage(displayData.orderId)
                                  return
                                }
                                setManageInput({...manageInput, orderId : displayData.id})
                                setSelectManage(displayData.id)
                              }}
                              className="w-[100%] h-[90%] px-2 py-2  bg-[#C8262D] ">
                                Manage
                              </div>}
                              <div
                              onClick={()=>setSelectToolMore(false)}
                                className="w-[100%] h-[90%] px-2  py-2 bg-[#C8262D] "
                              >
                                Close
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                 
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
                {selectDetail  && 
                  <AdminToolPopUp  allOrders={allOrders} selectDetail={selectDetail} isPrepress={isPrepress} isSales={isSales} setSelectDetail={setSelectDetail}/>
                }
                {selectManage &&
                  <AdminManagePopUp manageInput={manageInput} setManageInput={setManageInput} adminManageOrder={adminManageOrder} allOrders={allOrders} selectSidebar={selectSidebar} selectManage={selectManage} setSelectManage={setSelectManage} isSales={isSales} isPrepress={isPrepress}/>
                }

    </div>
  );
}
