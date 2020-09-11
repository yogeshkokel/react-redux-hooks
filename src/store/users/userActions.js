import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, ADD_USER } from './userTypes';
import UserService from '../../ApiServices/UserService';

//Loading action to set flag true/false
const fetchUserRequest = () => {
    return {
        type: FETCH_USER,
    }
}

//action called after user success response
const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

//action called when there is an error response
const fetchUserError = (err) => {
    return {
        type: FETCH_USER_ERROR,
        payload: err
    }
}

//action called when single user is added
const addSingleUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

//async function to fetch user using axios
export const fetchUser = () => {
    return function (dispatch) {
        //dispatch loading action
        dispatch(fetchUserRequest())
        UserService.GetUsers()
            .then((response) => {
                const { data } = response;
                //dispatch success response
                dispatch(fetchUserSuccess(data))
            }).catch((err) => {
                //dispatch error response
                dispatch(fetchUserError(err.message))
            });
    }
}

//async function to post username
export const addUser = (name) => {
    return function (dispatch) {
        UserService.AddUser({ name: name })
            .then((response) => {
                const { data } = response;
                //dispatch add response
                dispatch(addSingleUser(data))
            }).catch((err) => {
                //dispatch error response
                dispatch(fetchUserError(err.message))
            });
    }
}