import * as XLSX from "xlsx";
import Route from "./router/Route";
import EvaLoading from "./component/EvaLoading";
import { useAuth } from "./hooks/use-auth";
import { useEffect } from "react";
import { useState } from "react";
import Maintance from "./component/Maintance";
function App() {
  
  const { loading } = useAuth();

  return (
    <div>
      {loading ? <EvaLoading /> : <Route />}
      {/* <Maintance />  */}
    </div>
  );
}

export default App;


