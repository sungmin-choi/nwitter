import React, { useState } from "react";
import { authService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,GithubAuthProvider} from "@firebase/auth";
const Auth= ()=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const toggleAccount = ()=>setNewAccount(prev=>!prev);

    const onChange=(event)=>{
        const {target:{name,value}}=event;
        if(name==="email") setEmail(value);
        else if(name==="password") setPassword(value);
    }

    const socialLogin= async(event)=>{
        const {target:{name}}=event;
        let provider;
        if(name==="google"){
            provider=new GoogleAuthProvider();

        }else if(name==="github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService,provider);
    }

    const onSubmit =async (event)=>{
        event.preventDefault();
        let data;
        try{
            if(newAccount){
                data = await createUserWithEmailAndPassword(authService,email,password);
            }else{
                data = await signInWithEmailAndPassword(authService,email,password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <div className="authContainer">
        <FontAwesomeIcon
          icon={faTwitter}
          color={"#04AAFF"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
        <form onSubmit={onSubmit} className="container">
            <input name="email"
             type="email" 
             placeholder="Email"
             value={email}
             onChange={onChange}
             required
             className="authInput"/>
            <input 
            className="authInput"
            name="password" 
            type="password" 
            placeholder="password"
            value={password} 
            onChange={onChange}
            required/>
            <input className="authInput authSubmit" type="submit" value={newAccount? "Create Account" : "Log In" }/>
        </form>
        {error && <span className="authError">{error}</span>}
        <div className="authSwitch" onClick={toggleAccount}>{newAccount?"Sign In":"Create Account"}</div>
        <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
        <button onClick={socialLogin} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
          <button onClick={socialLogin} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
        </div>
        </div>
    )

}

export default Auth;