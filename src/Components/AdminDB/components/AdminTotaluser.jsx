import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./AdminReusableStyles";
import { Timestamp, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../../FirebaseConfigs/firebaseConfig";
export default function Analytics() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
      const getUsers = () => {

          const usersArray = [];
          
          //console.log(props)

          getDocs(collection(db, "users")).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  usersArray.push({ ...doc.data(), id: doc.id })
              });
              setUsers(usersArray)
              // console.log('done')
          }).catch('Error error error')
      }

      getUsers();
  }, [])
  
   /* const [userstime, setUserstime] = useState([]);
    useEffect(() => {
      const date = Date.now() / 1000;
          const date1 = date - 86400000;
          const con = users.timemillis +86400000;
          const datefin = date1 - con;
      if(users.timestamp){
        const getUserstime = () => {
          const userstimeArray = [];
          //console.log(props)
          const date1 = date - 86400000;
          getDocs(collection(db, "users")).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  userstimeArray.push({ ...doc.data(), id: doc.id })
              });
              setUserstime(userstimeArray)
              // console.log('done')
          }).catch('Error error error')
      }
      getUserstime();
      }
  }, [])*/
  const [userstime, setUserstime] = useState([]);
  useEffect(() => {
    const date = Date.now() / 1000;
        // console.log(userlogged.email)
        const getUserstime = async () => {
          const q = query(collection(db, "users"), where("timemillis", ">=", date))
          console.log(q);
        const data = await getDocs(q);
        setUserstime(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
        };
        getUserstime();
  },[])
  /*const [userstime, setUserstime] = useState([]);
  useEffect(() => {
      const getUserstime = () => {
        const date = Date.now() / 1000;
          const userstimeArray = [];
          
          //console.log(props)

          getDocs(collection(db, "users"), where("timemillis", ">=", date)).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  userstimeArray.push({ ...doc.data(), id: doc.id })
              });
              setUserstime(userstimeArray)
              // console.log('done')
          }).catch('Error error error')
      }

      getUserstime();
  }, [])*/
  const [allprod, setAllprod] = useState([]);
  useEffect(() => {
      const getAllprod = () => {

          const allprodArray = [];
          
          //console.log(props)

          getDocs(collection(db, "All-Added-Product", "products", "allproduct")).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  allprodArray.push({ ...doc.data(), id: doc.id })
              });
              setAllprod(allprodArray)
              // console.log('done')
          }).catch('Error error error')
      }

      getAllprod();
  }, [])
  return (
    <Section>
      <div className="analytic ">
        <div className="content">
          <h5>Total number of users</h5>
          <h2>{users.length-1}</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>Total number of product posted</h5>
          <h2>{allprod.length}</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <BiGroup />
        </div>
        <div className="content">
          <h5>New Users</h5>
          <h2>{userstime.length}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Popular Type of Toy</h5>
          <h2>---</h2>
        </div>
        <div className="logo">
          <FiActivity />
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
