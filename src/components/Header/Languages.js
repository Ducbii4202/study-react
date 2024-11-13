import React from "react";
import { NavDropdown } from "react-bootstrap";

const Languages = (props) => {
  return (
    <>
      <NavDropdown
        title="Viet Nam"
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Viet Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Languages;
