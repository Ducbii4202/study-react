import React from "react";

const UserInfor = () => {
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
};

export default UserInfor;
