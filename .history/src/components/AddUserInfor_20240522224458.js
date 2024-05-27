import React from "react";

class AddUserInfor extends React.Component {
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
  hanldeOnChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
      address: this.state.address,
    });
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.age}, I'm from{" "}
        {this.state.address}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your Name:</label>
          <input
            type="text"
            onChange={(event) => this.hanldeOnChangeInput(event)}
          />
          <label>Your Age:</label>
          <input
            type="text"
            onChange={(event) => this.hanldeOnChangeAge(event)}
          />
          <label>Your Address:</label>
          <input
            type="text"
            onChange={(event) => this.hanldeOnChangeAddress(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfor;
