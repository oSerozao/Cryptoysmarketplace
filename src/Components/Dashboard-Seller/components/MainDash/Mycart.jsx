import React, { useState, useEffect} from "react"
import { auth, db } from "../../../../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where, setDoc, doc, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import './App1.css'
import MyCartCard from './MyCartCard'

const Mycart = () => {
  function GetCurrentUser () {
    const[user,setUser] = useState (null);
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
            // console.log(q);
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
const [cartdata, setcartdata] = useState([]);

if (loggeduser) {
  const getcartdata = async () => {
    const cartArray = [];
   
    // console.log(path)
    getDocs(collection(db,"users", `${loggeduser[0].email}`,"cart")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        cartArray.push({ ...doc.data(), id: doc.id})
      });
      setcartdata(cartArray)
      // console.log('done')
    }).catch('Error error error')

  }
  getcartdata()
}
//console.log(cartdata)
    
  return (
      <div className="App">
        <div className="AppGlass">
        <Sidebar/>
        
        <div>{cartdata.length != 0 ? <div>
              <div className='cart-head'>Your Cart Items</div>
              <div className='allcartitems'>
                {cartdata.map((item) => (
                  <MyCartCard 
                  key={item.id} 
                  itemdata = {item}
                  userid={loggeduser[0].uid} 
                  />
                ))}
              </div>
              <div className='proceed'>
                <button>Proceed</button>
              </div>
              
        </div>
        : <p>Your Cart is Empty</p>}</div>
        </div>
        </div>
  )
}

export default Mycart