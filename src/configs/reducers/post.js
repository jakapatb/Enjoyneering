import {
  FETCH_POST,
  FETCH_POST_FAIL,
  FETCH_POST_SUCCESS,
  FETCH_POST_CLEAR,
  FETCH_POST_ADD_COMMENT
} from "../constants";

const initialState = {
  data: {},
  comments: {},
  isFetching: false,
  public:true,
  hasPost: false,
  hasComments:false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, isFetching: true };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        public: action.public,
        isFetching: false,
        hasPost: true
      };
    case FETCH_POST_ADD_COMMENT:
      return {
        ...state,
        comments: action.payload, hasComments: true,
      };
    case FETCH_POST_CLEAR:
      return initialState;
    case FETCH_POST_FAIL:
      return { ...state, isError: true, isFetching: false, hasPost: false };
    default:
      return state;
  }
};
