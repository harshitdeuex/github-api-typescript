import React from 'react';
import { EnumType } from 'typescript';

interface userProfileProps {
    userData: any;
    error: string;
}

const maleDummyImage:string = "https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206862-stock-illustration-profile-picture-vector.jpg";
const DEFAULT_ERROR_MESSAGE:string = "Not Found";

const UserProfile = ({userData, error}:userProfileProps) => {
    return (
        <div>
            <img className="profile-image" src={userData?.avatar_url || maleDummyImage} alt="Profile"/>
            {!userData && error && <p>User {error}</p>}
            {
            userData && !error && <div>
            <p>Username: {userData?.login || DEFAULT_ERROR_MESSAGE}</p>
            <p>Name: {userData?.name || DEFAULT_ERROR_MESSAGE}</p>
            <p>Number of Repository: {userData?.public_repos || DEFAULT_ERROR_MESSAGE}</p>
            </div>
            }
        </div>
    )
}

export default UserProfile;