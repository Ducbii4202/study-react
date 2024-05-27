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
  //... ( là copy mảng hoặc data mà ta có)
  handleAddNewUser = (userObj) => {
    console.log(userObj);
    this.setState({ listUser: [userObj, ...this.state.listUser] });
  };
  handleDeleteUser = (userId) => {
    console.log(userId);
    let listUserClone = [...this.state.listUser];
  };
  render() {
    return (
      <>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser}></AddUserInfor>
        <br /> <br />
        <DisplayInfor listUser={this.state.listUser}></DisplayInfor>
      </>
    );
  }
}

export default MyComponent;
