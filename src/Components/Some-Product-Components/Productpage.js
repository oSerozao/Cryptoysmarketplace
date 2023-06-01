import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { collection, getDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore'

import './Productpage.css'
import Footer from '../Footer'
import Productpagecard from './Productpagecard'

const Productpage = () => {
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

const [productdata, setproductdata] = useState([]);

if (loggeduser) {
const getproductdata = async () => {
  const productArray = [];
  const email1 = loggeduser[0].email
  
  // console.log(path)
  getDocs(collection(db,"All-Added-Product","products", "allproduct"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      productArray.push({ ...doc.data(), id: doc.id})
    });
    setproductdata(productArray)
    // console.log('done')
  }).catch('Error error error')

}
getproductdata()
}


return (
  <div>
      <Navbar/>
      {productdata.email == loggeduser.email ? <div>
            <div className='cart-head'>My Listing Items</div>
            <div className='allcartitems'>
              {productdata.map((product) => (
                <Productpagecard 
                key={product.id}
                product={product}
                useremail={loggeduser[0].email} 
                />
              ))}
            </div>
            <p> </p>
      </div>

      : <p>Your product is Empty</p>}
      <Footer/>
  </div>
)
}

export default Productpage