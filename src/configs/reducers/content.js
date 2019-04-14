import {
    FETCH_CONTENT,
    FETCH_CONTENT_FAIL,
    FETCH_CONTENT_SUCCESS,
    FETCH_CONTENT_CLEAR,
    FETCH_CONTENT_ADD_MODAL
} from "../constants";

const initialState = {
    data:{},
    modal:{},
    hasModal:false,
    isFetching: false,
    hasContent: false,
    isError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTENT:
            return {
                ...state,
                isFetching: true,
                hasContent: false,
            };
        case FETCH_CONTENT_SUCCESS:
            return {
                ...state,
                data: {...state.data,
                    [action.contentType]:action.payload
                },
                public: action.public,
                isFetching: false,
                hasContent: true,
            };
        case FETCH_CONTENT_ADD_MODAL: 
        return {
            ...state,
            modal: action.modal,
            isFetching: false,
            hasContent: true,
            hasModal:true
        }
        case FETCH_CONTENT_CLEAR:
            return initialState;
        case FETCH_CONTENT_FAIL:
            return {
                ...state,
                isError: true,
                isFetching: false,
                hasContent: false
            };
        default:
            return state;
    }
};
