// class component
// function component

import React from "react";

// eslint-disable-next-line no-unused-vars
class MyComponent extends React.Component {
  //JSX
  state = {
    name: "Bii",
    address: "Xuan Hung",
    age: 22,
  };
  handleClick() {
    console.log("Click");
  }
  handleOnMoverOver(evnet) {
    console.log(evnet);
  }
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
        <button onClick={this.handleClick}>Click me</button>
        <button onMouseOver={this.handleOnMoverOver}>Hover</button>
      </div>
    );
  }
}

export default MyComponent;