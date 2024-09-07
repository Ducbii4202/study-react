// class component
// function component

import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//   state = {
//     listUser: [
//       { id: 1, name: "hoidanIT", age: "16", address: " Xuan Loc" },
//       { id: 2, name: "Thanh", age: "25", address: " Thong Nhat" },
//       { id: 3, name: "Thang", age: "26", address: " Trang Boom" },
//     ],
//   };
//   //... ( là copy mảng hoặc data mà ta có)
//   handleAddNewUser = (userObj) => {
//     console.log(userObj);
//     this.setState({ listUser: [userObj, ...this.state.listUser] });
//   };

//   handleDeleteUser = (userId) => {
//     let listUsersClone = this.state.listUser;
//     listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUser: listUsersClone,
//     });
//   };
//   render() {
//     return (
//      <>
//         <AddUserInfor handleAddNewUser={this.handleAddNewUser}></AddUserInfor>
//         <br /> <br />
//         <DisplayInfor
//           listUser={this.state.listUser}
//           handleDeleteUser={this.handleDeleteUser}
//         ></DisplayInfor>
//       </>
//     );
//   }
// }
const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "hoidanIT", age: "16", address: " Xuan Loc" },
    { id: 2, name: "Thanh", age: "25", address: " Thong Nhat" },
    { id: 3, name: "Thang", age: "26", address: " Trang Boom" },
  ]);

  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };

  const handleDeleteUser = (userId) => {
    listUsers.filter((item) => item.id !== userId);
    setListUsers(listUsers);
  };
  return (
    <>
      <div className="a">
        <AddUserInfor handleAddNewUser={handleAddNewUser}></AddUserInfor>
        <br /> <br />
        <DisplayInfor
          listUsers={listUsers}
          handleDeleteUser={handleDeleteUser}
        ></DisplayInfor>
      </div>
    </>
  );
};
export default MyComponent;
