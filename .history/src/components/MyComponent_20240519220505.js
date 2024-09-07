// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
        <br /> <br />
        <DisplayInfor></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
