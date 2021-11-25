import React from 'react';
import { useState,useRef } from 'react';
import {ref, uploadString,getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storageService,dbService} from '../fbase';
import {addDoc,collection} from "firebase/firestore";

const NweetFactory = ({userObj}) => {
    const [Nweet,setNweet]=useState("");
    const [attachment,setAttachment]=useState(null);
    const fileInput = useRef();
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
            <img alt="im" src={attachment} width="50px" height="50px"/>
            <button onClick={cancelupload}>Cancel</button>
        </div>}
        </>
    )
}

export default NweetFactory;