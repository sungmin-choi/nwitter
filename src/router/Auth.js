import React, { useState } from "react";
import { authService } from "../fbase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "@firebase/auth";
const Auth= ()=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");
    const onChange=(event)=>{
        const {target:{name,value}}=event;
        if(name==="email") setEmail(value);
        else if(name==="password") setPassword(value);
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
            console.log(error);
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
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
        </div>
    )

}

export default Auth;