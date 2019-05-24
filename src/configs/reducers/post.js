import {
  FETCH_POST,
  FETCH_POST_FAIL,
  FETCH_POST_SUCCESS,
  FETCH_POST_CLEAR,
  FETCH_POST_SET_COMMENT,
  FETCH_POST_ADD_COMMENT,
  FETCH_POST_OLD_COMMENT,
  FETCH_POST_DELETE_COMMENT,
  FETCH_POST_PREUPLOAD,
  FETCH_POST_UPLOADED
} from "../constants";
var _ = require("lodash");
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
      return { ...state, isFetching: true, isUpload: [] };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        public: action.public,
        id: action.id,
        isFetching: false,
        hasPost: true
      };
    case FETCH_POST_SET_COMMENT:
      return {
        ...state,
        comments: action.payload,
        hasComments: true
      };
    case FETCH_POST_ADD_COMMENT:
      return {
        ...state,
        comments: _.uniqWith(
          state.comments.concat(action.payload),
          _.isEqual
        ),
        hasComments: true
      };
    case FETCH_POST_OLD_COMMENT:
      return {
        ...state,
        comments: _.uniqWith(
          action.payload.concat(state.comments),
          _.isEqual
        ),
        hasComments: true
      };
    case FETCH_POST_DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment)=>comment.id!==action.payload),
        hasComments: true
      };
    case FETCH_POST_PREUPLOAD:
      return {
        ...state,
        isFetching: true,
        isUpload: Array.from(Array(action.length + 1)).map((_, i) => false)
      };
    case FETCH_POST_UPLOADED:
      let isUpload = state.isUpload;
      isUpload[action.index] = true;
      return { ...state, isUpload: isUpload, id: action.postId };
    case FETCH_POST_CLEAR:
      return initialState;
    case FETCH_POST_FAIL:
      return { ...state, isError: true, isFetching: false, hasPost: false };
    default:
      return state;
  }
};
