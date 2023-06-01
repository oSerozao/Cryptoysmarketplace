import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Dashboard from "./components/AdminDashboard";
import Sidebar from "./components/AdminSidebar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfigs/firebaseConfig";
import PgFOF from "../PgFOF";
import Adminaccessinvalid from "./components/Adminaccessinvalid";

export default function AdminApp() {
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
  console.log(loggeduser  )
  return (
    <div>
      {loggeduser && loggeduser[0].email === 'admin123@gmail.com' ?
      <div>
      <Div>
      <Sidebar />
      <Dashboard />
      </Div>
    </div>:
    <div>
      <Adminaccessinvalid/>
      </div>}
    </div>
  );
}

const Div = styled.div`
  position: relative;
`;
