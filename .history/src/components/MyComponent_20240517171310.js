// class component
// function component

import React from "react";

// eslint-disable-next-line no-unused-vars
class MyComponent extends React.Component {
  //JSX
  state = {
    name: "Bii",
    address: "Hoi Dan It",
    age: 22,
  };
  render() {
    return <div>My name is {this.state.name}</div>;
  }
}

export default MyComponent;
