import {
  FETCH_POST,
  FETCH_POST_FAIL,
  FETCH_POST_SUCCESS,
  FETCH_POST_CLEAR,
  FETCH_POST_ADD_COMMENT,
  FETCH_POST_PREUPLOAD,
  FETCH_POST_UPLOADED
} from "../constants";

const initialState = {
  data: {},
  comments: [],
  isFetching: false,
  id:"",
  public:true,
  hasPost: false,
  hasComments:false,
  isError: false,
  isUpload:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, isFetching: true ,isUpload:[]};
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        public: action.public,
        id:action.id,
        isFetching: false,
        hasPost: true
      };
    case FETCH_POST_ADD_COMMENT:
      return {
        ...state,
        comments: action.payload, hasComments: true,
      };
    case FETCH_POST_PREUPLOAD:  
    return {...state,
      isFetching:true,
      isUpload:Array.from(Array(action.length+1)).map((_, i) => false)
    };
    case FETCH_POST_UPLOADED : 
    let isUpload = state.isUpload
    isUpload[action.index] = true
    return {...state,
    isUpload:isUpload ,id:action.postId
  }
    case FETCH_POST_CLEAR:
      return initialState;
    case FETCH_POST_FAIL:
      return { ...state, isError: true, isFetching: false, hasPost: false };
    default:
      return state;
  }
};
