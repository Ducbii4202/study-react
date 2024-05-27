// class AddUserInfor extends React.Component {
//   state = {
//     name: "Bii",
//     address: "Xuan Hung",
//     age: 22,
//   };
//   hanldeOnChangeInput = (event) => {
//     this.setState({
//       name: event.target.value,
//     });
//   };
//   hanldeOnChangeAge = (event) => {
//     this.setState({
//       age: event.target.value,
//     });
//   };
//   hanldeOnChangeAddress = (event) => {
//     this.setState({
//       address: event.target.value,
//     });
//   };
//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//       address: this.state.address,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and I'm from {this.state.age}, I'm from{" "}
//         {this.state.address}
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <label>Your Name:</label>
//           <input
//             type="text"
//             onChange={(event) => this.hanldeOnChangeInput(event)}
//           />
//           <label>Your Age:</label>
//           <input
//             type="text"
//             onChange={(event) => this.hanldeOnChangeAge(event)}
//           />
//           <label>Your Address:</label>
//           <input
//             type="text"
//             onChange={(event) => this.hanldeOnChangeAddress(event)}
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

import React, { useState } from "react";

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const hanldeOnChangeInput = (event) => {
    setName({
      name: event.target.value,
    });
  };
  const hanldeOnChangeAge = (event) => {
    setAge({
      age: event.target.value,
    });
  };
  const hanldeOnChangeAddress = (event) => {
    setAddress({
      address: event.target.value,
    });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
      address: this.state.address,
    });
  };
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
};

export default AddUserInfor;