import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, addDoc,query,onSnapshot } from "firebase/firestore";
import NweetCom from "../components/Nweet";
const Home = ({userObj}) => {
    const [Nweet,setNweet]=useState("");
    const [Nweets,setNweets]=useState([]);
    const [attachment,setAttachment]=useState(null);

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

    const onChangeFile=(event)=>{
        const {target:{files}}=event;
        const theFile=files[0];
        const reader = new FileReader();
        reader.onloadend=(event)=>{
            const {currentTarget:{result}}=event;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onSubmit= async(event)=>{
        event.preventDefault();
        await addDoc(collection(dbService, "Nweets"), {
            text:Nweet,
            createAt: Date.now(),
            creatorId:userObj.uid
        });
        setNweet("");
    }

    const cancelupload =()=> setAttachment(null);

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNweet(value);
    }

    return(
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={Nweet}  type="text" placeholder="input your mind" maxLength={120}/>
            <input onChange={onChangeFile} type="file" accept="image/*" />
            <input type="submit" value="Nweet"/>
        </form>
            {attachment?(<div>
                <img src={attachment} width="50px" height="50px"/>
                <button onClick={cancelupload}>Cancel</button>
            </div>)
            :<></>}
        
        <div>
        {Nweets.map((nweet) => <NweetCom key={nweet.id} NweetObj={nweet} userObj={userObj.uid===nweet.creatorId} />)}
        </div>
        </>


    )
    
}


export default Home;