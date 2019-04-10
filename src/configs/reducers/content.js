import {
    FETCH_CONTENT,
    FETCH_CONTENT_FAIL,
    FETCH_CONTENT_SUCCESS,
    FETCH_CONTENT_CLEAR,
} from "../constants";

const initialState = {
    classrooms:[],
    isFetching: false,
    hasCotent: false,
    isError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTENT:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_CONTENT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                public: action.public,
                isFetching: false,
                hasContent: true
            };
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
