import React, { useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import { CameraIcon } from "@heroicons/react/outline";
import Spinner from "react-spinkit";
import { collection, where, query, getDocs, getDoc, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../../FirebaseConfigs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { SetAddStoryModal } from "./appSlice";
const SocialAddStory = () => {
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const modalContentRef = useRef();


  function GetCurrentUser () {
    const[user,setUser] = useState ('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
            // console.log(q)
          const data = await getDocs(q);
          setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})))
          }
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user
}
const loggeduser = GetCurrentUser();

useEffect(() => {
  const handler = (event) => {
    if (!modalContentRef.current.contains(event.target)) {
        SetAddStoryModal({
          addStoryIsOpen: false,
        })
    }
  };
  document.addEventListener("mousedown", handler);
  return () => {
    document.removeEventListener("mousedown", handler);
  };
});

const uploadStory = async () => {
  if (loading) return;
  setLoading(true);

  const storyRef = await addDoc(collection(db, "stories"), {
    userId: loggeduser[0].uid,
    username: loggeduser[0].username,
   timemillis: Date.now()/1000,
    timestamp: serverTimestamp(),
    profileimage: loggeduser[0].profileimage
  });

  const imageRef = ref(storage, `stories/${storyRef.id}/image`);

  await uploadString(imageRef, selectedFile, "data_url").then(
    async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "stories", storyRef.id), {
        image: downloadURL,
      });
    }
  );
 
    SetAddStoryModal({
      addStoryIsOpen: false,
    });
  setLoading(false);
  setSelectedFile(null);
};

const addImageToPost = (e) => {
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onload = (readerEvent) => {
    setSelectedFile(readerEvent.target.result);
  };
};


  return (
    <AddPostWrapper>
    <ModalContentWrapper ref={modalContentRef}>
      <ContentContainer>
        {selectedFile ? (
          <img
            src={selectedFile}
            alt=""
            style={{
              objectFit: "contain",
              cursor: "pointer",
              maxHeight: 200,
              width: "100%",
              borderRadius: 5,
            }}
          />
        ) : (
          <CameraIcon
            onClick={() => filePickerRef.current.click()}
            style={{
              color: "#e53e3e",
              padding: 15,
              borderRadius: 9999,
              background: "#fed7d7",
              cursor: "pointer",
              height: 30,
            }}
          />
        )}

        {/* add photo */}
        <p
          style={{
            padding: 5,
            fontSize: 20,
            fontWeight: 800,
            color: "rgb(38 38 38)",
            textAlign: "center",
            border: 0,
          }}
        >
          Select a photo
        </p>
        {/* hidden Input */}
        <input
          ref={filePickerRef}
          type="file"
          hidden
          onChange={addImageToPost}
        />
        {/* FINAL SUBMIT BUTTON */}

        {loading ? (
          <Spinner
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />
        ) : (
          <button
            type="submit"
            disabled={!selectedFile}
            onClick={uploadStory}
            className={selectedFile ? "selected" : "notSelected"}
          >
            POST
          </button>
        )}
      </ContentContainer>
    </ModalContentWrapper>
  </AddPostWrapper>
);
}

export default SocialAddStory
const AddPostWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  z-index: 12;
`;
const ModalContentWrapper = styled.div`
  display: flex;
  margin: auto;
  background-color: #fff;
  width: 30%;
  height: 50vh;
  min-width: 300px;
  border-radius: 10px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  > button {
    font-weight: 600;
    width: 60%;
    padding: 10px;
    cursor: pointer;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
  }
`;
