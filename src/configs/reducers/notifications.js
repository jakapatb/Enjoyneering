import {FETCH_NOTI,FETCH_NOTI_SUCCESS} from "../constants"

const initialState = {
    data: [],
    hasNoti: false,
    length :0
};


export default (state=initialState,action)=>{
    switch (action.type) {
      case FETCH_NOTI:
        return { ...state, hasNoti: false };
      case FETCH_NOTI_SUCCESS:
        return { ...state, hasNoti: true, data: action.payload ,length:action.payload.filter(noti=>!noti.seen).length };
      default:
        return state;
    }
}