// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "hoidanIT", age: "24" },
      { id: 2, name: "Thanh", age: "25" },
      { id: 3, name: "Thang", age: "26" },
    ],
  };
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
        <br /> <br />
        <DisplayInfor
          listUser={this.state.listUser}
          users={this.state.listUser}
        ></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
