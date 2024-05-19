import React from "react";

class UserInfor extends React.Component {
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
  hanldeOnChangeAge = (event) => {
    this.setState({
      age: event.target.value,
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
          <label>Your Name:</label>
          <input
            type="text"
            onChange={(event) => this.hanldeOnChangeInput(event)}
          />
          <button>Submit</button>
          <label>Your Name:</label>
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

export default UserInfor;
