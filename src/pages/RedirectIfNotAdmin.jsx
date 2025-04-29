import { useAuth } from "./hooks/use-auth";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
export default function RedirectIfNotAdmin ({ children}) {
  const { loading, authUser } = useAuth();

 if(authUser.role !== "ADMIN") {
    return <Navigate to ="/" />
 }
  return children;
}

