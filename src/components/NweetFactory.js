import React from 'react';
import { useState,useRef } from 'react';
import {ref, uploadString,getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storageService,dbService} from '../fbase';
import {addDoc,collection} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
        if (Nweet === "") {
            return;
          }
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
        setAttachment("");
        fileInput.current.value=null;
    };

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNweet(value);
    }

    return(
        <>
         <form onSubmit={onSubmit} className="factoryForm">
         <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={Nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
        <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
        <input id="attach-file"
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        style={{
          opacity: 0,
        }}
      />
        <input type="submit" value="Nweet"/>
        </form>
        {attachment && <div className="factoryForm__attachment">
          <img
            alt="img"
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={cancelupload}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>}
        </>
    )
}

export default NweetFactory;