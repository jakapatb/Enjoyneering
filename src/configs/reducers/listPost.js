import { FETCH_LIST, FETCH_LIST_FAIL, FETCH_LIST_RECENT, FETCH_LIST_POPULAR} from '../constants'
const initialState = {
    recent:[],
    popular:[],
    test:[],
    isFetching: false,
    hasRecent: false,
    hasPop:false,
    isError: false
};


export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LIST:
        return { ...state, isFetching: true, hasList: false };
      case FETCH_LIST_RECENT:
        return { ...state,
          [action.listName]:action.listPost,
         isFetching: false, hasRecent: true };
      case FETCH_LIST_POPULAR:
        return { ...state, popular: action.popular, isFetching: false, hasPop: true };
      case FETCH_LIST_FAIL:
        return { ...state, isError: true, isFetching: false, hasList: false };
      default:
        return state;
    }
}