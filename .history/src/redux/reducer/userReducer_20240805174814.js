import { INCREMENT, DECREMENT } from "../action/counterAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    img: "",
    role: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USER_LOGIN_SUCCESS":
      console.log("check acction", action);
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          img: "",
          role: "",
        },
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default userReducer;
