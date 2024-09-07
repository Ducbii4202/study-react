import React from "react";

class DisplayInfor extends React.Component {
  render() {
    const { listUser } = this.props;
    console.log(listUser);
    // === const listUser = this.props.listUser;
    //props=> viết tắt properties
    return (
      <div>
        {listUser.map((user) => {
          console.log(user);
          return (
            <div>
              <div>My name's {user.name}</div>
              <div>My age's {user.age}</div>
              <hr />
            </div>
          );
        })}
        {/* <div>My name's {name}</div>
        <div>My age's {age}</div>
        <hr />
        
        <hr />
        <div>My name's {name}</div>
        <div>My age's {age}</div>
        <hr /> */}
      </div>
    );
  }
}

export default DisplayInfor;
