import ActionTypes from "../constant/constant";

const INITIAL_STATE = {
  activeForm: 0,
  isLogin: false,
  userDetails: {},
  employee_data: [],
  employee_Byid:[]
};

const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.changeActiveForm:
      return {
        ...state,
        activeForm: action.payload,
      };
    case "userDetails":
      console.log("userDetails");
      return {
        ...state,
        userDetails: action.payload
      };
    case "loggedIn":
      console.log("loggedIn");
      return {
        ...state,
        isLogin: action.payload,
      };


      case ActionTypes.FETCH_ALL:
      
      return {
        ...state,
        employee_data:action.payload,
      };
      case ActionTypes.EMPLOYEE_BYID:
      
        return {
          ...state,
          employee_Byid: action.payload,
        };



    default:
      return state;
  }
};

export default Reducer;
