import React, { useEffect, useRef, useState } from "react";
import { dbService,storageService } from "../fbase";
import { collection, addDoc,query,onSnapshot } from "firebase/firestore";
import {ref, uploadString,getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import NweetCom from "../components/Nweet";
const Home = ({userObj}) => {
    const [Nweet,setNweet]=useState("");
    const [Nweets,setNweets]=useState([]);
    const [attachment,setAttachment]=useState(null);
    const fileInput = useRef();

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
        let fileUrl="";
        let imageId=""
        if(attachment){
        const uuid = uuidv4();
        const storageRef = ref(storageService, `${userObj.uid}/${uuid}`);
        imageId=`${userObj.uid}/${uuid}`;
        await uploadString(storageRef, attachment, 'data_url');
        fileUrl=await getDownloadURL(ref(storageService, `${userObj.uid}/${uuid}`));
        }
        const nweetObj={
            text:Nweet,
            creatorId:userObj.uid,
            fileUrl,
            imageId,
            createAt:Date.now()
        }
        await addDoc(collection(dbService, "Nweets"),nweetObj);
        setNweet("");
        setAttachment(null);
    }

    const cancelupload =()=> {
        setAttachment(null);
        fileInput.current.value=null;
    };

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNweet(value);
    }

    return(
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={Nweet}  type="text" placeholder="input your mind" maxLength={120}/>
            <input onChange={onChangeFile} ref={fileInput} type="file" accept="image/*" />
            <input type="submit" value="Nweet"/>
        </form>
            {attachment && <div>
                <img src={attachment} width="50px" height="50px"/>
                <button onClick={cancelupload}>Cancel</button>
            </div>}
        
        <div>
        {Nweets.map((nweet) => <NweetCom key={nweet.id} NweetObj={nweet} userObj={userObj.uid===nweet.creatorId} />)}
        </div>
        </>


    )
    
}


export default Home;