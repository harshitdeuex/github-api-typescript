import React from 'react';
import dummyProfileImage from './dummy-profile-image.jpeg'
import { User } from './App';

interface PropType {
    userData: User
}

const UserProfile = ({userData}:PropType) => {
    return (
        <div>
            <img className="profile-image" src={userData.avatar_url || dummyProfileImage} alt="Profile"/>
            
            <p>Username: {userData.login}</p>
            <p>Name: {userData.name}</p>
            <p>Number of Repository: {userData.public_repos}</p>

        </div>
    )
}

export default UserProfile;