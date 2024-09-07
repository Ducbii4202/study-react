import React from "react";

class DisplayInfor extends React.Component {
  render() {
    const { listUser } = this.props;
    // === const listUser = this.props.listUser;
    //props=> viết tắt properties
    return (
      <div>
        {/* <div>My name's {name}</div>
        <div>My age's {age}</div>
        <hr />
        <div>My name's {name}</div>
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
