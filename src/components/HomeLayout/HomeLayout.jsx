import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";

export const HomeLayout = () => {
  return (
    <div className="container py-4 text-center">
      <div className="row gx-5">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
