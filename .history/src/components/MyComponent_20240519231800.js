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
        <DisplayInfor name="hoidanIT" age="24"></DisplayInfor>
        <hr />
        <DisplayInfor name="hoidanAI" age={23}></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
