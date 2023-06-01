import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Transfers from './AdminTransfers'
import Sidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";

import scrollreveal from "scrollreveal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../FirebaseConfigs/firebaseConfig";
import Adminaccessinvalid from "./Adminaccessinvalid";
export default function AdminAllUsers() {
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

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <div>
      {loggeduser && loggeduser[0].email ==='admin123@gmail.com'?
    <Div>
      <Sidebar />
    <div style={{backgroundColor: 'black'}}>
    <Section>
      <Navbar />
      <p></p>
      <div className="row__twoo">
          <Transfers />
          
        </div>
    </Section>
    </div>
    </Div>:
    <div>
      <Adminaccessinvalid/>
      </div>}
    </div>
  );
}
const Div = styled.div`
  position: relative;
`;
const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 70rem;
  
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__twoo {
      display: grid;
      grid-template-columns: repeat(0, 1fr);
      gap: 1rem;
      height: 100%;
     
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
