import { FETCH_USER, FETCH_USER_SUCCESS } from "../constants"

const initialState = {
    data: {},
    isAuth: false,
    status : "visitor"
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER: //unlogin yet
            return { ...state, isAuth: false };
        case FETCH_USER_SUCCESS: //logined
            return { ...state,isAuth:true ,data:action.payload , status:action.status};
        default:
            return state;
    }
}