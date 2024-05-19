// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUser: [{ id: 1, name: "hoidanIT", age: "24" }],
  };
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
