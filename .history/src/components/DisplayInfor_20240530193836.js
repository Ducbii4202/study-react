import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
// Step 1: có kiểm soát Data phải dùng Stateful
// class DisplayInfor extends React.Component {
//   render() {
//     const { listUser } = this.props;
//     // === const listUser = this.props.listUser;
//     //props=> viết tắt properties
//     return (
//       //map() sẽ trả ra 1 mảng mới
//       <div className="display-infor-container">
//         {true && (
//           <>
//             {listUser.map((item) => {
//               return (
//                 <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
//                   <div>
//                     <div>My name's {item.name}</div>
//                     <div>My age's {item.age}</div>
//                     <div>My address {item.address}</div>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(item.id)}
//                     >
//                       Delete
//                     </button>
//                     <hr />
//                   </div>
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

// Step 2: ko có trạng thái dùng Stateless

const DisplayInfor = (props) => {
  const { listUsers } = props;
  const [isShowHide, setShowHide] = useState(true);
  const hanldeShowHide = () => {
    setShowHide(!isShowHide);
  };
  useEffect(() => {
    setTimeout(() => {
      document.title = "Bii";
    }, 3000);
  }, []);
  return (
    <div className="display-infor-container">
      <div>
        <span onClick={() => hanldeShowHide()}>
          {isShowHide === true ? "Hide list users" : "Show list users"}
        </span>
      </div>
      {isShowHide && (
        <>
          {listUsers.map((item) => {
            return (
              <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                <div>
                  <div>My name's {item.name}</div>
                  <div>My age's {item.age}</div>
                  <div>My address {item.address}</div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(item.id)}>
                    Delete
                  </button>
                  <hr />
                </div>{" "}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfor;
