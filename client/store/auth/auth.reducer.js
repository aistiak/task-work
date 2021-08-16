import { authActionTypes } from "./auth.actionType"




export const authInitialState = {
    token : '',
    userId : '',
    name : '' ,
    isLoggedIn : false 
}


export const authReducer = (
    authState = authInitialState ,
    action 
) => {
    switch(action.type){
        case authActionTypes.SET_AUTH_STATE :
            return { ...authState , ...action.payload }
        default :
            return authState 
    }
}
    