import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import { auth,db } from '../../FirebaseConfigs/firebaseConfig'
import { collection, getDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore'
import Mypurchasecard from './Mypurchasecard'
import '../Cart.css'
import Footer from '../Footer'

const Mypurchase = () => {
  const { type, id } = useParams()

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

const [mypurchasedata, setmypurchasedata] = useState([]);

if (loggeduser) {
const getmypurchasedata = async () => {
  const purchaseArray = [];
  const email1 = loggeduser[0].email
  
  // console.log(path)
  getDocs(collection(db,"users", `${email1}`,"mypurchase"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      purchaseArray.push({ ...doc.data(), id: doc.id})
    });
    setmypurchasedata(purchaseArray)
    // console.log('done')
  }).catch('Error error error')

}
getmypurchasedata()
}


return (
  <div>
      <Navbar/>
      {mypurchasedata.length != 0 ? <div>
            <div className='cart-head'>Your Cart Items</div>
            <div className='allcartitems'>
              {mypurchasedata.map((item) => (
                <Mypurchasecard
                key={item.id} 
                itemdata = {item}
                loggeduser = {loggeduser}
                userid={loggeduser[0].uid} 
                useremail={loggeduser[0].email}
                userusername={loggeduser[0].username}
                usernumber={loggeduser[0].phonenumber}
                useraddress={loggeduser[0].address}
                />
              ))}
            </div>
            <div className='proceed'>
              <button>Proceed</button>
            </div>
      </div>

      : <p>Your Purchase is Empty</p>}
      <Footer/>
  </div>
)
}

export default Mypurchase