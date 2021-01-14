
import React, { useState} from 'react';
import axios from 'axios';
import './App.css';
import UserProfile from './UserProfile';

const BASE_URL:string = "https://api.github.com/users/";

export interface User {
  "login": string,
  "id"?: number,
  "node_id"?: string,
  "avatar_url": string,
  "gravatar_id"?: string,
  "url"?: string,
  "html_url"?: string,
  "followers_url"?: string,
  "following_url"?: string,
  "gists_url"?: string,
  "starred_url"?: string,
  "subscriptions_url"?: string,
  "organizations_url"?: string,
  "repos_url"?: string,
  "events_url"?: string,
  "received_events_url"?: string,
  "type"?: string,
  "site_admin"?: false,
  "name": string,
  "company"?: string,
  "blog"?: string,
  "location"?: string,
  "email"?: string,
  "hireable"?: string,
  "bio"?: string,
  "twitter_username"?: string,
  "public_repos": string,
  "public_gists"?: number,
  "followers"?: number,
  "following"?: number,
  "created_at"?: string,
  "updated_at"?: string,
} 
        
function App() {

  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<User>({login: "", name: "", avatar_url: "", public_repos: ""});
  const [error, setError] = useState<string>("");
 
  const getData = async (input: string) => {
    const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      axios.get(BASE_URL + input, {cancelToken: source.token})
      .then((response) => {
        if(input === response.data.login.toLowerCase()){
          const data = response.data;
          setError("");
          setUserData({login: data.login, name: data.name, public_repos: data.public_repos,avatar_url: data.avatar_url});
        } else {
          setUserData({login: "", name: "", avatar_url: "", public_repos: ""});

          setError("Could not receive data, Please try again");
        }
       })
      .catch((error) => {
        setUserData({login: "", name: "", avatar_url: "", public_repos: ""});
        if(error.response){
          setError(error.response.statusText);
        } else if (error.request){
          setError(error.request.XMLHttpRequest.statusText)
          console.log(error);
        } else if (axios.isCancel(error)) {
          setError(error.message);
        } else {
          setError("Unknown Error");
        }
      })  
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input: string = e.target.value.trim();
    setUserName(input);
    getData(input);
  }

  return (
    <div className="wrapper">
      <h2>Fetch Github Profile (Typescript)</h2>
      <input 
        type="text"
        placeholder="Enter github username"
        className="input-field"
        value={userName}
        onChange={handleOnChange}     
      />
      {!userData.login && <p>User {error}</p>}

      {userData.login && <UserProfile
        userData={userData}
      />}

    </div>
  );
}

export default App;
