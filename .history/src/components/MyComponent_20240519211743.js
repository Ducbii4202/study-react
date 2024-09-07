// class component
// function component

import React from "react";
import UserInfor from "./UserInfor";

// eslint-disable-next-line no-unused-vars
class MyComponent extends React.Component {
  //JSX
  state = {
    name: "Bii",
    address: "Xuan Hung",
    age: 22,
  };
  hanldeOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    alert("me");
  };
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
      </div>
    );
  }
}

export default MyComponent;
