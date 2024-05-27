import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowListUser: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      document.title = "Bii";
    }, 1000);
  }

  handleShowHide = () => {
    this.setState({
      // ! = Toggle (on/off)
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    const { listUser } = this.props;
    // === const listUser = this.props.listUser;
    //props=> viết tắt properties
    return (
      //map() sẽ trả ra 1 mảng mới
      <div className="display-infor-container">
        {/* <img src={logo} /> */}
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowListUser === true
              ? "Hide list user"
              : "Show list user"}
          </span>
        </div>
        {this.state.isShowListUser && (
          <>
            {listUser.map((item) => {
              return (
                <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                  <div>
                    <div>My name's {item.name}</div>
                    <div>My age's {item.age}</div>
                    <div>My address {item.address}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                    <hr />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
