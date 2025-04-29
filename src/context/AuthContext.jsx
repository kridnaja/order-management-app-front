/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import axios from "../config/axios";
import * as XLSX from "xlsx";
export const AuthContextProvider = createContext();

export default function AuthContext({ children }) {
  const [authUser, setAuthUser] = useState({ id: "" });

  const [loading, setLoading] = useState(false);

  ////////SALES STATES
  const [displayNewJobs, setDisplayNewJobs] = useState([]);
  const [displayInQueueJobs, setDisplayInQueueJobs] = useState([]);
  const [displayRejectedJobs, setDisplayRejectedJobs] = useState([]);
  const [displayWaitToConfirmJobs, setDisplayWaitToConfirmJobs] = useState([]);
  const [displayOnWorkingJobs, setDisplayOnWorkingJobs] = useState([]);
  const [displayCompletedJobs, setDisplayCompletedJobs] = useState([]);
  const [displayRevisedJobs, setDisplayRevisedJobs] = useState([]);
  const [displayOnHoldingJobs, setDisplayOnHoldingJobs] = useState([]);

  const [errorSalesReviseJob, setErrorSalesReviseJob] = useState("");

  const [errorSalesCreateExistedOrder, setErrorSalesCreateExistedOrder] = useState('')
  /////PREPRESS STATES
  const [displayPrepressNewJob, setDisplayPrepressNewJob] = useState("");
  const [
    displayPrepressWaitToConfirmJobs,
    setDisplayPrepressWaitToConfirmJobs,
  ] = useState([]);
  const [displayPrepressCompleted, setDisplayPrepressCompleted] = useState([]);
  const [displayPrepressWaitToCheck, setDisplayPrepressWaitToCheck] = useState(
    []
  );
  const [displayPrepressCompletedLayout, setDisplayPrepressCompletedLayout] =
    useState([]);
  const [displayPrepressChecking, setDisplayPrepressChecking] = useState([]);


  const [errorPrepressGetNewJob, setErrorPrepressGetNewJob] = useState("");
  const [successPrepressGetNewJob, setSuccessPrepressGetNewJob] = useState("");
  const [errorPrepressRejectNewJob, setErrorPrepresRejectNewJob] = useState("");

  const [isSales, setIsSales] = useState([]);
  /////// SALES FEATURE
  const salesCreateOrder = async (input) => {
    // setLoading(true)
   let response =  await axios
      .post(`/sales/createOrder`, { ...input, userId: authUser.id })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          window.location.href = "salesWorkPage";
        }, [500]);
      }).catch((res)=>{
        setErrorSalesCreateExistedOrder(res.response)})


  };

  const salesEditOrder = async (input) => {
    await axios.post(`/sales/editOrder`, { data:input, authUser: authUser});
    // const response = await axios
    //   .get(`/sales/readSelectedOrderToEdit?orderId=${input.id}`)
    //   .then((res) => setSalesSelectOrderToEdit(res.data));
    // if (response) {
    //   console.log("set")
    //   setSalesSelectOrderToEdit(response.data);
    // }
  };

  const salesDeleteOrder = async (input) => {
    setLoading(true);
    await axios.delete(`/sales/deleteOrder?targetId=${input.id}`).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    });
  };

  const salesAddOrderInQueueAfterGotRejected = async (input) => {
    setLoading(true);
    await axios
      .post(`/sales/addOrderInQueueAfterGotRejected`, input)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, [1000]);
      });
  };
  const salesReviseOrderAndAddInQueue = async (input) => {
    setLoading(true);
    await axios
      .post("/sales/reviseOrderAndAddInQueue", input)
      .then(() => setErrorSalesReviseJob(false))
      .catch((res) => setErrorSalesReviseJob(res.response.data));
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };
  const salesConfirmOrder = async (input) => {
    setLoading(true);
    await axios.post("/sales/confirmOrder", input);
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  const salesHoldOrder = async (input) => {
    setLoading(true);
    await axios.post("/sales/holdOrder", input);
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  //////// PREPRESS FEATURE
  const prepressGetNewJob = async () => {
    setLoading(true);
    const response = await axios
      .post("/prepress/getNewJob", authUser)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res.response;
      });
    if (response.status === 400) {
      setSuccessPrepressGetNewJob(false);
      setErrorPrepressGetNewJob(response.data);
    }
    if (response.status === 200) {
      setErrorPrepressGetNewJob(false);
      setSuccessPrepressGetNewJob(response.data);
    }
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  const prepressRejectNewJob = async (input) => {
    setLoading(true);

    setSuccessPrepressGetNewJob(false);
    setErrorPrepressGetNewJob(false);
    await axios
      .post("/prepress/rejectNewJob", { data: input, authUser: authUser })
      .then(() => setErrorPrepresRejectNewJob(false))
      .catch((res) => setErrorPrepresRejectNewJob(res.response.data));

    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  const prepressFinishNewJob = async (input) => {
    setLoading(true);
    setSuccessPrepressGetNewJob(false);
    setErrorPrepressGetNewJob(false);
    await axios.post("/prepress/finishNewJob", {data: input, authUser: authUser});
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  const prepressFinishJobAfterChecked = async (input) => {
    setLoading(true);
    setSuccessPrepressGetNewJob(false);
    setErrorPrepressGetNewJob(false);
    await axios.post("/prepress/finishJobAfterChecked", { data: input, authUser: authUser});
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  };

  const [selectSalesStatus, setSelectSalesStatus] = useState("");

  const reLoadFunction = (data) => {
    setLoading(true);

    setSelectSalesStatus(data);
    setTimeout(() => {
      setLoading(false);
    }, [500]);
  };
  /////// change langauge
  const [langData, setLangData] = useState([]);
  useEffect(() => {
    fetch("../public/textList_SalesWorkPage.xlsx")
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((ab) => {
        const wb = XLSX.read(ab, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setLangData(json);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (getAccessToken()) {
      axios.get("/auth/getMe").then((res) => {
        setAuthUser(res.data);
        ////sales
        axios
          .get(`/sales/readNewOrderAfterCreated?userId=${res.data.id}`)
          .then((res) => setDisplayNewJobs(res.data))
          .catch((err) => console.log(err));
        axios
          .get(`/sales/readFollowOrderAfterInQueue?userId=${res.data.id}`)
          .then((res) => setDisplayInQueueJobs(res.data));
        axios
          .get(`/sales/readFollowOrderAfterRejected?userId=${res.data.id}`)
          .then((res) => setDisplayRejectedJobs(res.data));
        axios
          .get(`/sales/readWaitToConfirmOrder?userId=${res.data.id}`)
          .then((res) => setDisplayWaitToConfirmJobs(res.data));
        axios
          .get(`/sales/readOnWorkingOrder?userId=${res.data.id}`)
          .then((res) => setDisplayOnWorkingJobs(res.data));
        axios
          .get(`/sales/readCompletedOrder?userId=${res.data.id}`)
          .then((res) => setDisplayCompletedJobs(res.data));
        axios
          .get(`/sales/readRevisedOrder?userId=${res.data.id}`)
          .then((res) => setDisplayRevisedJobs(res.data));
        axios
          .get(`/sales/readHoldingOrder?userId=${res.data.id}`)
          .then((res) => setDisplayOnHoldingJobs(res.data));
        ////prepress
        axios
          .get(`/prepress/readNewJob?email=${res.data.email}`)
          .then((res) => setDisplayPrepressNewJob(res.data));
        axios
          .get(`/prepress/readWaitToConfirm?email=${res.data.email}`)
          .then((res) => setDisplayPrepressWaitToConfirmJobs(res.data));
        axios
          .get(`/prepress/readCompleted?email=${res.data.email}`)
          .then((res) => setDisplayPrepressCompleted(res.data));
        axios
          .get(
            `/prepress/readWaitForPrepressToCheck?email=${res.data.email}`
          )
          .then((res) => setDisplayPrepressWaitToCheck(res.data));
        axios
          .get(`/prepress/readCompletedLayout?email=${res.data.email}`)
          .then((res) => setDisplayPrepressCompletedLayout(res.data));
        axios
          .get(`/prepress/readChecking?email=${res.data.email}`)
          .then((res) => setDisplayPrepressChecking(res.data));
        axios.get("/admin/readAllSales").then((res) => setIsSales(res.data));
      });
    }
  }, [loading]);

  const register = async (input) => {
    await axios.post("/auth/register", input);
  };

  const login = async (input) => {
    const response = await axios.post("/auth/login", input);
    setAuthUser(response.data.userAfterLogin);
    addAccessToken(response.data.accessToken);
    if (response.data.userAfterLogin.role == "SALES") {
      window.location.href = "salesWorkPage";
    }
    if (response.data.userAfterLogin.role == "PREPRESS") {
      window.location.href = "prepressWorkPage";
    }
    if (response.data.userAfterLogin.role == "ADMIN") {
      window.location.href = "adminWorkPage";
    }
  };

  const logout = async () => {
    axios.post("/auth/logout", authUser);
    removeAccessToken();
    window.location.href = "/";
  };
  return (
    <AuthContextProvider.Provider
      value={{
        //////
        login,
        register,
        selectSalesStatus,
        authUser,
        logout,
        loading,
        reLoadFunction,
        setLoading,
        ///////SALES
        salesCreateOrder,
        salesEditOrder,
        salesDeleteOrder,
        salesAddOrderInQueueAfterGotRejected,
        salesReviseOrderAndAddInQueue,
        salesConfirmOrder,
        salesHoldOrder,
        displayNewJobs,
        displayRejectedJobs,
        displayRevisedJobs,
        displayInQueueJobs,
        displayWaitToConfirmJobs,
        displayOnWorkingJobs,
        displayCompletedJobs,
        errorSalesReviseJob,
        displayOnHoldingJobs,
        errorSalesCreateExistedOrder,
        //////////PREPRESS
        prepressGetNewJob,
        prepressRejectNewJob,
        prepressFinishNewJob,
        prepressFinishJobAfterChecked,
        displayPrepressNewJob,
        displayPrepressWaitToConfirmJobs,
        displayPrepressCompleted,
        displayPrepressWaitToCheck,
        displayPrepressCompletedLayout,
        displayPrepressChecking,
        errorPrepressGetNewJob,
        successPrepressGetNewJob,
        errorPrepressRejectNewJob,
        // salesSelectOrderToEdit,
        isSales,
        //////LANG
        langData,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}
