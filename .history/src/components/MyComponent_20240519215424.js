// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

// eslint-disable-next-line no-unused-vars
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
        <DisplayInfor></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
