import './Appdb.css'
import React, { useState, useEffect} from "react"
import { auth, db } from '../../FirebaseConfigs/firebaseConfig';
import { collection, getDocs, query, where, setDoc, doc, addDoc } from "firebase/firestore"
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Accessform from '../Accessform';

function Dashboardapp() {
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
    <div>
    {loggeduser && loggeduser[0].seller == "yes" ?
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
    </div> : <div>
      <Navbar />
      <div><Accessform/></div>
      <Footer/>
      </div>} </div>
  );
}

export default Dashboardapp;
