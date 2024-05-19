import React from "react";

class DisplayInfor extends React.Component {
  handleShowHide = () => {
    alert("me");
  };
  render() {
    const { listUser } = this.props;
    // === const listUser = this.props.listUser;
    //props=> viết tắt properties
    return (
      //map() sẽ trả ra 1 mảng mới
      <div>
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            Hide List User:
          </span>
        </div>
        {true && (
          <div>
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
        )}
      </div>
    );
  }
}

export default DisplayInfor;
