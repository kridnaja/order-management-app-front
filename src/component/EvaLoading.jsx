import { AiOutlineLoading } from "react-icons/ai";
import React from 'react'




export default function EvaLoading() {
  return (
    <div>
      <div className="flex h-screen w-screen items-center justify-center  ">
      
        <img src={"src/assets/logo.svg"}  alt="" />
        <AiOutlineLoading className="animate-spin text-[200px] text-red-600 font-extrabold" />
      </div>
    </div>
  );
}
