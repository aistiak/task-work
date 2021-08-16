import userApi from "../../api/userApi";
import { userReducerActionTypes } from "./user.actionTypes";

export const setusersState = (state) => async (dispatch) => {
  dispatch({
    type: userReducerActionTypes.SET_USERS_STATE,
    payload: state,
  });
};

export const getUsers = () => async (dispatch) => {
    const res = await userApi.getUsers()
    console.log(res)
    console.log(res.data)
    const users = res.data 
    dispatch(setusersState({users}))
}