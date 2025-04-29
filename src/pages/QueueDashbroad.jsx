import DisplayDate from "../component/DisplayDate";
import axios from "../config/axios";
import { useEffect, useState } from "react";

import pp56 from "../assets/prepress/pp56.png";

export default function QueueDashboard() {
  // const [currentDate, setCurrentDate] = useState(
  //   new Date("Mon Dec 16 2024 16:37:15 GMT+0700 (Indochina Time)")
  // );

  const countWeeksCustom = (startDate, nowDate) => {
    const start = new Date(startDate); // Start date (e.g., 30 Dec 2024)
    const now = new Date(nowDate); // Current date

    // Adjust the start date to the beginning of the week (Monday)
    const startOfWeek = new Date(start);
    startOfWeek.setDate(start.getDate() - start.getDay() + 1); // Adjust to Monday

    // Calculate the time difference between now and the start date
    const timeDifference = now - startOfWeek;
    // Calculate the number of weeks
    const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
    const currentWeekNumber = Math.ceil(timeDifference / millisecondsInAWeek);

    return currentWeekNumber + 1;
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get the start and end dates of the current week, starting on Monday
  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const dayOfWeek = start.getDay();
    // Adjust the start date to the most recent Monday
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    start.setDate(date.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for the start of the day
    return start;
  };

  const getEndOfWeek = (date) => {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Sunday is 6 days after Monday
    end.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999 for the end of the day
    return end;
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const endOfWeek = getEndOfWeek(currentDate);

  function formatDate(dateString) {
    const date = new Date(dateString); // Parse the date string into a Date object

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for day

    // Return the formatted date
    return `${year}-${month}-${day}`;
  }

  const formattedNowDate = formatDate(startOfWeek);
  const fixedStartDate = "2024-12-30";

  const currentWeek = countWeeksCustom(fixedStartDate, formattedNowDate);
  const daysInWeek = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index); // Add index days to startOfWeek
    return day;
  });

  const prevWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7); // Move back 7 days
      return newDate;
    });
  };

  const nextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7); // Move forward 7 days
      return newDate;
    });
  };
  ///////////////////////////////
  const [allOrders, setAllOrders] = useState([]);

  const [allQueues, setAllQueues] = useState([]);

  const [allPrepress, setAllPrepress] = useState([]);

  const [weeklyReports, setWeeklyReports] = useState([]);

  const [allSubOrder, setAllSubOrder] = useState([]);

  const [isHoverPrepressTotal, setIsHoverPrepressTotal] = useState(false);

  const [isHoverPrepressHard, setIsHoverPrepressHard] = useState(false);

  const [isHoverPrepressChecked, setIsHoverPrepressChecked] = useState(false);

  const [isSelectPrepress, setIsSelectPrepress] = useState(false);

  const [selectPrepressData, setSelectPrepressData] = useState([]);

  const [isSelectColor, setIsSelectColor] = useState(0);

  useEffect(() => {
    axios.get("/public/readAllOrder").then((res) => setAllOrders(res.data));
    axios.get("/public/readAllQueue").then((res) => setAllQueues(res.data));
    axios
      .get("/public/readAllPrepress")
      .then((res) => setAllPrepress(res.data));
  }, []);

  useEffect(() => {
    axios
      .post("/public/readWeeklyReport", { start: startOfWeek, end: endOfWeek })
      .then((res) => {
        setAllSubOrder(res.data.subOrders);
        console.log(res.data.orders)
        setWeeklyReports(res.data.orders);
      });
  }, [currentDate]);

  let urgentJob = [];

  let rejectedAfterCheckedLayout = []

  let rejectedAfterChecked = [];

  let waitForPrepressToCheckLayout = []
  
  let readyToLayout = [];

  let waitForPrepressToCheck = [];

  let revisedOrder = [];

  let inQueueOrder = [];

  allOrders.map((data) => {
    return allQueues.map((el) => {
      const nowTime = new Date();
      const nowTimeString = nowTime.toISOString();

      const timestampDate = new Date(+data.timeStamp);

      const timestampDateString = timestampDate.toISOString();
      const isBefore15 = timestampDate.getHours() < 15;

      const isBefore17 = timestampDate.getHours() < 17;
      if (
        data.id == el.orderId &&
        data.status == "inQueue" &&
        isBefore15 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        inQueueOrder.push(data);
      }

      if (
        data.id == el.orderId &&
        data.status == "inQueue" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        inQueueOrder.push(data);
      }

      if (
        data.id == el.orderId &&
        data.status == "revised" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        revisedOrder.push(data);
      }

      if (
        data.id == el.orderId &&
        data.status == "revised" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        revisedOrder.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "waitForPrepressToCheck" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        waitForPrepressToCheck.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "waitForPrepressToCheck" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        waitForPrepressToCheck.push(data);
      }
      //   if (
      //     data.id == el.orderId &&
      //     data.status == "readyToLayout" &&
      //     isBefore15
      if (
        data.id == el.orderId &&
        data.status == "readyToLayout" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        readyToLayout.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "readyToLayout" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        readyToLayout.push(data);
      }
      //   ) {
      //     readyToLayout.push(data);
      //   }
      if (
        data.id == el.orderId &&
        data.status == "rejectedAfterChecked" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        rejectedAfterChecked.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "rejectedAfterChecked" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        rejectedAfterChecked.push(data);
      }

      ///
      if (
        data.id == el.orderId &&
        data.status == "rejectedAfterCheckedLayout" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        rejectedAfterCheckedLayout.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "rejectedAfterCheckedLayout" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        rejectedAfterCheckedLayout.push(data);
      }
      //
      if (
        data.id == el.orderId &&
        data.status == "waitForPrepressToCheckLayout" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        waitForPrepressToCheckLayout.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "waitForPrepressToCheckLayout" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        waitForPrepressToCheckLayout.push(data);
      }



      if (
        data.id == el.orderId &&
        data.status == "urgentJob" &&
        isBefore17 &&
        nowTimeString.slice(0, 10) == timestampDateString.slice(0, 10)
      ) {
        urgentJob.push(data);
      }
      if (
        data.id == el.orderId &&
        data.status == "urgentJob" &&
        nowTimeString.slice(0, 10) !== timestampDateString.slice(0, 10)
      ) {
        urgentJob.push(data);
      }
    });
  });
  const colors = [
    { color: "bg-green-500" },
    { color: "bg-red-500" },
    { color: "bg-blue-500" },
  ];

  return (
    <div className=" w-screen h-screen p-10">
      <div className="p- w-full h-full bg-white rounded-md ">
        <div className="flex flex-col sm:grid sm:grid-cols-4 sm:text-xl gap-2 sm:gap-5 p-2 text-xs">

          {/* 
  <div
    className={`${
      readyToLayout.length ? 'text-white bg-[#C8262D]' : 'bg-gray-300 text-black'
    } p-3 rounded shadow-md flex justify-between gap-5`}
  >
    <div>Ready To Layout Job :</div>
    <div className="font-bold text-xl">{readyToLayout.length}</div>
  </div> */}

          <div
            className={`${
              rejectedAfterCheckedLayout.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            }  p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Layout Rejected After Review :</div>
            <div className="font-bold text-5xl pr-5">
              {rejectedAfterCheckedLayout.length}
            </div>
          </div>
          <div
            className={`${
              waitForPrepressToCheckLayout.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            }  p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Awaiting Layout Check :</div>
            <div className="font-bold text-5xl pr-5">
              {waitForPrepressToCheckLayout.length}
            </div>
          </div>
          <div
            className={`${
              readyToLayout.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            }  p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Ready for Layout :</div>
            <div className="font-bold text-5xl pr-5">
              {readyToLayout.length}
            </div>
          </div>
          <div
            className={`${
              urgentJob.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            }  p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Urgent Job :</div>
            <div className="font-bold text-5xl pr-5">{urgentJob.length}</div>
          </div>
          <div
            className={`${
              revisedOrder.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            } p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Job Revised :</div>
            <div className="font-bold text-5xl pr-5">{revisedOrder.length}</div>
          </div>
          <div
            className={`${
              rejectedAfterChecked.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            }  p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Rejected After Review :</div>
            <div className="font-bold text-5xl pr-5">
              {rejectedAfterChecked.length}
            </div>
          </div>

          <div
            className={`${
              waitForPrepressToCheck.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            }  p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Awaiting Prepress Check :</div>
            <div className="font-bold text-5xl pr-5">
              {waitForPrepressToCheck.length}
            </div>
          </div>
   
   

          <div
            className={`${
              inQueueOrder.length
                ? "text-white bg-[#C8262D]"
                : "bg-gray-300 text-black"
            } p-3 rounded shadow-md flex justify-between items-center gap-5`}
          >
            <div className="pl-5 text-xl">Waiting in Queue :</div>
            <div className="font-bold text-5xl pr-5">{inQueueOrder.length}</div>
          </div>
        </div>

        {/* <div className="mt-5 overflow-y-scroll h-[60%] shadow-2xl ">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-500 sticky top-0">
              <tr className="text-white">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {allQueues.map((data, index) => {
                const matchingOrder = allOrders.find(
                  (el) => el.id === data.orderId
                );
                console.log(matchingOrder);
                if (matchingOrder) {
                  const timestampDate = new Date(+matchingOrder.timeStamp);

                  const isAfter15 = timestampDate.getHours() >= 15;

                  return (
                    <tr
                      key={matchingOrder.id}
                      className={
                        isAfter15
                          ? "bg-green-400 text-white"
                          : "bg-[#C8262D] text-white"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <DisplayDate timestamp={matchingOrder.timeStamp} />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {{
                          urgentJob: "Urgent Job",
                          readyToLayout: "Ready to Layout Job",
                          rejectedAfterChecked: "Rejected After Checked Job",
                          waitForPrepressToCheck:
                            "Waiting for Prepress to Check",
                          revised: "Revised Job",
                          inQueue: "New Job",
                        }[matchingOrder.status] || "Unknown Status"}
                      </td>
                    </tr>
                  );
                }

                return null;
              })}
            </tbody>
          </table>
        </div> */}
        {/* <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day, index) => (
            <div key={day} className="font-semibold text-gray-600">
              {day}
            </div>
          ))}
          {daysInWeek.map((date, index) => (
            <div
              key={index}
              className={`h-20 flex flex-col items-center justify-center rounded-lg cursor-pointer 
            ${
              selectedDate?.toDateString() === date.toDateString()
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-sm font-medium">{date.getDate()}</span>
              <span className="text-xs text-gray-500">
                {date.toLocaleDateString("default", { month: "short" })}
              </span>
         
            </div>
          ))}
        </div> */}
        <div className="p-4 mx-auto bg-white  rounded-lg w-full">
          <header className="flex justify-between items-center mb-4">
            <div className="text-xl sm:text-3xl font-semibold w-full flex  sm:justify-center px-5">
              <div className="flex flex-col items-center">
                <div className="">W : {currentWeek}</div>
                <div>
                  {startOfWeek.toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {endOfWeek.toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-row gap-2 absolute right-[5%]">
              <button
                onClick={prevWeek}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Prev
              </button>
              <button
                onClick={() => (window.location = "/queueDashBroad")}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Now
              </button>

              <button
                onClick={nextWeek}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Next
              </button>
            </div>
          </header>
        </div>
        <div className="  flex gap-2 items-center justify-center py-5">
          <div className="flex gap-2 ">
            <div className="w-5 h-5 bg-green-500 rounded-full"></div>
            <div>Total Job</div>
          </div>
          <div className="flex gap-2 ">
            <div className="w-5 h-5 bg-red-500 rounded-full"></div>
            <div>Hard Job</div>
          </div>
          <div className="flex gap-2 ">
            <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
            <div>Checked Job</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-5 pl-5 w-full  rounded-md  h-[100%] sm:h-[42%] items-end p-5 ">
          <div className="  flex  items-end gap-2 bg-gray-200 h-full  px-5 rounded-md w-[100%] sm:w-[30%]  ">
            {allPrepress.map((data, index) => {
              let personalTotalJob = weeklyReports.filter(
                (pl) => pl?.artworkOwner == data.email
              );

              return (
                <div key={index} className="flex flex-col   w-[15%]  ">
                  <div className="flex justify-center pb-2">
                    {
                      weeklyReports.filter(
                        (count) => count?.artworkOwner == data.email
                      ).length
                    }
                  </div>

                  <div className="bg-green-500  rounded-t-lg   ">
                    {weeklyReports.map((el, i) => {
                      if (el?.artworkOwner == data.email) {
                        return (
                          <div
                            style={{ height: "3px" }}
                            className="chart-bar h-[0px] opacity-0 transition-all duration-1000 ease-out transform opacity-100 "
                            key={i}
                          ></div>
                        );
                      }
                    })}
                  </div>
                  <div
                    onMouseEnter={() => setIsHoverPrepressTotal(data.email)}
                    onMouseLeave={() => setIsHoverPrepressTotal(false)}
                    onClick={() => {
                      setIsSelectPrepress(data.email);
                      setSelectPrepressData(personalTotalJob);
                      setIsSelectColor(0);
                    }}
                    className="flex flex-col items-center "
                  >
                    {isHoverPrepressTotal == data.email && (
                      <div className="bg-gray-600 p-2 rounded-md text-white bg-opacity-70 absolute -translate-y-20">
                        <div>{data.email} </div>
                        <div>{data.firstName + " (" + data.nickName + ")"}</div>
                      </div>
                    )}
                    <img
                      className="w-[40px] h-[40px] -translate-y-[10px] "
                      src={`../src/assets/prepress/${data.email.slice(
                        0,
                        4
                      )}.png`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="   flex items-end gap-2 bg-gray-200 h-full px-5 rounded-md w-[100%] sm:w-[30%]">
            {allPrepress.map((data, index) => {
              let orderForEachPrepress = weeklyReports.filter(
                (order) => order?.artworkOwner === data.email
              );

              let targetSubOrder = allSubOrder.filter((subOrder) => {
                let count = 0;

                const properties = [
                  "cyan",
                  "magenta",
                  "yellow",
                  "black",
                  "white",
                  "subPantone1",
                  "subPantone2",
                  "subPantone3",
                  "subPantone4",
                  "removeGlue",
                  "typeOfCoated",
                  "typeOfUv",
                  "coldFoil",
                ];

                properties.forEach((property) => {
                  const match = orderForEachPrepress.some(
                    (order) =>
                      order.orderId === subOrder?.orderId && subOrder[property]
                  );
                  if (match) count++;
                });

                return count >= 6;
              });

              return (
                <div key={index} className="flex flex-col  w-[15%] ">
                  <div className="flex justify-center pb-2 flex-col">
                    <div className="flex justify-center pb-2">
                      {targetSubOrder.length}
                    </div>
                  </div>
                  <div className="bg-red-500 text-red-500 rounded-t-lg">
                    {targetSubOrder.map((el, i) => {
                      if (el.orderId) {
                        return <div key={i} className="h-[3px]"></div>;
                      }
                    })}
                  </div>
                  <div
                    onMouseEnter={() => setIsHoverPrepressHard(data.email)}
                    onMouseLeave={() => {
                      setIsHoverPrepressHard(false);
                    }}
                    onClick={() => {
                      setIsSelectPrepress(data.email);
                      setSelectPrepressData(targetSubOrder);
                      setIsSelectColor(1);
                    }}
                    className=" flex flex-col items-center "
                  >
                    {isHoverPrepressHard == data.email && (
                      <div className="bg-gray-600 p-2 rounded-md text-white bg-opacity-70 absolute -translate-y-20">
                        <div>{data.email} </div>
                        <div>{data.firstName + " (" + data.nickName + ")"}</div>
                      </div>
                    )}
                    <img
                      className="w-[40px] h-[40px] -translate-y-[10px] "
                      src={`../src/assets/prepress/${data.email.slice(
                        0,
                        4
                      )}.png`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="  flex items-end gap-2 bg-gray-200 h-full px-5 rounded-md w-[100%] sm:w-[30%]">
            {allPrepress.map((data, index) => {
              let personalTotalJob = weeklyReports.filter(
                (pl) => pl?.artworkChecker == data.email
              );

              return (
                <div key={index} className="flex flex-col   w-[15%] ">
                  <div className="flex justify-center pb-2">
                    {
                      weeklyReports.filter(
                        (count) => count?.artworkChecker == data.email
                      ).length
                    }
                  </div>
                  <div className="bg-blue-500 text-blue-500 rounded-t-lg">
                    {weeklyReports.map((el, i) => {
                      if (el?.artworkChecker == data.email) {
                        return (
                          <div className="h-[3px]" key={i}>
                            {" "}
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div
                    onMouseEnter={() => setIsHoverPrepressChecked(data.email)}
                    onMouseLeave={() => setIsHoverPrepressChecked(false)}
                    onClick={() => {
                      setIsSelectPrepress(data.email);
                      setSelectPrepressData(personalTotalJob);
                      setIsSelectColor(2);
                    }}
                    className="flex flex-col items-center"
                  >
                    {isHoverPrepressChecked == data.email && (
                      <div className="bg-gray-600 p-2 rounded-md text-white bg-opacity-70 absolute -translate-y-20">
                        <div>{data.email} </div>
                        <div>{data.firstName + " (" + data.nickName + ")"}</div>
                      </div>
                    )}
                    <img
                      className="w-[40px] h-[40px] -translate-y-[10px] "
                      src={`../src/assets/prepress/${data.email.slice(
                        0,
                        4
                      )}.png`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isSelectPrepress && (
        <div
          className={`w-[60%]  h-[50%]  ${colors[isSelectColor].color} absolute top-[20%] left-[50%] transform -translate-x-1/2 rounded-lg shadow-lg p-6`}
        >
          <div className="text-2xl font-bold text-white mb-4 flex justify-between">
            <div>{isSelectPrepress.slice(0,4)}</div>
            <div
              className="cursor-pointer"
              onClick={() => setIsSelectPrepress(false)}
            >
              X
            </div>
          </div>
          <div className=" flex sm:flex-col flex-wrap h-[90%] gap-1  p- rounded-lg overflow-scroll">
            {selectPrepressData.map((data, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col h-[20%] w-[100%] sm:w-[32%]  items-center bg-white shadow-sm  "
                >
                  <div className=" font-semibold">
                    {"No."} {i + 1}
                  </div>
                  <div className=" font-semibold">{data.orderNumber}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
