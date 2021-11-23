import React,{useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService} from '../fbase';
import {onAuthStateChanged } from "firebase/auth";
function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    onAuthStateChanged(authService, (user) => {
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    });
    setInit(true);
  },[])
  return (
    <div>
      <>
      {init ?<AppRouter isLoggedIn={isLoggedIn}/> : "Initialized..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
