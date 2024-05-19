import React from "react";

class DisplayInfor extends React.Component {
  render() {
    const { listUser } = this.props;
    // === const listUser = this.props.listUser;
    //props=> viết tắt properties
    return (
      //map() sẽ trả ra 1 mảng mới
      <div>
        {/* {listUser.map((user) => {
          return (
            <div key={user.id}>
              <div>My name's {user.name}</div>
              <div>My age's {user.age}</div>
              <hr />
            </div>
          );
        })} */}
        {listUser.map((item) => {
          return (
            <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
              <div>My name's {item.name}</div>
              <div>My age's {item.age}</div>
              <div>My address {item.address}</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayInfor;
