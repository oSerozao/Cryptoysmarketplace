import React, { useState, useEffect} from "react"
import { auth, db } from "../../../../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where, setDoc, doc, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import './App1.css'

const Myproducts = () => {
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
const loggeduser = GetCurrentUser();
    // if (loggeduser) { console.log(loggeduser[0].email) }
    
  return (
      <div className="App">
        <div className="AppGlass">
        <Sidebar/>
        <div>Listing</div>
        </div>
        </div>
  )
}

export default Myproducts