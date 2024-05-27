import React from "react";
import "./DisplayInfor.scss";

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

const DisplayInfor = (props) => {
  const { listUser } = props;
  // === const listUser = this.props.listUser;
  //props=> viết tắt properties
  return (
    //map() sẽ trả ra 1 mảng mới
    <div className="display-infor-container">
      {true && (
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
                  <button onClick={() => props.handleDeleteUser(item.id)}>
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
};

export default DisplayInfor;
