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
    console.log(this.state);
    this.props.handleAddNewUser({
      id: "hackcode",
      name: "eric",
      age: "22",
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
          <button>Submit</button>
          <label>Your Age:</label>
          <input
            type="text"
            onChange={(event) => this.hanldeOnChangeAge(event)}
          />
          <button>Submit</button>
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
