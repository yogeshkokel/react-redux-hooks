import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, ADD_USER } from './userTypes';

const initialState = {
    loading: false,
    data: [],
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case FETCH_USER_ERROR:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        case ADD_USER:
            return {
                loading: false,
                data: [...state.data, action.payload],
            }
        default: return state
    }
}

export default userReducer