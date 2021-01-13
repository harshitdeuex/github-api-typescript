import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import UserProfile from './UserProfile';


const BASE_URL:string = "https://api.github.com/users/"; 
let timeout:any;
function App() {
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<object>();
  const [error, setError] = useState<string>("");
 
  const getData = async () => {
    const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
    
      await axios.get(BASE_URL + userName, {cancelToken: source.token})
      .then((response) => {
        if(userName === response.data.login.toLowerCase()){
          const data = response.data;
          setUserData(data);
          setError("");
        }
       })
      .catch((error) => {
        setUserData({});
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

  const handleKeyUp = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("submitted");
      getData();
    }, 1000);
  }

  return (
    <div className="wrapper">
      <h2>Fetch Github Profile (Typescript)</h2>
      <input 
        type="text"
        placeholder="Enter github username"
        className="input-field"
        value={userName}
        onChange={(e) => setUserName(e.target.value.trim())}
        onKeyUp={() => handleKeyUp()}     
      />

      <UserProfile 
        userData = {userData}
        error = {error}
      />
    </div>
  );
}

export default App;
