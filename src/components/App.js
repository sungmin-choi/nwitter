import React,{useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService} from '../fbase';
import {onAuthStateChanged } from "firebase/auth";
function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userobj,setUserObj]=useState(null);

  useEffect(()=>{
      onAuthStateChanged(authService, (user) => {
      if(user){
        setIsLoggedIn(true);
        if(user.displayName===null){
          user.displayName="newUser";
        }
        setUserObj({
          uid:user.uid,
          displayName:user.displayName
        });
        setInit(true);
      }
      else{
        setUserObj(null);
        setIsLoggedIn(false);
        setInit(true);
      }
    });   
  },[])

  const refreshUser=()=>{
    const user = authService.currentUser;
    setUserObj({
      uid:user.uid,
      displayName:user.displayName
    })
  }

  return (
    <div>
      <>
      {init ?<AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userobj}/> : "Initialized..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
