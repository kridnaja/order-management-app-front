import DisplayDate from "../component/DisplayDate";

export default function AdminToolPopUp({

  allOrders,
  selectDetail,
  setSelectDetail,
  isPrepress,
  isSales,
}) {

  const targetOrder = allOrders.find((data)=> data.id == selectDetail)

  const targetArtworkOwner = isPrepress.find((data) =>data.email == targetOrder.prepressOwner)

  const targetOrderOwner =  isSales.find((data)=>data.id == targetOrder.userId)

  const targetArtworkChecker = isPrepress.find((data)=> data.email == targetOrder.prepressToCheck)

  const targetLayoutChecker = isPrepress.find((data) =>data.email == targetOrder.prepressToCheckLayout )

  return (
    <div className="bg-gray-300  h-[60%] w-[95%] absolute rounded-lg border-[3px] border-gray-600 shadow-lg p-6 bottom-2">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-lg font-semibold text-gray-700">Order Details</h2>
        <button
          onClick={() => {
            setSelectDetail(false)
          }}
          className=" text-xl px-1 py-1  rounded-full font-bold shadow-sm"
        >
          x
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 h-[90%] overflow-y-auto">
       
    
        <div className="">
          <div className="font-bold">Order Number</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.orderNumber || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">ERP Number</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.erpNumber || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Quotation Number</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.quotationNumber || 'N/A'}</div>
        </div>
 
        <div>
          <div className="font-bold">Created At</div>
          <div className="bg-white p-1 rounded-md flex justify-center"><DisplayDate timestamp={targetOrder.createdAt}/></div>
        </div>
        <div>
          <div className="font-bold">Status Updated At</div>
          <div className="bg-white p-1 rounded-md flex justify-center"><DisplayDate timestamp={targetOrder.timeStamp }/></div>
        </div>
        <div>
          <div className="font-bold">Status</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.status || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Order Owner</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{ targetOrderOwner?.email  && `[${targetOrderOwner?.nickName}]-` + targetOrderOwner?.email || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Artwork Owner</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{ targetArtworkOwner?.email &&`[${targetArtworkOwner?.nickName}]-` + targetArtworkOwner?.email  || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Artwork Checker</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{  targetArtworkChecker?.email  && `[${targetArtworkChecker?.nickName}]-` + targetArtworkChecker?.email  || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Layout Checker</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{ targetLayoutChecker?.email  && `[${targetLayoutChecker?.nickName}]-` + targetLayoutChecker?.email    || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Rejected Count</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.rejectCount || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Revised Count</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.reviseCount || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Rejected Remark</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.rejectedRemark || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Revised Remark</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.revisedRemark || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Checked Remark</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.checkedRemark || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Layouted Rejected Remark</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.layoutRejectedRemark || 'N/A'}</div>
        </div>
        <div>
          <div className="font-bold">Admin Remark</div>
          <div className="bg-white p-1 rounded-md flex justify-center">{targetOrder.adminRemark || 'N/A'}</div>
        </div>
    
      </div>
    </div>
  );
}
