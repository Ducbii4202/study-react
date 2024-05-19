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
  handleClick = (event) => {
    console.log("click");
    this.setState({
      name: " Thang",
      age: Math.floor(Math.random() * 100 + 1),
    });
  };

  hanldeOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  hanldeOnChangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label> Your name</label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => this.hanldeOnChangeInput(event)}
          />
          <button>Submit</button>
          <label> Your age</label>
          <input
            value={this.state.age}
            type="text"
            onChange={(event) => this.hanldeOnChangeAge(event)}
          />
          <button>Submit</button>
        </form>
        <UserInfor></UserInfor>
      </div>
    );
  }
}

export default MyComponent;
