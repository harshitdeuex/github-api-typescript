import React from 'react';
import dummyProfileImage from './dummy-profile-image.jpeg'


interface userProfileProps {
    userData: {
                imageUrl?: string,
                userId?: string,
                name?: string,
                repo?: number
                }; 
    error: string;
    userName: string;
}

const UserProfile = ({userData, error, userName}:userProfileProps) => {
    return (
        <div>
            <img className="profile-image" src={userData.imageUrl || dummyProfileImage} alt="Profile"/>
            {userName && error && <p>User {error}</p>}
            
            {userData.userId && <p>Username: {userData.userId}</p>}
            {userData.name && <p>Name: {userData.name}</p>}
            {!error && userData.repo != null && <p>Number of Repository: {userData.repo}</p>}
        </div>
    )
}

export default UserProfile;