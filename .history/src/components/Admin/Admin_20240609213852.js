import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header"></div>
        <div className="admin-main"></div>
        <FaBars onClick={() => setCollapsed(!collapsed)} />
        Content stay here
      </div>
    </div>
  );
};

export default Admin;
