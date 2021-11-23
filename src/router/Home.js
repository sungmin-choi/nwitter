import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";
const Home = () => {
    const [Nweet,setNweet]=useState("");
    const [Nweets,setNweets]=useState([]);

    const getNweets=async()=>{
        const dbNweets = await getDocs(collection(dbService, "Nweets"));
        dbNweets.forEach((document) => {
            const nweetObject={
                ...document.data(),
                id:document.id,
            };
            setNweets((prev)=>[nweetObject,...prev]);
          });
    }

    useEffect(()=>{
        getNweets();
    },[]);
    const onSubmit= async(event)=>{
        event.preventDefault();
        await addDoc(collection(dbService, "Nweets"), {
            Nweet,
            createAt: Date.now()
        });
        setNweet("");
    }

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNweet(value);
    }
    console.log(Nweets)

    return(
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={Nweet}  type="text" placeholder="input your mind" maxLength={120}/>
            <input type="submit" value="Nweet"/>
        </form>
        <div>
        {Nweets.map((nweet) =>{
            return <div key={nweet.id}><h4>{nweet.Nweet}</h4></div>
        })}
        </div>
        </>


    )
    
}


export default Home;