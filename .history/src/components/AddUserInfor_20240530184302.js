import React, { useState } from "react";

// const AddUserInfor = (props) => {
 

//   const hanldeOnChangeInput = (event) => {
//     setName(event.target.value);
//   };
//   const hanldeOnChangeAge = (event) => {
//     setAge(event.target.value);
//   };
//   const hanldeOnChangeAddress = (event) => {
//     setAddress(event.target.value);
//   };
//   const handleOnSubmit = (event) => {
//     event.preventDefault();
//     props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: name,
//       age: age,
//       address: address,
//     });
//   };
//   return (
//     <div>  My name is {name} and I'm from {age}, I'm from {address}
      
<form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your Name:</label>
        <input type="text" onChange={(event) => hanldeOnChangeInput(event)} />
        <label>Your Age:</label>
        <input type="text" onChange={(event) => hanldeOnChangeAge(event)} />
        <label>Your Address:</label>
        <input type="text" onChange={(event) => hanldeOnChangeAddress(event)} />
        <button>Submit</button>
      </form>
//     </div>
//   );
// };
const AddUserInfor = (props) => {
 const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const hanldeOnChangeInput = (event) => {
    setName(event.target.value);
  }
  return(
    
  )
}

export default AddUserInfor;
