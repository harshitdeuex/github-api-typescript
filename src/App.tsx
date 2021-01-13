import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

const maleDummyImage:string = "https://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206862-stock-illustration-profile-picture-vector.jpg";
const DEFAULT_ERROR_MESSAGE:string = "Not Found";
const BASE_URL:string = "https://api.github.com/users/"; 
let timeout:any;
function App() {
  const [userName, setUserName] = useState<any>("");
  const [userData, setUserData] = useState<any>("");
  const [error, setError] = useState<any>("");
 
  const getData = async () => {
    const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
    
      await axios.get(BASE_URL + userName, {cancelToken: source.token})
      .then((response) => {
        if(userName === response.data.login.toLowerCase()){
          const data = response.data;
          setUserData(data);
          console.log("Profile data: ", userData);
          setError("");
        }
       })
      .catch((error) => {
        setUserData("");
        if(error.response){
          setError(error.response.statusText);
        } else if (error.request){
          setError(error.request.XMLHttpRequest.statusText)
          console.log(error);
        } else if (axios.isCancel(error)) {
          setError(error.message);
          console.log("Axios cancelled: ", error.message);
        } else {
          setError("Unknown Error");
        }
      })  
  }

  const handleKeyUp = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("submitted");
      getData();
    }, 1500);
  }

  return (
    <div className="wrapper">
      <h2>Fetch Github Profile (Typescript)</h2>
      <img className="profile-image" src={userData.avatar_url || maleDummyImage} alt="Profile"/>
      <input 
        type="text"
        placeholder="Enter github username"
        className="input-field"
        value={userName}
        onChange={(e) => setUserName(e.target.value.trim())}
        onKeyUp={() => handleKeyUp()}     
      />
      {!userData && error && <p>User {error}</p>}
      {userData && !error && <div>
        <p>Username: {userData.login || DEFAULT_ERROR_MESSAGE}</p>
        <p>Name: {userData.name || DEFAULT_ERROR_MESSAGE}</p>
        <p>Number of Repository: {userData.public_repos || DEFAULT_ERROR_MESSAGE}</p>
        </div>
      }
    </div>
  );
}

export default App;
