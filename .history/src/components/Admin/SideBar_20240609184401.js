import React from "react";
// import "react-pro-sidebar/dist/css/style.css";
import { ProSidebar, MenuItem, Menu, SubMenu } from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";

const SideBar = (props) => {
  return (
    <>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
};

export default SideBar;
