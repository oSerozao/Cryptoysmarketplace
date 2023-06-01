import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Productpage from './Some-Product-Components/Productpage'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './Some-Product-Components/ProductSlider'
import './Home.css'
import Footer from './Footer'

const Home = () => {
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
/*if (loggeduser) { console.log(loggeduser[0].email,loggeduser[0].uid.charCodeAt(0),
  loggeduser[0].uid.charCodeAt(1),
  loggeduser[0].uid.charCodeAt(2),
  loggeduser[0].uid.charCodeAt(3),
  loggeduser[0].uid.charCodeAt(4),
  loggeduser[0].uid.charCodeAt(5),
  loggeduser[0].uid.charCodeAt(6),
  loggeduser[0].uid.charCodeAt(7),
  loggeduser[0].uid.charCodeAt(8),
  loggeduser[0].uid.charCodeAt(9),
  loggeduser[0].uid.charCodeAt(10),
  loggeduser[0].uid.charCodeAt(11),
  loggeduser[0].uid.charCodeAt(12),
  loggeduser[0].uid.charCodeAt(13),
  loggeduser[0].uid.charCodeAt(14),
  loggeduser[0].uid.charCodeAt(15),
  loggeduser[0].uid.charCodeAt(16),
  loggeduser[0].uid.charCodeAt(17),
  loggeduser[0].uid.charCodeAt(18),
  loggeduser[0].uid.charCodeAt(19),
  loggeduser[0].uid.charCodeAt(20),
  loggeduser[0].uid.charCodeAt(21),
  loggeduser[0].uid.charCodeAt(22),
  loggeduser[0].uid.charCodeAt(23),
  loggeduser[0].uid.charCodeAt(24),
  loggeduser[0].uid.charCodeAt(25),
  loggeduser[0].uid.charCodeAt(26),
  loggeduser[0].uid.charCodeAt(27),
  ) }*/
  return (
    <div>
        <Navbar />
        <Banner />
        <div className='slider-head'><p>Limited Time Deals</p></div>
        <div><div>Resin</div><ProductSlider type={'Resin'} /></div>
        <div><div>Figmas</div><ProductSlider type={'Figmas'} /></div>
        <div><div>Scales</div><ProductSlider type={'Scales'} /></div>
        <div><div>Nendoroid</div><ProductSlider type={'Nendoroid'} /></div>
        <div><ProductSlider type={'Other'} /></div>
        <Footer />
    </div>
  )
}

export default Home