import React,{useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService} from '../fbase';
import {onAuthStateChanged } from "firebase/auth";
function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userobj,setUserObj]=useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
      onAuthStateChanged(authService, (user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          uid:user.uid,
          displayName:user.displayName
        });
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
