import React, { useEffect, useState } from "react";
import "./Updates.css";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../../../FirebaseConfigs/firebaseConfig";
import Updatescard from "./Updatescard";

const Updates = () => {

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
      {notifdata.length != 0 ? 
      <div className="Updates">
      {notifdata.map((item) => (
                <Updatescard
                key={item.id} 
                itemdata = {item}
                useremail={loggeduser[0].email}
                />
              ))}
    </div>:
    <p>No Notification</p>}
    </div>
  )
}

export default Updates;
