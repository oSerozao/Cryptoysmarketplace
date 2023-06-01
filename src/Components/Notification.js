import React, { useState, useEffect} from "react"
import { storage, auth, db } from "../FirebaseConfigs/firebaseConfig"
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc, serverTimestamp, orderBy } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "./Navbar"
import './Notification.css'
import Footer from "./Footer";
import NotificationCard from "./NotificationCard";

const Notification = () => {

    function GetCurrentUser () {
        const[user,setUser] = useState ("")
        const usersCollectionRef = collection(db, "users")
        useEffect(() => {
          auth.onAuthStateChanged(userlogged=>{
            if(userlogged){
              // console.log(userlogged.email)
              const getUsers = async () => {
                const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
                // console.log(q)
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
      const [notifdata, setnotifdata] = useState([]);
      if (loggeduser) {
        const getnotifdata = async () => {
          const notifArray = [];
          const email1 = loggeduser[0].email
          
          // console.log(path)
          getDocs(collection(db,"users", `${email1}`,"notification"), orderBy("timestamp", "desc")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
              notifArray.push({ ...doc.data(), id: doc.id})
            });
            setnotifdata(notifArray)
            // console.log('done')
          }).catch('Error error error')
        
        }
        getnotifdata()
        }
  return (
    <div>
    <Navbar/>
    {notifdata.length != 0 ? <div>
            <div className='cart-head'>Notification</div>
            <div className='notifcenter'>
              {notifdata.map((item) => (
                <NotificationCard 
                key={item.id} 
                itemdata = {item}
                useremail={loggeduser[0].email}
                />
              ))}
            </div>
      </div>

      : <p>No Notification</p>}
    <Footer/>
    </div>
  )
}

export default Notification