import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar />
      </div>
      <div className="admin-content">
        <FaBars onClick={()=>setCollapsed(1collapsed)}></FaBars>
        Content stay here
      </div>
    </div>
  );
};

export default Admin;
