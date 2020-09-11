import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, ADD_USER } from './userTypes';

//initial state of user
const initialState = {
    loading: false,
    data: [],
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        //loading case
        case FETCH_USER:
            return {
                ...state,
                loading: true
            }
        //add user data case
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        //error case
        case FETCH_USER_ERROR:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        //add user case
        case ADD_USER:
            return {
                loading: false,
                data: [...state.data, action.payload],
            }
        default: return state
    }
}

export default userReducer