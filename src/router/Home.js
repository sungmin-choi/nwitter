import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, addDoc,query,onSnapshot } from "firebase/firestore";
const Home = ({userObj}) => {
    const [Nweet,setNweet]=useState("");
    const [Nweets,setNweets]=useState([]);

    useEffect(()=>{
        const q = query(collection(dbService, "Nweets"));
        onSnapshot(q, (document) => {
            let NweetsArray=[];
            document.forEach(doc=>{
                const nweetObject={
                    ...doc.data(),
                    id:doc.id,
                };
                NweetsArray.push(nweetObject);
            })
            NweetsArray.sort((a,b)=>{
                return b["createAt"]-a["createAt"];
            })
            setNweets(NweetsArray);
        });
    },[]);

    const onSubmit= async(event)=>{
        event.preventDefault();
        await addDoc(collection(dbService, "Nweets"), {
            text:Nweet,
            createAt: Date.now(),
            creatorId:userObj.uid
        });
        setNweet("");
    }

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNweet(value);
    }

    return(
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={Nweet}  type="text" placeholder="input your mind" maxLength={120}/>
            <input type="submit" value="Nweet"/>
        </form>
        <div>
        {Nweets.map((nweet) =>{
            return <div key={nweet.id}><h4>{nweet.text}</h4></div>
        })}
        </div>
        </>


    )
    
}


export default Home;