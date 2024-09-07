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
  handleClick(event) {
    console.log("click");
    this.setState({
      name: " Thang",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }
  handleOnMoverOver(event) {
    console.log(event.pageX);
  }
  hanldeOnChangeInput = (event) => {
    console.log(event.target.value);
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.age}
        <form>
          <input
            type="text"
            onChange={(event) => {
              this.hanldeOnChangeInput(event);
            }}
          />
          <button>Submit</button>
        </form>
        <button
          onMouseOver={(event) => {
            this.handleOnMoverOver(event);
          }}
        >
          Hover
        </button>
      </div>
    );
  }
}

export default MyComponent;
