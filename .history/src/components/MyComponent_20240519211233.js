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
        My name is {this.state.name} and I'm from {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => this.hanldeOnChangeInput(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
