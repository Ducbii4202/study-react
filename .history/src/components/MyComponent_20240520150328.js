// class component
// function component

import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "hoidanIT", age: "16", address: " Xuan Loc" },
      { id: 2, name: "Thanh", age: "25", address: " Thong Nhat" },
      { id: 3, name: "Thang", age: "26", address: " Trang Boom" },
    ],
  };
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
        <br /> <br />
        <DisplayInfor listUser={this.state.listUser}></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
