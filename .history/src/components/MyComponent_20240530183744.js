// class component
// function component

import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// const MyComponent = (props) => {
//   const [listUsers, setListUsers] = useState();
//
//   const handleAddNewUser = (userObj) => {
//     setListUsers([userObj, ...listUsers]);
//   };

//   const handleDeleteUser = (userId) => {
//     let listUsersClone = listUsers;
//     listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//     setListUsers(listUsersClone);
//   };
//   return (

//   );
// };
const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    [
      { id: 1, name: "hoidanIT", age: "16", address: " Xuan Loc" },
      { id: 2, name: "Thanh", age: "25", address: " Thong Nhat" },
      { id: 3, name: "Thang", age: "26", address: " Trang Boom" },
    ],
  ]);
  //... ( là copy mảng hoặc data mà ta có)
  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };
  const handleDeleteUser = (userId) => {
    let listUsersClone = listUsers;
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
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
      <div className="b"></div>
    </>
  );
};

export default MyComponent;
