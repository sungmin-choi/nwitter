import React, { useState } from 'react';
import { doc, deleteDoc,updateDoc} from "firebase/firestore";
import { dbService,storageService } from '../fbase';
import { ref, deleteObject } from "firebase/storage";
const Nweet = ({NweetObj,userObj}) => {
    const [editing,setEditing]=useState(false);
    const [newNweet,setNewSweet]=useState(NweetObj.text);

    const toggleEditing=()=>setEditing(prev=>!prev);

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNewSweet(value);
    }

    const onSubmit=async(event)=>{
        event.preventDefault();
        const updateNweet = doc(dbService, "Nweets",`${NweetObj.id}`);
        await updateDoc(updateNweet, {
            text: newNweet
          });
        toggleEditing();
    }

    const onDelete= async()=>{
        let confirm = window.confirm("are u sure delete it?");
        if(confirm){
            const desertRef = ref(storageService, NweetObj.imageId);
            await deleteDoc(doc(dbService, "Nweets", `${NweetObj.id}`));
            await deleteObject(desertRef);
        }
    }

    return(
        <div>
            {editing?(
            <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={newNweet} type="text" placeholder="input your mind"/>
                <input type="submit" value="Edit Nweet"/>
            </form>
            <button onClick={toggleEditing}>Cancel</button>
            </>) :(<>
                <h4>{NweetObj.text}</h4>
                {NweetObj.fileUrl && <img alt="img" src={NweetObj.fileUrl} width="50px" height="50px"/>}
                {userObj && <>
                <button onClick={onDelete}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
                </>
                 }
                </>)}

        </div>
    )
};

export default Nweet;