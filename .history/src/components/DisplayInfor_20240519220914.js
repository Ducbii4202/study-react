import React from "react";

class DisplayInfor extends React.Component {
  render() {
    console.log(this.props);
    //props=> viết tắt properties
    return (
      <div>
        <div>My name's Bii</div>
        <div>My age's 23</div>
      </div>
    );
  }
}

export default DisplayInfor;
