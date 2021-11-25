import React, { useState } from 'react';
import { doc, deleteDoc,updateDoc} from "firebase/firestore";
import { dbService,storageService } from '../fbase';
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
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
        <div className="nweet">
            {editing?(
            <>
            <form onSubmit={onSubmit} className="container nweetEdit">
                <input onChange={onChange} value={newNweet} type="text" placeholder="input your mind"/>
                <input type="submit" value="Update Nweet" className="formBtn" />
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
            </>) :(<>
                <h4>{NweetObj.text}</h4>
                {NweetObj.fileUrl && <img alt="img" src={NweetObj.fileUrl} width="50px" height="50px"/>}
                {userObj && (<div class="nweet__actions">
                    <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
                </div>)
                 }
                </>)}

        </div>
    )
};

export default Nweet;