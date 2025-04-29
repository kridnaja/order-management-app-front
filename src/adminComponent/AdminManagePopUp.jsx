import { useState, useEffect } from "react";
import DisplayDate from "../component/DisplayDate";

export default function AdminManagePopUp({
  allOrders,
  selectManage,
  setSelectManage,
  isSales,
  isPrepress,
  selectSidebar,
  adminManageOrder,
  setManageInput,
  manageInput,
}) {
  console.log("selectManage", selectManage);

  const targetOrder = allOrders.find((data) => data.id == selectManage);

  const [isOpenStatusArray, setIsOpenStatusArray] = useState(false);

  const [isOpenPrepressOwner, setIsOpenPrepressOwner] = useState(false);

  const [isOpenPrepressToCheck, setIsOpenPrepressToCheck] = useState(false);

  const [isOpenPrepressToCheckLayout, setIsOpenPrepressToCheckLayout] =
    useState(false);

  const [isOpenAdminRemark, setIsOpenAdminRemark] = useState(false);

  const [input, setInput] = useState({
    status: targetOrder?.status,
    prepressOwner: targetOrder?.prepressOwner,
    prepressToCheck: targetOrder?.prepressToCheck,
    prepressToCheckLayout: targetOrder?.prepressToCheckLayout,
    adminRemark: targetOrder?.adminRemark,
  });

  const targetOrderOwner = isSales.find((data)=>data.id == targetOrder.userId)

  const targetArtworkOwner = isPrepress.find((data)=>data.email == input.prepressOwner)

  const targetArtworkChecker = isPrepress.find((data)=> data.email == input.prepressToCheck)

  const targetlayoutChecker = isPrepress.find((data)=> data.email == input.prepressToCheckLayout )

  const statusArray = [
    { id: 1, title: `newJob` },
    { id: 2, title: `holding` },
    { id: 3, title: `inQueue` },
    { id: 4, title: `working` },
    { id: 5, title: `rejected` },
    { id: 6, title: `waitForPrepressToCheck` },
    { id: 7, title: `checking` },
    { id: 8, title: `rejectedAfterChecked` },
    { id: 9, title: `waitToConfirm` },
    { id: 10, title: `revised` },
    { id: 11, title: `completed` },
    { id: 12, title: `urgentJob` },
    { id: 13, title: `readyToLayout` },
    { id: 14, title: `workingLayout` },
    { id: 15, title: `waitForPrepressToCheckLayout` },
    { id: 16, title: `checkingLayout` },
    { id: 17, title: `rejectedAfterCheckedLayout` },
    { id: 18, title: `completedAfterLayout` },
  ];
  //   newJob
  //   holding
  //   inQueue
  //   working
  //   rejected
  //   waitForPrepressToCheck
  //   checking
  //   rejectedAfterChecked
  //   waitToConfirm
  //   revised
  //   completed
  //   urgentJob

  //   readyToLayout

  //   workingLayout

  //   waitForPrepressToCheckLayout

  //   checkingLayout

  //   rejectedAfterCheckedLayout

  //   completedAfterLayout


  useEffect(()=>{
    const findIsNull = isPrepress.find((data)=>data.email == `null`)
    
    if(!findIsNull){

      isPrepress.push({ email:`null`})
    }
  },[])



  return (
    <div className="bg-gray-300 h-[97%] w-[95%] absolute rounded-lg border-[1px] shadow-2xl border-gray-600  p-6 bottom-2">
      <div className="flex justify-between items-center mb-4 ">
        <div className="text-lg font-semibold text-gray-700 flex gap-5">
          <div className="font-extrabold"> Order Management</div>

          {selectSidebar == 1 ? (
            <div className=" p-1 rounded-md  flex gap-5">
              <div>Remove it from the queue</div>
              <input
                onChange={() =>
                  setManageInput({ ...manageInput, queueInOrOut: "queueOut" })
                }
                className="w-[30px] h-[30px]"
                type="checkbox"
              />
            </div>
          ) : (
            <div className=" p-1 rounded-md  flex gap-5">
              <div> Add it to the queue</div>
              <input
                onChange={() =>
                  setManageInput({ ...manageInput, queueInOrOut: "queueIn" })
                }
                className="w-[30px] h-[30px]"
                type="checkbox"
              />
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setSelectManage(false);
          }}
          className=" text-xl px-1 py-1  rounded-full font-bold shadow-sm"
        >
          x
        </button>
      </div>
      <div className="grid grid-cols-4 text-[1.1rem] gap-4 h-[90%] overflow-y-auto">
        <div className="">
          <div className="font-bold ">Order Number</div>
          <div className="bg-white  py-[0.7rem] p-1 m-1 rounded-md flex justify-center items-center">
            {targetOrder.orderNumber || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold ">ERP Number</div>
          <div className="bg-white py-[0.7rem]   p-1 m-1 rounded-md flex justify-center">
            {targetOrder.erpNumber || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Quotation Number</div>
          <div className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center">
            {targetOrder.quotationNumber || "N/A"}
          </div>
        </div>

    
        <div>
          <div className="font-bold">Created At</div>
          <div className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center">
            <DisplayDate timestamp={targetOrder.createdAt} />
          </div>
        </div>
        <div>
          <div className="font-bold">Status Updated At</div>
          <div className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center">
            <DisplayDate timestamp={targetOrder.timeStamp} />
          </div>
        </div>

        <div>
          <div className="font-bold">Status</div>
          <div
            onClick={() => setIsOpenStatusArray(!isOpenStatusArray)}
            className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center cursor-pointer outline outline-[#C8262D]"
          >
            {input.status}
          </div>
          {isOpenStatusArray && (
            <div className="bg-gray-400  w-[22%] h-[30%] overflow-scroll absolute p-2">
              {statusArray.map((data, i) => {
                return (
                  <div
                    onClick={() => {
                      setIsOpenStatusArray(!isOpenStatusArray);
                      setManageInput({ ...manageInput, status: data.title });
                      setInput({ ...input, status: data.title });
                    }}
                    className="cursor-pointer  rounded-md pl-1 pr-1 text-white hover:bg-gray-100 hover:text-black "
                    key={i}
                  >
                    {data.title}{" "}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="font-bold">Order Owner</div>
          <div className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center cursor-pointer ">
     

              {
                targetOrderOwner.email && `[${targetOrderOwner.nickName}]-` + targetOrderOwner.email || "N/A"
              }
          </div>
        </div>
        <div>
          <div className="font-bold">Artwork Owner</div>
          <div
            onClick={() => setIsOpenPrepressOwner(!isOpenPrepressOwner)}
            className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center cursor-pointer outline outline-[#C8262D]"
          >
            { targetArtworkOwner?.email && `[${targetArtworkOwner.nickName}]-` + targetArtworkOwner.email || "N/A"}
          </div>
          {isOpenPrepressOwner && (
            <div className="bg-gray-400  w-[22%] h-[30%]  overflow-scroll absolute p-2">
              {isPrepress.map((data, i) => {

                return (
                  <div
                    onClick={() => {
                      setIsOpenPrepressOwner(!isOpenPrepressOwner);
                      setManageInput({
                        ...manageInput,
                        prepressOwner: data.email,
                      });
                      setInput({ ...input, prepressOwner: data.email });
                    }}
                    className="cursor-pointer  rounded-md pl-1 pr-1 text-white hover:bg-gray-100 hover:text-black "
                    key={i}
                  >
                    {data.email}{" "}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="font-bold">Artwork Checker</div>
          <div
            onClick={() => setIsOpenPrepressToCheck(!isOpenPrepressToCheck)}
            className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center cursor-pointer outline outline-[#C8262D]"
          >
            {targetArtworkChecker?.email && `[${targetArtworkChecker.nickName}]-` + targetArtworkChecker.email  || "N/A"}
          </div>
          {isOpenPrepressToCheck && (
            <div className="bg-gray-400  w-[22%] h-[30%] overflow-scroll absolute p-2">
              {isPrepress.map((data, i) => {
                return (
                  <div
                    onClick={() => {
                      setIsOpenPrepressToCheck(!isOpenPrepressToCheck);
                      setManageInput({
                        ...manageInput,
                        prepressToCheck: data.email,
                      });
                      setInput({ ...input, prepressToCheck: data.email });
                    }}
                    className="cursor-pointer  rounded-md pl-1 pr-1 text-white hover:bg-gray-100 hover:text-black "
                    key={i}
                  >
                    {data.email}{" "}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="font-bold">Layout Checker</div>
          <div
            onClick={() =>
              setIsOpenPrepressToCheckLayout(!isOpenPrepressToCheckLayout)
            }
            className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center cursor-pointer outline outline-[#C8262D]"
          >
            {targetlayoutChecker?.email && `[${targetlayoutChecker.nickName}]-` + targetlayoutChecker.email   || "N/A"}
          </div>
          {isOpenPrepressToCheckLayout && (
            <div className="bg-gray-400  w-[22%] h-[30%] overflow-scroll absolute p-2">
              {isPrepress.map((data, i) => {
                return (
                  <div
                    onClick={() => {
                      setIsOpenPrepressToCheckLayout(
                        !isOpenPrepressToCheckLayout
                      );
                      setManageInput({
                        ...manageInput,
                        prepressToCheckLayout: data.email,
                      });
                      setInput({ ...input, prepressToCheckLayout: data.email });
                    }}
                    className="cursor-pointer  rounded-md pl-1 pr-1 text-white hover:bg-gray-100 hover:text-black "
                    key={i}
                  >
                    {data.email}{" "}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="font-bold">Rejected Count</div>
          <div className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center">
            {targetOrder.rejectCount || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Revised Count</div>
          <div className="bg-white py-[0.7rem]  p-1 m-1 rounded-md flex justify-center">
            {targetOrder.reviseCount || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Rejected Remark</div>
          <div className="bg-white py-[1rem] h-[60%] overflow-y-auto  p-1 m-1 rounded-md flex justify-center">
            {targetOrder.rejectedRemark || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Revised Remark</div>
          <div className="bg-white  py-[1rem] h-[60%] overflow-y-auto p-1 m-1 rounded-md flex justify-center">
            {targetOrder.revisedRemark || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Checked Remark</div>
          <div className="bg-white  py-[1rem] h-[60%] overflow-y-auto p-1 m-1 rounded-md flex justify-center">
            {targetOrder.checkedRemark || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Layouted Rejected Remark</div>
          <div className="bg-white  py-[1rem] h-[60%] overflow-y-auto p-1 m-1 rounded-md flex justify-center">
            {targetOrder.layoutRejectedRemark || "N/A"}
          </div>
        </div>
        <div>
          <div className="font-bold">Admin Remark</div>

          <textarea
            onChange={(e) => {
              setManageInput({
                ...manageInput,
                adminRemark: e.target.value,
              });
              setInput({ ...input, adminRemark: e.target.value });
            }}
            className="bg-white w-full h-[75%]  py-[1rem] p-1 m-1 rounded-md flex justify-center outline outline-[#C8262D]"
            value={input.adminRemark ?? ""}
            placeholder="N/A" 
            type="text"
          />
        </div>

        <div className="flex gap-5 m-1 absolute bottom-[5%] right-[5%]">
          <button
            onClick={() =>{ 
              adminManageOrder()
              window.location = '/adminWorkPage'
            } }
            className="bg-[#C8262D] text-white rounded-md p-1  hover:outline outline-black"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setSelectManage(false);
            }}
            className="rounded-md  p-1 hover:outline outline-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
