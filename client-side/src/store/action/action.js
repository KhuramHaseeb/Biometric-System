
import ActionTypes from "../constant/constant";


import APIservice from "../../components/APIservice/allApi";
let ApiService = new APIservice();

export function changeActiveForm(val) {
  return (dispatch) =>
    dispatch({ type: ActionTypes.changeActiveForm, payload: val });
}

export function userLoginDetails(val) {
  // console.log(val);
  return (dispatch) => dispatch({ type: "userDetails", payload: val });
}

export function loggedIn(val) {
  // console.log(val);
  return (dispatch) => dispatch({ type: "loggedIn", payload: val });
}

export function signOut() {
  // console.log(val);
  localStorage.clear();
  return (dispatch) => dispatch({ type: "loggedIn", payload: false });
}



export const first_case_one = () => async (dispatch) => {

  try {
    let res = await ApiService.get_employ_data();
    
    
    
    dispatch({
      type: ActionTypes.FETCH_ALL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type:ActionTypes.ERROR,
      payload: "Errrorr ",
    });
  }
 };

 export const employeByid = (id) => async (dispatch) => {

  try {
    let res = await ApiService.sendEmploye_byid(id);
    
    
    dispatch({
      type:ActionTypes.EMPLOYEE_BYID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ERROR,
      payload: "Errrorr ",
    });
  }
 };



