import appLogo from "../assets/img/logo.svg";

import rollinside from "../assets/img/rollinside.svg";
import rolloutside from "../assets/img/rolloutside.svg";

import roll_startout from "../assets/img/subroll/roll_startout.svg";
import roll_endout from "../assets/img/subroll/roll_endout.svg";
import roll_leftout from "../assets/img/subroll/roll_leftout.svg";
import roll_rightout from "../assets/img/subroll/roll_rightout.svg";
import roll_frontbackleftout from "../assets/img/subroll/roll_frontbackleftout.svg";
import roll_frontbackrightout from "../assets/img/subroll/roll_frontbackrightout.svg";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import axios from "../config/axios";
export default function EditOrderPrintPage({ targetOrderIdToEdit }) {
  const { salesEditOrder } = useAuth();
  const [renderPrintBtn, setRenderPrintBtn] = useState(false);

  const [selectTypeOfRoll, setSelectTypeOfRoll] = useState(false);

  const handleEditOrder = () => {
    salesEditOrder(input);
  };

  //   const handleCreateOrder = () => {
  //     // salesCreateOrder(input);
  //   };
  const [input, setInput] = useState({
    orderNumber: "",
    quotationNumber: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `/sales/readSelectedOrderToEdit?orderId=${targetOrderIdToEdit}`
        );
        const data = response.data;
        setInput({
          id: data.id,
          orderId: data.orderId,
          orderNumber: data.orderNumber || null,
          quotationNumber: data.quotationNumber || null,
          customerName: data.customerName || null,
          productCode: data.productCode || null,
          jobName: data.jobName || null,
          salesManager: data.salesManager || null,
          contact: data.contact || null,
          c: data.c || null,
          telephoneNumber: data.telephoneNumber || null,
          email: data.email || null,
          typeOfPrinterMachine: data.typeOfPrinterMachine || null,
          typeOfColor: data.typeOfColor || null,
          cmykEtc: data.cmykEtc || null,
          cyan: data.cyan || null,
          magenta: data.magenta || null,
          yellow: data.yellow || null,
          black: data.black || null,
          white: data.white || null,
          pantone1: data.pantone1 || null,
          pantone2: data.pantone2 || null,
          pantone3: data.pantone3 || null,
          pantone4: data.pantone4 || null,
          subPantone1: data.subPantone1 || null,
          subPantone2: data.subPantone2 || null,
          subPantone3: data.subPantone3 || null,
          subPantone4: data.subPantone4 || null,
          set: data.set || null,
          pcs: data.pcs || null,
          typeOfFormat: data.typeOfFormat || null,
          digitalProof: data.digitalProof || null,
          typeOfFormatErp: data.typeOfFormatErp || null,
          subTypeOfFormatErp: data.subTypeOfFormatErp || null,
          spotUv: data.spotUv || null,
          removeGlue: data.removeGlue || null,
          leaveCoatingUv: data.leaveCoatingUv || null,
          pumpHoleEyeAndVine: data.pumpHoleEyeAndVine || null,
          additionalEtc: data.additionalEtc || null,
          subAdditionalEtc: data.subAdditionalEtc || null,
          outsourceType: data.outsourceType || null,
          typeOfCoated: data.typeOfCoated || null,
          subCoatedEtc: data.subCoatedEtc || null,
          typeOfUv: data.typeOfUv || null,
          coldFoil: data.coldFoil || null,
          subColdFoilEtc: data.subColdFoilEtc || null,
          materialSticker: data.materialSticker || null,
          materialFSC: data.materialFSC || null,
          unitSizeFrontY: data.unitSizeFrontY || null,
          unitSizeFrontX: data.unitSizeFrontX || null,
          unitSizeBlackY: data.unitSizeBlackY || null,
          unitSizeBlackX: data.unitSizeBlackX || null,
          typeOfCorner: data.typeOfCorner || null,
          subUpperCorner: data.subUpperCorner || null,
          typeOfPacking: data.typeOfPacking || null,
          subSheet: data.subSheet || null,
          subRoll: data.subRoll || null,
          space: data.space || null,
          typeOfCore: data.typeOfCore || null,
          purchaseOrderQty: data.purchaseOrderQty || null,
          typeOfRoll: data.typeOfRoll || null,
          subOuterRoll: data.subOuterRoll || null,
          insideRollRemark: data.insideRollRemark || null,
          remark: data.remark || null,
          erp: data.erp || null,
          confirm: data.confirm || null,
          rev: data.rev || null,
          salesCoName: data.salesCoName || null,
          salesCoDate: data.salesCoDate || null,
          salesCoTime: data.salesCoTime || null,
          salesCoMgr: data.salesCoMgr || null,
          salesCoMgrDate: data.salesCoMgrDate || null,
          salesCoMgrTime: data.salesCoMgrTime || null,
          prepressName: data.prepressName || null,
          prepressDate: data.prepressDate || null,
          prepressTime: data.prepressTime || null,
          prepressNameCheckedBy: data.prepressName || null,
          prepressDateCheckedBy: data.prepressDate || null,
          prepressTimeCheckedBy: data.prepressTime || null,
          prepressRemark: data.prepressRemark || null,
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    getData();
  }, [targetOrderIdToEdit]);

  const handleOnchange = (e) => {
    if (input.typeOfPrinterMachine === e.target.value) {
      return setInput({ ...input, typeOfPrinterMachine: null });
    }
    if (input.typeOfColor === e.target.value) {
      return setInput({ ...input, typeOfColor: null });
    }
    if (input.typeOfFormat === e.target.value) {
      return setInput({ ...input, typeOfFormat: null });
    }
    if (input.outsourceType === e.target.value) {
      return setInput({ ...input, outsourceType: null });
    }
    if (input.typeOfCoated === e.target.value) {
      return setInput({ ...input, typeOfCoated: null });
    }
    if (input.typeOfUv === e.target.value) {
      return setInput({ ...input, typeOfUv: null });
    }
    if (input.coldFoil === e.target.value) {
      return setInput({ ...input, coldFoil: null });
    }
    if (input.typeOfCorner === e.target.value) {
      return setInput({ ...input, typeOfCorner: null });
    }
    if (input.typeOfPacking === e.target.value) {
      return setInput({ ...input, typeOfPacking: null });
    }
    if (input.typeOfCore === e.target.value) {
      return setInput({ ...input, typeOfCore: null });
    }
    if (input.typeOfRoll === e.target.value) {
      return setInput({ ...input, typeOfRoll: null });
    }
    if (input.subOuterRoll === e.target.value) {
      return setInput({ ...input, subOuterRoll: null });
    }

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="absolute  z-30 w-full flex justify-center items-start bg-white">
      <div className="w-[794px] h-[1123px] bg-white flex items-center justify-center flex-col">
        <div className="w-[754px] h-[1083px] flex items-center justify-start flex-col">
          <div className="w-full h-[6rem] bg-gray-500 flex flex-row justify-between">
            <div className="h-full flex flex-row">
              <div className="h-full w-[8rem] flex justify-center items-center">
                <img
                  className="w-[6rem] h-[6rem] object-scale-down brightness-[0] invert"
                  src={appLogo}
                />
              </div>
              <div className=" flex justify-center items-center">
                <p className="text-[2rem] font-bold text-[#ffff]">
                  NEW PRODUCT
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="flex flex-col justify-center">
                <div className="h-[1.7rem] px-[0.5rem] py-[0.025rem] bg-[#ffff] border-[#C2C2C2] border-[0.1rem] rounded-[0.5rem] flex flex-row justify-center items-center m-[0.25rem]">
                  <p className="mr-[0.25rem] text-[0.8rem]">Order No.</p>
                  {/* <input
                    onChange={handleOnchange}
                    name="orderNumber"
                    type="text"
                    value={input.orderNumber}
                    className="w-[9rem] h-[1.25rem] bg-[#ffff] font-bold text-[0.9rem]"
                    maxLength="17"
                  /> */}
                  <div className="w-[9rem] h-[1.25rem] bg-[#ffff] font-bold text-[0.9rem]">
                    {input.orderNumber}
                  </div>
                </div>
                <div className="h-[1.7rem] px-[0.5rem] py-[0.025rem] bg-[#ffff] border-[#C2C2C2] border-[0.1rem] rounded-[0.5rem] flex flex-row justify-between items-center m-[0.25rem]">
                  <p className="mr-[0.25rem] text-[0.8rem]">Quo.</p>
                  <input
                    onChange={handleOnchange}
                    name="quotationNumber"
                    type="text"
                    value={input.quotationNumber}
                    className="w-[9rem] h-[1.25rem] bg-[#ffff] font-bold text-[0.9rem]"
                  />
                  {/* <div className="w-[9rem] h-[1.25rem] bg-[#ffff] font-bold text-[0.9rem]">
                    {input.quotationNumber}
                  </div> */}
                </div>
              </div>
              <div className="w-[4rem] h-[4rem] bg-white flex justify-center items-center mx-[0.5rem]">
                {input.orderNumber && (
                  <img
                    className="w-[3.5rem] h-[3.5rem] object-scale-down"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://192.168.0.169:8888/sales/addOrderInQueue?orderNumber=${input.orderNumber}`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full bg-white flex flex-col justify-end">
            <div className=" flex flex-row justify-end items-center h-[1.9rem]">
              <div className="mr-[0.5rem]">
                <p className="font-semibold">ลูกค้า</p>
              </div>
              <div className="flex items-center">
                <input
                  name="customerName"
                  onChange={handleOnchange}
                  type="text"
                  value={input.orderNumber.slice(0,3)}
                  className="w-[5rem] h-[1.75rem] m-[0.25rem] border-[#000] border-[0.1rem] text-center font-semibold text-[1.5rem]"
                  maxLength="3"
                />
                {/* <div className="w-[5rem] h-[1.75rem] m-[0.25rem] border-[#000] border-[0.1rem] text-center font-semibold text-[1.5rem]">
                  {input.customerName}
                </div> */}
                {/* <input
               name="customerName"
                    onChange={handleOnchange}
                type="text"
                className="w-[1.5rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] text-center font-semibold text-[1.5rem]"
                maxLength="1"
              />
              <input
               name="customerName"
                type="text"
                onChange={handleOnchange}
                className="w-[1.5rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] text-center font-semibold text-[1.5rem]"
                maxLength="1"
              /> */}
              </div>
            </div>
            <div className="flex flex-row justify-between h-[1.9rem]">
              <div className="flex flex-row items-center">
                <p className="text-[0.7rem] font-semibold mr-[0.25rem]">
                  เลขที่ใบสั่งซื้อ
                </p>
                <input
                  defaultValue={input.quotationNumber}
                  type="text"
                  className="w-[7.5rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] indent-[0.2rem] text-[0.7rem] font-bold"
                />
                {/* <div className="w-[7rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] indent-[0.25rem] text-[0.7rem]">
                  {input.quotationNumber}
                </div> */}
              </div>
              <div className="flex flex-row items-center">
                <p className="text-[0.7rem] font-semibold mr-[0.25rem]">
                  รหัสสินค้า
                </p>
                <input
                  name="productCode"
                  onChange={handleOnchange}
                  type="text"
                  value={input.productCode}
                  className="w-[7.5rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] indent-[0.2rem] text-[0.7rem] font-bold"
                />
                {/* <div className="w-[7rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] indent-[0.25rem] text-[0.7rem]">
                  {input.productCode}
                </div> */}
              </div>
              <div className="flex flex-row items-center">
                <p className="text-[0.7rem] font-semibold mr-[0.25rem]">
                  ชื่องาน
                </p>
                <input
                  name="jobName"
                  value={input.jobName}
                  onChange={handleOnchange}
                  type="text"
                  className="w-[20rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] indent-[0.25rem] text-[0.7rem] font-bold"
                />
                {/* <div className="w-[21rem] h-[1.5rem] m-[0.25rem] border-[#000] border-[0.1rem] indent-[0.25rem] text-[0.7rem]">
                  {input.jobName}
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="h-[1.7rem] flex flex-row justify-between items-center">
              <div className="flex flex-row items-end">
                <p className="text-[0.8rem] font-semibold mr-[0.5rem]">
                  ตัวแทนฝ่ายขาย
                </p>
                <input
                  name="salesManager"
                  value={input.salesManager}
                  onChange={handleOnchange}
                  type="text"
                  className="w-[9rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.1rem] font-bold"
                />
                {/* <div className="w-[9rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem]">
                  {input.salesManager}
                </div> */}
              </div>
              <div className="flex flex-row items-end">
                <p className="text-[0.8rem] font-semibold mr-[0.5rem]">
                  ติดต่อกับ
                </p>
                <input
                  name="contact"
                  value={input.contact}
                  onChange={handleOnchange}
                  type="text"
                  className="w-[12rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.1rem] font-bold"
                />
                {/* <div className="w-[12rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem]">
                  {input.contact}
                </div> */}
              </div>
              <div className="flex flex-row items-end">
                <p className="text-[0.8rem] font-semibold mr-[0.5rem]">C .</p>
                <input
                  name="c"
                  value={input.c}
                  onChange={handleOnchange}
                  type="text"
                  className="w-[12rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.1rem] font-bold"
                />
                {/* <div className="w-[12rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem]">
                  {input.c}
                </div> */}
              </div>
            </div>
            <div className="h-[1.7rem] flex flex-row justify-between">
              <div className="flex flex-row items-end">
                <p className="text-[0.8rem] font-semibold mr-[0.5rem]">Tel.</p>
                <input
                  name="telephoneNumber"
                  value={input.telephoneNumber}
                  onChange={handleOnchange}
                  type="text"
                  className="w-[13rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.1rem] font-bold"
                />
                {/* <div className="w-[13rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem]">
                  {input.telephoneNumber}
                </div> */}
              </div>
              <div className="flex flex-row items-end">
                <p className="text-[0.8rem] font-semibold mr-[0.5rem]">
                  Email :
                </p>
                <input
                  name="email"
                  value={input.email}
                  onChange={handleOnchange}
                  type="text"
                  className="w-[26rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.1rem] font-bold"
                />
                {/* <div className="w-[26rem] h-[1.2rem] m-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem]">
                  {input.email}
                </div> */}
              </div>
            </div>
          </div>


          <div className="w-full h-[10rem] bg-white flex flex-row  border-b-[0.1rem] border-black">
            <div className="h-full w-[100%] flex flex-col border-l-[0.1rem] border-black">
              <div className="flex flex-row border-b-[0.1rem] border-black justify-between">
                <div className="w-[26.67%] h-[2rem] flex items-center justify-start border-r-[0.1rem] border-t-[0.1rem] border-black bg-gray-300">
                  <input
                    onClick={handleOnchange}
                    onChange={handleOnchange}
                    type="radio"
                    name="typeOfPrinterMachine"
                    id=""
                    checked={input.typeOfPrinterMachine == "LETTERPRESS"}
                    value={"LETTERPRESS"}
                    className="mx-[0.25rem] h-[1.25rem] w-[1.25rem]"
                  />
                  <p className="text-[1.25rem] font-semibold">Letterpress</p>
                </div>
                <div className="w-[26.67%] h-[2rem] flex items-center justify-start border-r-[0.1rem] border-t-[0.1rem] border-black bg-gray-300">
                  <input
                    onChange={handleOnchange}
                    onClick={handleOnchange}
                    type="radio"
                    value={"F31F32"}
                    checked={input.typeOfPrinterMachine == "F31F32"}
                    name="typeOfPrinterMachine"
                    id=""
                    className="mx-[0.25rem] h-[1.25rem] w-[1.25rem]"
                  />
                  <p className="text-[1.25rem] font-semibold">F31 / F32</p>
                </div>
                <div className="w-[26.67%] h-[2rem] flex items-center justify-start border-t-[0.1rem] border-black bg-gray-300">
                  <input
                    onChange={handleOnchange}
                    onClick={handleOnchange}
                    type="radio"
                    name="typeOfPrinterMachine"
                    id=""
                    checked={input.typeOfPrinterMachine == "D2"}
                    value={"D2"}
                    className="mx-[0.25rem] h-[1.25rem] w-[1.25rem]"
                  />
                  <p className="text-[1.25rem] font-semibold">D2</p>
                </div>
                <div className="w-[26.67%] h-[2rem] flex items-center justify-start border-l-[0.1rem] border-t-[0.1rem]  border-black bg-gray-300">
                  <input
                    onChange={handleOnchange}
                    onClick={handleOnchange}
                    type="radio"
                    name="typeOfPrinterMachine"
                    id=""
                    checked={input.typeOfPrinterMachine == "M3"}
                    value={"M3"}
                    className="mx-[0.25rem] h-[1.25rem] w-[1.25rem]"
                  />
                  <p className="text-[1.25rem] font-semibold">M3</p>
                </div>
                {/* <div className="w-[20%] h-[2rem] flex items-center justify-start border-t-[0.1rem] border-black bg-gray-300">
                  
                </div> */}
                <div className="w-[20%] h-[2rem] flex items-center justify-start border-t-[0.1rem] border-l-[0.1rem] border-r-[0.1rem] border-black bg-gray-300">
                  <input
                    onChange={handleOnchange}
                    onClick={handleOnchange}
                    type="radio"
                    name="typeOfPrinterMachine"
                    id=""
                    checked={input.typeOfPrinterMachine == "OUTSOURCE"}
                    value={"OUTSOURCE"}
                    className="mx-[0.25rem] h-[1.25rem] w-[1.25rem]"
                  />
                  <p className="text-[1.25rem] font-semibold">Outsource</p>
                </div>
              </div>
              <div className="flex flex-row w-full h-full justify-between">
                <div className="flex flex-col  px-[0.5rem] py-[0.5rem]">
                  <div className="flex flex-row items-center  mb-[0.25rem]">
                    <div className="flex flex-row items-center mr-[0.25rem]">
                      <div className="flex flex-row items-center mr-[0.25rem]">
                        <input
                          onChange={() => {
                            if (input.cyan === true) {
                              setInput({ ...input, cyan: false });
                            }
                            if (input.cyan === false) {
                              setInput({ ...input, cyan: true });
                            }
                            if (input.cyan === null) {
                              setInput({ ...input, cyan: true });
                            }
                          }}
                          type="checkbox"
                          name="cyan"
                          id=""
                          checked={input.cyan === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem] font-semibold">Cyan</p>
                      </div>
                      <div className="flex flex-row items-center mr-[0.25rem]">
                        <input
                          onChange={() => {
                            if (input.magenta === true) {
                              setInput({ ...input, magenta: false });
                            }
                            if (input.magenta === false) {
                              setInput({ ...input, magenta: true });
                            }
                            if (input.magenta === null) {
                              setInput({ ...input, magenta: true });
                            }
                          }}
                          type="checkbox"
                          name="magenta"
                          id=""
                          checked={input.magenta === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem] font-semibold">Magenta</p>
                      </div>
                      <div className="flex flex-row items-center mr-[0.25rem]">
                        <input
                          onChange={() => {
                            if (input.yellow === true) {
                              setInput({ ...input, yellow: false });
                            }
                            if (input.yellow === false) {
                              setInput({ ...input, yellow: true });
                            }
                            if (input.yellow === null) {
                              setInput({ ...input, yellow: true });
                            }
                          }}
                          type="checkbox"
                          name="yellow"
                          id=""
                          checked={input.yellow === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem] font-semibold">Yellow</p>
                      </div>
                      <div className="flex flex-row items-center mr-[0.25rem]">
                        <input
                          onChange={() => {
                            if (input.black === true) {
                              setInput({ ...input, black: false });
                            }
                            if (input.black === false) {
                              setInput({ ...input, black: true });
                            }
                            if (input.black === null) {
                              setInput({ ...input, black: true });
                            }
                          }}
                          type="checkbox"
                          name="pantone"
                          id=""
                          checked={input.black === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem] font-semibold">Black</p>
                      </div>
                      <div className="flex flex-row items-center mr-[0.25rem]">
                        <input
                          onChange={() => {
                            if (input.white === true) {
                              setInput({ ...input, white: false });
                            }
                            if (input.white === false) {
                              setInput({ ...input, white: true });
                            }
                            if (input.white === null) {
                              setInput({ ...input, white: true });
                            }
                          }}
                          type="checkbox"
                          name="white"
                          id=""
                          checked={input.white === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem] font-semibold">White</p>
                      </div>

            

                      {/* <div className="flex flex-row items-center mr-[0.25rem]">
                        <input
                          onClick={handleOnchange}
                          onChange={handleOnchange}
                          name="typeOfColor"
                          checked={input.typeOfColor == "ETC"}
                          value={"ETC"}
                          type="radio"
                          id=""
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem] font-semibold  mr-[0.25rem]">Etc.</p>
                        <input
                          onChange={handleOnchange}
                          className="w-[3rem] bg-gray-200 text-[0.8rem]"
                          type="text"
                          name="cmykEtc"
                          value={input.cmykEtc}
                          id=""
                        />
                      </div> */}


                    </div>
                  </div>
                  <div className="flex flex-row items-start">
                    <div>
                      {/* <div className="flex flex-row items-center">
                        <input
                          onChange={() => {
                            if (input.pantone === true) {
                              setInput({ ...input, pantone: false });
                            }
                            if (input.pantone === false) {
                              setInput({ ...input, pantone: true });
                            }
                            if (input.pantone === null) {
                              setInput({ ...input, pantone: true });
                            }
                          }}
                          type="checkbox"
                          name="pantone"
                          id=""
                          checked={input.pantone === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.8rem] font-semibold">Pantone</p>
                      </div> */}
                      <div className="w-[6rem] px-[0.25rem] mt-[0.75rem]">
                        <p className="text-[0.5rem]">หมายเหตุ :</p>
                        <p className="text-[0.5rem]">
                          โปรดระบุสีพิมพ์ให้ถูกต้องและครบถ้วน
                          หากไม่ทราบให้ตรวจสอบกับพรีเพลส
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start">
                      <div className="h-[1.4rem] flex flex-row">
                      <div className="flex flex-row items-center">
                        <input
                          onChange={() => {
                            if (input.pantone1 === true) {
                              setInput({ ...input, pantone1: false });
                            }
                            if (input.pantone1 === false) {
                              setInput({ ...input, pantone1: true });
                            }
                            if (input.pantone1 === null) {
                              setInput({ ...input, pantone1: true });
                            }
                          }}
                          type="checkbox"
                          name="pantone1"
                          id=""
                          checked={input.pantone1 === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.8rem] font-semibold">Pantone</p>
                      </div>
                        <p className="text-[0.9rem] font-semibold pl-1">: </p>
                        <input
                          onChange={handleOnchange}
                          value={input.subPantone1}
                          name="subPantone1"
                          type="text"
                          className="w-[6rem] h-[1.2rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.9rem] indent-[0.25rem] font-bold"
                        />
                      </div>
                      <div className="h-[1.4rem] flex flex-row">
                      <div className="flex flex-row items-center">
                        <input
                          onChange={() => {
                            if (input.pantone2 === true) {
                              setInput({ ...input, pantone2: false });
                            }
                            if (input.pantone2 === false) {
                              setInput({ ...input, pantone2: true });
                            }
                            if (input.pantone2 === null) {
                              setInput({ ...input, pantone2: true });
                            }
                          }}
                          type="checkbox"
                          name="pantone2"
                          id=""
                          checked={input.pantone2 === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.8rem] font-semibold">Pantone</p>
                      </div>
                        <p className="text-[0.9rem] font-semibold pl-1">: </p>
                        <input
                          onChange={handleOnchange}
                          value={input.subPantone2}
                          name="subPantone2"
                          type="text"
                          className="w-[6rem] h-[1.2rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.9rem] indent-[0.25rem] font-bold"
                        />
                      </div>
                      <div className="h-[1.4rem] flex flex-row">
                      <div className="flex flex-row items-center">
                        <input
                          onChange={() => {
                            if (input.pantone3 === true) {
                              setInput({ ...input, pantone3: false });
                            }
                            if (input.pantone3 === false) {
                              setInput({ ...input, pantone3: true });
                            }
                            if (input.pantone3 === null) {
                              setInput({ ...input, pantone3: true });
                            }
                          }}
                          type="checkbox"
                          name="pantone"
                          id=""
                          checked={input.pantone3 === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.8rem] font-semibold">Pantone</p>
                      </div>
                        <p className="text-[0.9rem] font-semibold pl-1">: </p>
                        <input
                          onChange={handleOnchange}
                          value={input.subPantone3}
                          name="subPantone3"
                          type="text"
                          className="w-[6rem] h-[1.2rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.9rem] indent-[0.25rem] font-bold"
                        />
                      </div>
                      <div className="h-[1.4rem] flex flex-row">
                      <div className="flex flex-row items-center">
                        <input
                          onChange={() => {
                            if (input.pantone4 === true) {
                              setInput({ ...input, pantone4: false });
                            }
                            if (input.pantone4 === false) {
                              setInput({ ...input, pantone4: true });
                            }
                            if (input.pantone4 === null) {
                              setInput({ ...input, pantone4: true });
                            }
                          }}
                          type="checkbox"
                          name="pantone4"
                          id=""
                          checked={input.pantone4 === true}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.8rem] font-semibold">Pantone</p>
                      </div>
                        <p className="text-[0.9rem] font-semibold pl-1">: </p>
                        <input
                          onChange={handleOnchange}
                          value={input.subPantone4}
                          name="subPantone4"
                          type="text"
                          className="w-[6rem] h-[1.2rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.9rem] indent-[0.25rem] font-bold"
                        />
                      </div>

                    </div>
                  </div>
                </div>

                <div className="w-[0.05rem] h-full bg-black"></div>

                <div className="flex flex-col px-[0.25rem] py-[0.5rem]">
                  <div className="flex flex-col mb-[0.25rem] w-[13rem]">
                    <div className="flex mb-[0.5rem]">
                      <div className="flex mr-[0.25rem]">
                        <input
                          onClick={handleOnchange}
                          onChange={handleOnchange}
                          type="radio"
                          name="typeOfFormat"
                          value="ORIGINAL"
                          id="original"
                          checked={input.typeOfFormat == "ORIGINAL"}
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.8rem]">Original :</p>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex mb-[0.25rem]">
                          <input
                            onChange={() => {
                              if (input.digitalProof === true) {
                                setInput({ ...input, digitalProof: false });
                              }
                              if (input.digitalProof === false) {
                                setInput({ ...input, digitalProof: true });
                              }
                              if (input.digitalProof === null) {
                                setInput({ ...input, digitalProof: true });
                              }
                            }}
                            type="checkbox"
                            name="digitalProof"
                            checked={input.digitalProof === true}
                            id=""
                            className="mx-[0.25rem] h-[1rem] w-[1rem]"
                          />
                          <p className="text-[0.8rem]">Digital Proof</p>
                        </div>
                        <div className="flex translate-x-[-4rem]">
                          <input
                            onChange={() => {
                              if (input.typeOfFormatErp === true) {
                                setInput({ ...input, typeOfFormatErp: false });
                              }
                              if (input.typeOfFormatErp === false) {
                                setInput({ ...input, typeOfFormatErp: true });
                              }
                              if (input.typeOfFormatErp === null) {
                                setInput({ ...input, typeOfFormatErp: true });
                              }
                            }}
                            type="checkbox"
                            name="typeOfFormatErp"
                            id=""
                            checked={input.typeOfFormatErp === true}
                            className="mx-[0.25rem] h-[1rem] w-[1rem]"
                          />
                          <p className="text-[0.8rem] w-[30px]">ERP :</p>
                          <input
                            onChange={handleOnchange}
                            value={input.subTypeOfFormatErp}
                            type="text"
                            name="subTypeOfFormatErp"
                            className="w-[9rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.7rem] font-semibold indent-[0.1rem]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-[0.25rem]">
                      <input
                        onClick={handleOnchange}
                        onChange={handleOnchange}
                        type="radio"
                        name="typeOfFormat"
                        value="BLANKTEST"
                        checked={input.typeOfFormat == "BLANKTEST"}
                        id="blankTest"
                        className="mx-[0.25rem] h-[1rem] w-[1rem]"
                      />
                      <p className="text-[0.8rem]">Blank Test</p>
                    </div>
                    <div className="flex">
                      <input
                        onClick={handleOnchange}
                        onChange={handleOnchange}
                        type="radio"
                        name="typeOfFormat"
                        value="BLANK"
                        checked={input.typeOfFormat == "BLANK"}
                        id=""
                        className="mx-[0.25rem] h-[1rem] w-[1rem]"
                      />
                      <p className="text-[0.8rem]">Blank</p>
                    </div>
                  </div>

                  <div className="flex flex-row mb-[0.25rem]"></div>
                </div>
                <div className="flex flex-col  px-[0.25rem] py-[0.5rem]">
                  {/* <div className="flex flex-row mb-[0.25rem]">
                    <input
                      onChange={() => {
                        if (input.spotUv === true) {
                          setInput({ ...input, spotUv: false });
                        }
                        if (input.spotUv === false) {
                          setInput({ ...input, spotUv: true });
                        }
                        if (input.spotUv === null) {
                          setInput({ ...input, spotUv: true });
                        }
                      }}
                      type="checkbox"
                      name="spotUv"
                      checked={input.spotUv === true}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Spot UV</p>
                  </div> */}
                  <div className="flex flex-row mb-[0.25rem]">
                    <input
                      onChange={() => {
                        if (input.removeGlue === true) {
                          setInput({ ...input, removeGlue: false });
                        }
                        if (input.removeGlue === false) {
                          setInput({ ...input, removeGlue: true });
                        }
                        if (input.removeGlue === null) {
                          setInput({ ...input, removeGlue: true });
                        }
                      }}
                      type="checkbox"
                      name="removeGlue"
                      checked={input.removeGlue === true}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">ลบกาว</p>
                  </div>
                  <div className="flex flex-row mb-[0.25rem]">
                    <input
                      onChange={() => {
                        if (input.leaveCoatingUv === true) {
                          setInput({ ...input, leaveCoatingUv: false });
                        }
                        if (input.leaveCoatingUv === false) {
                          setInput({ ...input, leaveCoatingUv: true });
                        }
                        if (input.leaveCoatingUv === null) {
                          setInput({ ...input, leaveCoatingUv: true });
                        }
                      }}
                      type="checkbox"
                      name="leaveCoatingUv"
                      checked={input.leaveCoatingUv === true}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">เว้นเคลือบ UV</p>
                  </div>
                  <div className="flex flex-row mb-[0.25rem]">
                    <input
                      onChange={() => {
                        if (input.pumpHoleEyeAndVine === true) {
                          setInput({ ...input, pumpHoleEyeAndVine: false });
                        }
                        if (input.pumpHoleEyeAndVine === false) {
                          setInput({ ...input, pumpHoleEyeAndVine: true });
                        }
                        if (input.pumpHoleEyeAndVine === null) {
                          setInput({ ...input, pumpHoleEyeAndVine: true });
                        }
                      }}
                      type="checkbox"
                      name="pumpHoleEyeAndVine"
                      checked={input.pumpHoleEyeAndVine === true}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">ปั๊มปรุระหว่างดวง / แถว</p>
                  </div>
                  <div className="flex flex-row mb-[0.25rem]">
                    <input
                      onChange={(e) => {
                        if (input.additionalEtc === true) {
                          setInput({ ...input, additionalEtc: false });
                        }
                        if (input.additionalEtc === false) {
                          setInput({ ...input, additionalEtc: true });
                        }
                        if (input.additionalEtc === null) {
                          setInput({ ...input, additionalEtc: true });
                        }
                      }}
                      type="checkbox"
                      name="additionalEtc"
                      checked={input.additionalEtc === true}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Etc.</p>
                    <input
                      onChange={handleOnchange}
                      value={input.subAdditionalEtc}
                      type="text"
                      name="subAdditionalEtc"
                      className="w-[5rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem]"
                    />
                  </div>
                </div>
                <div className="h-full w-[20%] border-l-[0.1rem] border-r-[0.1rem] border-black">
                  {/* <div className="w-full h-[2rem] flex items-center justify-start border-b-[0.1rem] border-black bg-gray-300">
                <input
                 onChange={handleOnchange}
                  type="checkbox"
                        name="typeOfPrinterMachine"
                  id=""
                  value={"OUTSOURCE"}
                  className="mx-[0.25rem] h-[1.25rem] w-[1.25rem]"
                />
                <p className="text-[1.25rem] font-semibold">Outsource</p>
              </div> */}
                  <div className="flex flex-col px-[0.5rem] py-[0.5rem]">
                    <div>
                      <div className="flex flex-row mb-[0.25rem]">
                        <input
                          onClick={handleOnchange}
                          onChange={handleOnchange}
                          value={"STICKER"}
                          checked={input.outsourceType == "STICKER"}
                          type="radio"
                          name="outsourceType"
                          id=""
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem]">Sticker</p>
                      </div>
                      <div className="flex flex-row mb-[0.25rem]">
                        <input
                          onClick={handleOnchange}
                          onChange={handleOnchange}
                          value={"OFFSET"}
                          checked={input.outsourceType == "OFFSET"}
                          type="radio"
                          name="outsourceType"
                          id=""
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem]">Offset</p>
                      </div>
                      <div className="flex flex-row mb-[0.25rem]">
                        <input
                          onClick={handleOnchange}
                          onChange={handleOnchange}
                          value={"FSC"}
                          type="radio"
                          name="outsourceType"
                          checked={input.outsourceType == "FSC"}
                          id=""
                          className="mx-[0.25rem] h-[1rem] w-[1rem]"
                        />
                        <p className="text-[0.7rem]">FSC</p>
                      </div>
                    </div>
                    <div className="w-full mt-[0.75rem]">
                      <p className="text-[0.6rem]">
                        *การสั่งผลิตงานภายนอกโดยซัพพลายเออร์
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>




          <div className="w-full h-[2rem] flex flex-row justify-between bg-white border-[#000] border-b-[0.1rem]">
            <div className="flex flex-row">
              <div className="flex flex-row items-center mr-[0.25rem]">
                <p className="text-[0.8rem] font-bold">Coated</p>
              </div>
              <div className="flex flex-row items-center mr-[0.25rem]">
                <input
                  onClick={handleOnchange}
                  onChange={handleOnchange}
                  type="radio"
                  name="typeOfCoated"
                  id=""
                  value={"POG"}
                  checked={input.typeOfCoated == "POG"}
                  className="mx-[0.25rem] h-[1rem] w-[1rem]"
                />
                <p className="text-[0.7rem]">POG</p>
              </div>
              <div className="flex flex-row items-center mr-[0.25rem]">
                <input
                  onClick={handleOnchange}
                  onChange={handleOnchange}
                  type="radio"
                  name="typeOfCoated"
                  value={"POM"}
                  checked={input.typeOfCoated == "POM"}
                  id=""
                  className="mx-[0.25rem] h-[1rem] w-[1rem]"
                />
                <p className="text-[0.7rem]">POM</p>
              </div>
              <div className="flex flex-row items-center mr-[0.25rem]">
                <input
                  onClick={handleOnchange}
                  onChange={handleOnchange}
                  type="radio"
                  name="typeOfCoated"
                  value={"BOPP"}
                  checked={input.typeOfCoated == "BOPP"}
                  id=""
                  className="mx-[0.25rem] h-[1rem] w-[1rem]"
                />
                <p className="text-[0.7rem]">BOPP</p>
              </div>
              <div className="flex flex-row items-center mr-[0.25rem]">
                <input
                  onClick={handleOnchange}
                  onChange={handleOnchange}
                  type="radio"
                  name="typeOfCoated"
                  value={"COATEDETC"}
                  checked={input.typeOfCoated == "COATEDETC"}
                  id=""
                  className="mx-[0.25rem] h-[1rem] w-[1rem]"
                />
                <p className="text-[0.7rem]">Etc.</p>
                <input
                  onChange={handleOnchange}
                  type="text"
                  name="subCoatedEtc"
                  value={input.subCoatedEtc}
                  className="w-[3rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem]"
                />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row items-center  border-[#000] border-[0.1rem]">
                <div className="flex flex-row p-[0.5rem]">
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <p className="text-[0.8rem] font-bold">UV</p>
                  </div>
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfUv"
                      value={"GLOSS"}
                      checked={input.typeOfUv == "GLOSS"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Gloss</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfUv"
                      value={"MATT"}
                      checked={input.typeOfUv == "MATT"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Matt</p>
                  </div>
                </div>
                <div className="w-[0.05rem] h-full bg-black"></div>
                <div className="flex flex-row p-[0.5rem]">
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <p className="text-[0.8rem] font-bold">Cold foil</p>
                  </div>
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="coldFoil"
                      value={"SILVER"}
                      checked={input.coldFoil == "SILVER"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Silver</p>
                  </div>
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="coldFoil"
                      value={"GOLD"}
                      checked={input.coldFoil == "GOLD"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Gold</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="coldFoil"
                      value={"TYPEOFCOLDFOILETC"}
                      checked={input.coldFoil == "TYPEOFCOLDFOILETC"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">Etc.</p>
                    <input
                      onChange={handleOnchange}
                      type="text"
                      name="subColdFoilEtc"
                      value={input.subColdFoilEtc}
                      className="w-[4rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[auto] bg-white flex flex-row justify-between py-[0.5rem]">
            <div className="flex flex-col mr-[0.5rem]">
              <div className="flex flex-row mb-[0.75rem]">
                <div className="flex flex-col">
                  <div className="flex flex-row items-end mb-[0.5rem] mr-[0.75rem]">
                    <div className="flex flex-col">
                      <p className="text-[0.7rem]">Material</p>
                      <p className="text-[0.8rem]">สติ๊กเกอร์</p>
                    </div>
                    <input
                      maxLength={6}
                      onChange={handleOnchange}
                      type="text"
                      name="materialSticker"
                      value={input.materialSticker}
                      className="w-[4rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                    />
                  </div>
                  <div className="flex flex-row">
                    <input
                      onChange={() => {
                        if (input.materialFSC === true) {
                          setInput({ ...input, materialFSC: false });
                        }
                        if (input.materialFSC === false) {
                          setInput({ ...input, materialFSC: true });
                        }
                        if (input.materialFSC === null) {
                          setInput({ ...input, materialFSC: true });
                        }
                      }}
                      type="checkbox"
                      checked={input.materialFSC === true}
                      name="materialFSC"
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">FSC</p>
                  </div>
                </div>

                <div className="flex flex-col ml-[0.75rem]">
                  <div className="flex flex-row items-end mb-[0.5rem]">
                    <div className="flex flex-col">
                      <p className="text-[0.7rem]">Unit Size</p>
                      <p className="text-[0.8rem]">ไซส์ต่อดวง</p>
                    </div>
                    <input
                      maxLength={8}
                      onChange={handleOnchange}
                      type="text"
                      name="unitSizeFrontY"
                      value={input.unitSizeFrontY}
                      className="w-[2.5rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                    />
                    <div className="flex flex-col items-center">
                      <p className="text-[0.7rem]">Front</p>
                      <p className="text-[0.8rem]">X</p>
                    </div>
                    <input
                      maxLength={8}
                      onChange={handleOnchange}
                      type="text"
                      name="unitSizeFrontX"
                      value={input.unitSizeFrontX}
                      className="w-[2.5rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                    />
                    <p className="text-[0.8rem]">cm</p>
                  </div>
                  <div className="flex flex-row items-end mb-[0.5rem]">
                    <div className="flex flex-col">
                      <p className="text-[0.7rem]">Unit Size</p>
                      <p className="text-[0.8rem]">ไซส์ต่อดวง</p>
                    </div>
                    <input
                      maxLength={8}
                      onChange={handleOnchange}
                      type="text"
                      name="unitSizeBlackY"
                      value={input.unitSizeBlackY}
                      className="w-[2.5rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                    />
                    <div className="flex flex-col items-center">
                      <p className="text-[0.7rem]">Back</p>
                      <p className="text-[0.8rem]">X</p>
                    </div>
                    <input
                      maxLength={8}
                      onChange={handleOnchange}
                      name="unitSizeBlackX"
                      value={input.unitSizeBlackX}
                      type="text"
                      className="w-[2.5rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                    />
                    <p className="text-[0.8rem]">cm</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center mb-[1.5rem]">
                <div className="w-[4.5rem] mr-[0.5rem]">
                  <p className="text-[1rem] font-bold">Packing / การบรรจุ</p>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row mr-[0.3rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfCorner"
                      value={"UPPERCORNER"}
                      checked={input.typeOfCorner == "UPPERCORNER"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">มุมมน :</p>
                    <input
                      onChange={handleOnchange}
                      type="text"
                      name="subUpperCorner"
                      value={input.subUpperCorner}
                      className="w-[3rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.9rem] font-bold text-center"
                    />
                  </div>
                  <div className="flex flex-row mr-[0.3rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfCorner"
                      value={"SQUARES"}
                      checked={input.typeOfCorner == "SQUARES"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">สี่เหลี่ยม</p>
                  </div>
                  <div className="flex flex-row">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfCorner"
                      value={"ASJOBLAYOUT"}
                      checked={input.typeOfCorner == "ASJOBLAYOUT"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">ตามรูปแบบงาน</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-end mb-[0.5rem]">
                  <input
                    maxLength={10}
                    onClick={handleOnchange}
                    onChange={handleOnchange}
                    type="radio"
                    name="typeOfPacking"
                    id=""
                    value={"SHEET"}
                    checked={input.typeOfPacking == "SHEET"}
                    className="mx-[0.25rem] h-[1rem] w-[1rem]"
                  />
                  <div className="flex flex-col">
                    <p className="text-[0.8rem]">Sheet</p>
                  </div>
                  <input
                    onChange={handleOnchange}
                    type="text"
                    name="subSheet"
                    value={input.subSheet}
                    className="w-[3rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                  />
                  <div className="flex flex-col">
                    <p className="text-[0.8rem]">Pcs. / ช่องไฟ</p>
                  </div>
                  <input
                    onChange={handleOnchange}
                    name="space"
                    type="text"
                    value={input.space}
                    className="w-[3rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                  />
                  <p className="text-[0.8rem]">มิล</p>
                </div>
                <div className="flex flex-row items-end">
                  <input
                    onClick={handleOnchange}
                    onChange={handleOnchange}
                    maxLength={10}
                    type="radio"
                    name="typeOfPacking"
                    id=""
                    value={"ROLL"}
                    checked={input.typeOfPacking == "ROLL"}
                    className="mx-[0.25rem] h-[1rem] w-[1rem]"
                  />
                  <div className="flex flex-col">
                    <p className="text-[0.8rem]">Roll</p>
                  </div>
                  <input
                    onChange={handleOnchange}
                    name="subRoll"
                    type="text"
                    value={input.subRoll}
                    className="w-[3rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                  />
                  <div className="flex flex-col mr-[0.5rem]">
                    <p className="text-[0.8rem]">Pcs. / Core</p>
                  </div>
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfCore"
                      value={"ONEINCH"}
                      checked={input.typeOfCore == "ONEINCH"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">1 inch</p>
                  </div>
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfCore"
                      value={"ONEPONITFIVEINCH"}
                      checked={input.typeOfCore == "ONEPONITFIVEINCH"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">1.5 inch</p>
                  </div>
                  <div className="flex flex-row items-center mr-[0.25rem]">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfCore"
                      value={"THREEINCH"}
                      checked={input.typeOfCore == "THREEINCH"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.7rem]">3 inch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[0.05rem] h-full bg-black"></div>

            <div className="flex flex-col ml-[0.5rem]">
              <div className="flex flex-row items-end mb-[0.5rem]">
                <div className="flex flex-col">
                  <p className="text-[0.7rem]">P/O Qty</p>
                  <p className="text-[0.8rem]">จำนวนสั่งซื้อ</p>
                </div>
                <input
                  onChange={handleOnchange}
                  name="purchaseOrderQty"
                  type="text"
                  value={input.purchaseOrderQty}
                  className="w-[8rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.8rem] text-center font-bold"
                />
        <div className="flex flex-col">
                  <div className="flex gap-2 justify-between">
                    <p className="text-[0.7rem]">set</p>
                    <input
                      onChange={() => {
                        if (input.set === true) {
                          setInput({ ...input, set: false });
                        }
                        if (input.set === false) {
                          setInput({ ...input, set: true });
                        }
                        if (input.set === null) {
                          setInput({ ...input, set: true });
                        }
                      }}
                      name="set"
                      checked={input.set === true}
                      type="checkbox"
                    />
                  </div>
                  <div className="flex gap-2 justify-between">
                    <p className="text-[0.7rem]">pcs</p>
                    <input
                      onChange={() => {
                        if (input.pcs === true) {
                          setInput({ ...input, pcs: false });
                        }
                        if (input.pcs === false) {
                          setInput({ ...input, pcs: true });
                        }
                        if (input.pcs === null) {
                          setInput({ ...input, pcs: true });
                        }
                      }}
                      name="pcs"
                      checked={input.pcs === true}
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-[6rem] flex flex-col items-center mr-[0.5rem]">
                  <div className="w-full flex flex-row justify-start">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfRoll"
                      value={"OUTERROLL"}
                      checked={input.typeOfRoll == "OUTERROLL"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.6rem]">เข้าม้วนด้านนอก</p>
                  </div>
                  <img
                    className="w-[5rem] h-[3rem] object-scale-down p-[0.1rem]"
                    src={rolloutside}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between mb-[0.5rem]">
                    <div className="flex flex-row">
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLFRONTHEADSIDE";
                          setSelectTypeOfRoll("OUTERROLLFRONTHEADSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLFRONTHEADSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_startout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLFRONTBACKSIDE";
                          setSelectTypeOfRoll("OUTERROLLFRONTBACKSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLFRONTBACKSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_endout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLFRONTRIGHTSIDE";
                          setSelectTypeOfRoll("OUTERROLLFRONTRIGHTSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLFRONTRIGHTSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_rightout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLFRONTLEFTSIDE";
                          setSelectTypeOfRoll("OUTERROLLFRONTLEFTSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLFRONTLEFTSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_leftout} />
                      </div>
                    </div>
                    <p className="text-[0.6rem] ml-[0.25rem]">ด้านหน้า</p>
                  </div>

                  <div className="flex flex-row items-center justify-between mb-[0.5rem]">
                    <div className="flex flex-row">
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLBACKHEADSIDE";
                          setSelectTypeOfRoll("OUTERROLLBACKHEADSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLBACKHEADSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_startout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLBACKBACKSIDE";
                          setSelectTypeOfRoll("OUTERROLLBACKBACKSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLBACKBACKSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_endout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLBACKRIGHTSIDE";
                          setSelectTypeOfRoll("OUTERROLLBACKRIGHTSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLBACKRIGHTSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_rightout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLBACKLEFTSIDE";
                          setSelectTypeOfRoll("OUTERROLLBACKLEFTSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLBACKLEFTSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_leftout} />
                      </div>
                    </div>
                    <p className="text-[0.6rem] ml-[0.25rem]">ด้านหลัง</p>
                  </div>

                  <div className="flex flex-row items-center justify-between mb-[0.5rem]">
                    <div className="flex flex-row">
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLFRONTBACKRIGHTSIDE";
                          setSelectTypeOfRoll("OUTERROLLFRONTBACKRIGHTSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLFRONTBACKRIGHTSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_frontbackrightout} />
                      </div>
                      <div
                        onClick={(e) => {
                          e.target.name = "subOuterRoll";
                          e.target.value = "OUTERROLLFRONTBACKLEFTSIDE";
                          setSelectTypeOfRoll("OUTERROLLFRONTBACKLEFTSIDE");
                          handleOnchange(e);
                        }}
                        className={`cursor-pointer object-scale-down p-[0.01rem] mx-[0.2rem] ${input.subOuterRoll == "OUTERROLLFRONTBACKLEFTSIDE" &&
                          "outline-none outline-black"
                          }`}
                      >
                        <img className='w-[3rem] object-scale-down p-[0.01rem]' src={roll_frontbackleftout} />
                      </div>
                    </div>
                    <p className="text-[0.6rem] ml-[0.25rem]">ด้านหน้า + ด้านหลัง</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[0.05rem] bg-black"></div>

              <div className="flex flex-row items-center mt-[0.5rem]">
                <div className="w-[6rem] flex flex-col items-center mr-[0.5rem]">
                  <div className="w-full flex flex-row justify-start">
                    <input
                      onClick={handleOnchange}
                      onChange={handleOnchange}
                      type="radio"
                      name="typeOfRoll"
                      value={"INSIDEROLL"}
                      checked={input.typeOfRoll == "INSIDEROLL"}
                      id=""
                      className="mx-[0.25rem] h-[1rem] w-[1rem]"
                    />
                    <p className="text-[0.6rem]">เข้าม้วนด้านใน</p>
                  </div>
                  <img
                    className="w-[5rem] h-[3rem] object-scale-down p-[0.1rem]"
                    src={rollinside}
                  />
                </div>
                <input
                  onChange={handleOnchange}
                  name="insideRollRemark"
                  value={input.insideRollRemark}
                  type="text"
                  className="w-[8rem] h-[1rem] mx-[0.25rem] mt-[2rem] border-[#000] border-b-[0.1rem] text-[0.8rem] indent-[0.25rem] font-bold"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-[24rem] bg-white">
            <div className="h-full flex flex-row justify-between">
              <div className="w-[24rem] h-full flex flex-col border-black border-[0.1rem]">
                <div className="flex justify-center border-black border-b-[0.1rem] bg-gray-200">
                  <p>Another work for Sales (สำหรับฝ่ายขาย)</p>
                </div>
                <div className="w-full flex flex-col justify-start items-center">
                  <textarea
                    onChange={handleOnchange}
                    name="remark"
                    value={input.remark}
                    className="w-[90%] h-[14.5rem] max-h-[14.5rem] min-h-[14.5rem] py-[0.25rem] px-[0.5rem] mt-[1rem] text-[0.8rem] text-gray-900 bg-white bg-[length:100%_1.5rem] leading-[1.5rem]  bg-[linear-gradient(#000_1px,_#fff_1px)] font-bold"
                    placeholder="Remark :"
                  ></textarea>

                  <div className="flex flex-col w-[90%] justify-end">
                    <div className="h-[1rem] w-full flex flex-row items-end justify-between mb-[0.5rem] leading-[0.5rem]">
                      <p className="text-[0.8rem]">ERP :</p>
                      <input
                        onChange={handleOnchange}
                        name="erp"
                        value={input.erp}
                        type="text"
                        className="w-[19rem] h-[1rem] mx-[0.25rem] text-[1rem] border-black border-b-[0.1rem] indent-[0.25rem] font-bold"
                      />
                    </div>
                    <div className="h-[1rem] w-full flex flex-row justify-between">
                      <div className="flex flex-row">
                        <p className="text-[0.8rem]">Confirm :</p>
                        <input
                          onChange={handleOnchange}
                          name="confirm"
                          value={input.confirm}
                          type="text"
                          className="w-[11rem] h-[1rem] mr-[0.25rem] ml-[0.25rem] text-[0.8rem] border-black border-b-[0.1rem] indent-[0.1rem] font-bold"
                        />
                      </div>
                      <div className="flex flex-row">
                        <p className="text-[0.8rem]">Rev .</p>
                        <input
                          onChange={handleOnchange}
                          name="rev"
                          value={input.rev}
                          type="text"
                          className="w-[4rem] h-[1rem] mr-[0.25rem] ml-[0.25rem] text-[1rem] border-black border-b-[0.1rem] indent-[0.1rem] font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[48%] h-full flex flex-col border-black border-[0.1rem]">
                <div className="flex justify-center border-black border-b-[0.1rem] bg-gray-200">
                  <p>Another work for PP (สำหรับพรีเพลส)</p>
                </div>
                <div className="w-full h-[18rem]"></div>
              </div>
            </div>
          </div>
          <div className="w-full h-[6.5rem] bg-white flex flex-row items-center justify-between">
            <div className="w-[85%] flex flex-row items-center justify-around">
              <div className="flex flex-col border-[0.1rem] border-black">
                <div className="flex flex-row justify-between items-center bg-gray-300 px-[0.25rem]">
                  <div className="bg-white">
                    <input
                      name="salesCoName"
                      value={input.salesCoName}
                      onChange={handleOnchange}
                      type="text"
                      className="w-[5rem] h-[1rem] mx-[0.25rem] text-[0.9rem] text-center"
                    />
                  </div>
                  <div className="flex flex-col items-center ml-[0.25rem]">
                    <p className="text-[0.7rem]">Sale Co</p>
                    <p className="text-[0.5rem]">Issue by</p>
                  </div>
                </div>
                <div className="flex flex-col p-[0.25rem]">
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Date</p>
                    <div className="flex">
                      <div className="pl-[5px]">{input.salesCoDate}</div>
                      <input
                        maxLength={4}
                        type="date"
                        name="salesCoDate"
                        value={input.salesCoDate}
                        onChange={handleOnchange}
                        className="w-[1rem] h-[1rem] mx-[0.25rem]  text-[0.7rem] text-center"
                      />
                    </div>

                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Time</p>
                    <input
                      onChange={handleOnchange}
                      name="salesCoTime"
                      value={input.salesCoTime}
                      type="text"
                      className="w-[6rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.7rem] text-center"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-[0.1rem] border-black">
                <div className="flex flex-row justify-between items-center bg-gray-300 px-[0.25rem]">
                  <div className="bg-white">
                    <input
                      name="salesCoMgr"
                      value={input.salesCoMgr}
                      onChange={handleOnchange}
                      type="text"
                      className="w-[5rem] h-[1rem] mx-[0.25rem] text-[0.9rem] text-center"
                    />
                  </div>
                  <div className="flex flex-col items-center ml-[0.25rem]">
                    <p className="text-[0.7rem]">Sale Co Mgr.</p>
                    <p className="text-[0.5rem]">Checked by</p>
                  </div>
                </div>
                <div className="flex flex-col p-[0.25rem]">
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Date</p>
                    <div className="flex">
                      <div className="pl-[5px]">{input.salesCoMgrDate}</div>
                      <input
                        maxLength={4}
                        type="date"
                        name="salesCoMgrDate"
                        onChange={handleOnchange}
                        className="w-[1rem] h-[1rem] mx-[0.25rem]  text-[0.7rem] text-center"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Time</p>
                    <input
                      onChange={handleOnchange}
                      name="salesCoMgrTime"
                      value={input.salesCoMgrTime}
                      type="text"
                      className="w-[6rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.7rem] text-center"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-[0.1rem] border-black">
                <div className="flex flex-row justify-between items-center bg-gray-300 px-[0.25rem]">
                  <div className="bg-white">
                    <input
                      name="prepressName"
                      value={input.prepressName}
                      onChange={handleOnchange}
                      type="text"
                      className="w-[5rem] h-[1rem] mx-[0.25rem] text-[0.9rem] text-center"
                    />
                  </div>
                  <div className="flex flex-col items-center ml-[0.25rem]">
                    <p className="text-[0.7rem]">Prepress</p>
                    <p className="text-[0.5rem]">Artwork by</p>
                  </div>
                </div>
                <div className="flex flex-col p-[0.25rem]">
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Date</p>
                    <div className="flex">
                      <div className="pl-[5px]">{input.prepressDate}</div>
                      <input
                        maxLength={4}
                        type="date"
                        name="prepressDate"
                        onChange={handleOnchange}
                        className="w-[1rem] h-[1rem] mx-[0.25rem]  text-[0.7rem] text-center"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Time</p>
                    <input
                      name="prepressTime"
                      value={input.prepressTime}
                      onChange={handleOnchange}
                      type="text"
                      className="w-[6rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.7rem] text-center"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-[0.1rem] border-black">
                <div className="flex flex-row justify-between items-center bg-gray-300 px-[0.25rem]">
                  <div className="bg-white">
                    <input
                      name="prepressNameCheckedBy"
                      value={input.prepressNameCheckedBy}
                      onChange={handleOnchange}
                      type="text"
                      className="w-[5rem] h-[1rem] mx-[0.25rem] text-[0.9rem] text-center"
                    />
                  </div>
                  <div className="flex flex-col items-center ml-[0.25rem]">
                    <p className="text-[0.7rem]">Prepress</p>
                    <p className="text-[0.5rem]">Checked by</p>
                  </div>
                </div>
                <div className="flex flex-col p-[0.25rem]">
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Date</p>
                    <div className="flex">
                      <div className="pl-[5px]">
                        {input.prepressDateCheckedBy}
                      </div>
                      <input
                        maxLength={4}
                        type="date"
                        name="prepressDateCheckedBy"
                        onChange={handleOnchange}
                        className="w-[1rem] h-[1rem] mx-[0.25rem]  text-[0.7rem] text-center"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[0.8rem]">Time</p>
                    <input
                      name="prepressTimeCheckedBy"
                      value={input.prepressTimeCheckedBy}
                      onChange={handleOnchange}
                      type="text"
                      className="w-[6rem] h-[1rem] mx-[0.25rem] border-[#000] border-b-[0.1rem] text-[0.7rem] text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full justify-end">

              <p className="text-[0.8rem]">
                QF-SC-012 Rev.05
              </p>
            </div>

          </div>
        </div>
      </div>

      <div
        className={` flex gap-2 fixed bottom-5 right-4 ${renderPrintBtn ? "hidden" : ""
          }`}
      >
        <button
          className="bg-white hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black flex items-center justify-center"
          onClick={() => {
            setRenderPrintBtn(true);
            handleEditOrder();
            setTimeout(() => {
              window.print();
            }, [10]);

            setTimeout(() => {
              setRenderPrintBtn(false);
            }, 1000);

            setTimeout(() => {
              window.location.href = "salesWorkPage";
            }, [2000]);
          }}
        >
          Print
        </button>
        <button
          className="bg-white hover:bg-[#C8262D] hover:text-white w-[100px] pt-2 pb-2 border-[1px]  text-black border-black flex items-center justify-center"
          onClick={() => (window.location.href = "salesWorkPage")}
        >
          Cancel
        </button>
      </div>
    </div>

  );
}