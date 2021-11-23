import React, { useState } from "react";
import { authService } from "../fbase";
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
        <div>
        <form onSubmit={onSubmit}>
            <input name="email"
             type="email" 
             placeholder="Email"
             value={email}
             onChange={onChange}
             required/>
            <input 
            name="password" 
            type="password" 
            placeholder="password"
            value={password} 
            onChange={onChange}
            required/>
            <input type="submit" value={newAccount? "Create Account" : "Log In" }/>
        </form>
        {error}
        <div onClick={toggleAccount}>{newAccount?"Sign In":"Create Account"}</div>
        <div>
            <button onClick={socialLogin} name="google">Continue with Google</button>
            <button onClick={socialLogin} name="github">Continue with Github</button>
        </div>
        </div>
    )

}

export default Auth;