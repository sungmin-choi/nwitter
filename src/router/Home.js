import React, { useEffect,useState } from "react";
import { dbService } from "../fbase";
import { collection,query,onSnapshot } from "firebase/firestore";

import NweetCom from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";
const Home = ({userObj}) => {
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
    return(
        <div className="container">
        <NweetFactory userObj={userObj}/>
        <div style={{ marginTop: 30 }}>
        {Nweets.map((nweet) => <NweetCom key={nweet.id} NweetObj={nweet} userObj={userObj.uid===nweet.creatorId} />)}
        </div>
        </div>
    )
    
}


export default Home;