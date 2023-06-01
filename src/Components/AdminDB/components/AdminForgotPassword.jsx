import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Transfers from './AdminTransfers'
import Sidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
import { cardStyles } from "./AdminReusableStyles";
import scrollreveal from "scrollreveal";
import AdminNotificationcard from "./AdminNotificationcard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../FirebaseConfigs/firebaseConfig";
import Adminaccessinvalid from "./Adminaccessinvalid";
import Adminforgotpasscard from "./Adminforgotpasscard";
export default function AdminForgotPassword() {
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
  const [forgotpass, setforgotpass] = useState([]);
  useEffect(() => {
      const getforgotpass = () => {

          const forgotpassArray = [];
          
          //console.log(props)

          getDocs(collection(db, "users","admin123@gmail.com","forgotpassword")).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  forgotpassArray.push({ ...doc.data(), id: doc.id })
              });
              setforgotpass(forgotpassArray)
              // console.log('done')
          }).catch('Error error error')
      }

      getforgotpass();
  }, [])
  return (
    <div>
      {loggeduser && loggeduser[0].email === 'admin123@gmail.com' ?
      <Div>
      <Sidebar />
    <div style={{backgroundColor: 'black'}}>
    <Section>
      <Navbar />
      <p></p>
      <div className="row__twoo">
      <Section>
    <div>
        <div>
            <div className="title">
              <h2>All Users</h2></div>
              {forgotpass.length != 0 ?
              <div className="transactions">
              {forgotpass.map((item) => (
                <Adminforgotpasscard
                key={item.id} 
                itemdata = {item}
                useremail = {item.email}
                
                />
              ))}
            </div>
            :<div className="title">
            <h2>No Request for User Password</h2></div> }
      </div>
        
    </div>
    </Section>
          
        </div>
    </Section>
    </div>
    </Div>:
    <div>
      <Adminaccessinvalid />
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
  .title {
    h2 {
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
  }
  .transactions {
    padding: 1rem 2rem 3rem 2rem;
  border-radius: 1rem;
  background-color: #212121;
  color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      
      justify-content: space-between;
      align-items: flex-start;
      &__title {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
          button {
            transition: 0.3s ease-in-out;
      font-size: 1.4rem;
      background-color: transparent;
          }
          &:hover {
            transform: translateX(0.5rem);
          }
        }
        &__details {
        }
      }
      &__amount {
        background-color: #d7e41e1d;
        padding: 0.2rem 0.5rem;
        width: 4rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #ffc107;
          span {
            color: black;
          }
        }
        span {
          color: #ffc107;
        }
      }
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
