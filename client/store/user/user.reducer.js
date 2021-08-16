import { userReducerActionTypes } from "./user.actionTypes";

export const userReducerInitialState = {
  users: [],
};

export const userReducer = (userState = userReducerInitialState, action) => {
  switch (action.type) {
    case userReducerActionTypes.SET_USERS_STATE :
        return {...userState,...action.payload}
    default:
      return userState;
  }
};
