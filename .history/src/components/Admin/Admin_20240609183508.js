import React from "react";
import SideBar from "./SideBar";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar></SideBar>
      </div>
      <div className="admin-content"></div>
    </div>
  );
};

export default Admin;
