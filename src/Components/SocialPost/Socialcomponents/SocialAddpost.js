import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db, auth, storage } from '../../../FirebaseConfigs/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const SocialAddpost = () => {
  const [postimage, setPostImage] = useState("");
  const [postcaption, setPostCaption] = useState("");

  const [postuserid, setPostUserId] = useState("");
  const [imageError, setImageError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState("")
  const [uploadError, setUploadError] = useState('');
  const navigate =useNavigate();



  function GetCurrentUser () {
      const[user,setUser] = useState (null);
      const usersCollectionRef = collection(db, "users");
      useEffect(() => {
        auth.onAuthStateChanged(userlogged=>{
          if(userlogged){
            // console.log(userlogged.email)
            const getUsers = async () => {
              const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
              console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
            };
            getUsers();
          }
          else{
            setUser(null);
          }
        })
      },[])
      return user
  }

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']

  const handlePostImg = (e) => {
      e.preventDefault();
      let selectedFile = e.target.files[0];

      if(selectedFile){
          if(selectedFile && types.includes(selectedFile.type)){
            setPostImage(selectedFile);
              setImageError('')
          }
          else {
            setPostImage(null)
              setImageError('Please Select a Valid Image File Type(png or jpg')
          }
      }
      else{
          setImageError('Please Select a File')
      }
      
  }

  const loggeduser = GetCurrentUser();
  // if (loggeduser) { console.log(loggeduser[0].email) }

  const handleAddPost = (e) => {
    const time = Date.now()/1000;
      e.preventDefault();
      const storageRef = ref(storage, `postsocial/${time}`)
      const email1 = loggeduser[0].email
      const username1 = loggeduser[0].username
      const profileimage = loggeduser[0].profileimage
      // console.log(storageRef._location.path)
      if ((postimage === '') || (postcaption === ''))
      {
          console.log('Empty Array')
          setSuccessMsg('Please fill all required fields.')
                      setErrorMsg('')
                      setTimeout(() => {
                          setSuccessMsg('');
                      }, 2000);
      }
      else {
          uploadBytes(storageRef, postimage)
          .then(() => {
              getDownloadURL(storageRef).then(url => {
                  const zero = 0;
                  addDoc (collection(db,"socialpost"),{
                      timemillis: time,
                      timestamp: serverTimestamp(),
                      postimage: url,
                      username: username1,
                      email: email1,
                      displayname: username1,
                      postcaption,
                      liked: zero,
                      profileimage: profileimage
                  }).then(() => {
                      setSuccessMsg('Posted Successfully')
                      setErrorMsg('')
                  })
                  }
              )
          })}
      
  }


return (
  <div>
      <div className="addprod-container">
          <form className="addprod-form" onSubmit={handleAddPost}>
              <p>Add New Post</p>
              {successMsg && <div className="success-msg">{successMsg}</div>}
              {uploadError && <div className="error-msg">{uploadError}</div>}
              <label>Image</label>
              <input onChange={handlePostImg} type="file" />
              {imageError && <>
                  <div className="error-msg">{imageError}</div>
              </>}
              <label>Caption</label>
              <textarea onChange={(e) => setPostCaption(e.target.value)} placeholder="Caption"></textarea>

              <button type='submit'>Add Post</button>
          </form>
      </div>
      <p></p>
  </div>
)
}

export default SocialAddpost