import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../store/users/userActions'
function UserContainer(props) {
    const user_id = props.location.user_id ? props.location.user_id: props.match.params.user_id;
    const userDetails = useSelector(state => state.user.singleUserData);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserDetails(user_id))
    }, [])
    return (
        <div>
            {
                userDetails
                    ?
                    <div>
            Name: {userDetails.name}<br></br>
            Phone: {userDetails.phone}<br></br>
            Email: {userDetails.email}<br></br>
            Website: {userDetails.website}<br></br>
                    </div>
                    : ''}

        </div>
    );
}

export default UserContainer;