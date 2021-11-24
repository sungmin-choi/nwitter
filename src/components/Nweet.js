import React, { useState } from 'react';
import { doc, deleteDoc,updateDoc} from "firebase/firestore";
import { dbService } from '../fbase';

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
            await deleteDoc(doc(dbService, "Nweets", `${NweetObj.id}`));
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