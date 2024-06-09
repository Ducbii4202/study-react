import React from "react";
import SideBar from "./SideBar";
import "./Admin.scss";

const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar />
      </div>
      <div className="admin-content">Content stay here</div>
    </div>
  );
};

export default Admin;
