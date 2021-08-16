import authApi from "../../api/authApi";
import { authActionTypes } from "./auth.actionType";

export const setAuthState = (state) => async (dispatch) => {
  dispatch({
    type: authActionTypes.SET_AUTH_STATE,
    payload: state,
  });
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    console.log(email);
    const res = await authApi.login({ email, password });
    console.log(res);
    // return email
    const { accessToken: token, userId , name } = res?.data;
    console.log(token);
    if (token) {
      dispatch(
        setAuthState({ token: token, isLoggedIn: true, userId: userId , name : name })
      );
      return res;
    } else throw "login error";
  };

export const logout = () => async (dispatch) => {
  dispatch(
    setAuthState({
      isLoggedIn: false,
      token: "",
      userId: "",
    })
  );
};

export const signup =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    const res = await authApi.signup({ name, email, password });
    console.log(res);
    console.log(res.data);
    if (res.data == "user exists") {
      throw "user exists";

    }else{
      return res;
    }
  };
