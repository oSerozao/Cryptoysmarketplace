import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfigs/firebaseConfig';
import './AdminLogin.css'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

import cryptoasdas from './cryptoasdas.jpg'
// admin123 24line
const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const auth = getAuth();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    if(email == 'admin123@gmail.com') {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      setSuccessMsg('Logged in successfully, you will be redirected to homepage')

      setEmail('')
      setPassword('')
      setErrorMsg('')
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/admin/dashboard');
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(error.message)
      if (error.message == 'Firebase: Error (auth/invalid-email).') 
      {
        setErrorMsg('Please fill all required fields')
      }
      if (error.message == 'Firebase: Error (auth/user-not-found).') 
      {
        setErrorMsg('Email not found');
      }
      if (error.message == 'Firebase: Error (auth/wrong-password).') 
      {
        setErrorMsg('Wrong Password');
    }
  });
}else {
  setErrorMsg('Wrong Credential');
  setTimeout(() => {
    setErrorMsg('');
    navigate('/admin');
  }, 9000);
}
  }
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
const gotodashboard = () => {

    navigate('/admin/dashboard');
  
}
const gotohomepage = () => {

  navigate('/');

}
  return (
    <div>
      {loggeduser && loggeduser[0].email == 'admin123@gmail.com' ?
      <div className='bglogin'>
           
      <div className='login-container1'>
          <form className='login-form1'>
              <p>Welcome Admin</p>
              <button onClick={gotodashboard}>Go to Dashboard</button>
          </form>
      </div>
      <p></p>
   </div>
      :
      <div className='bglogin'>
           {loggeduser && loggeduser[0].email != 'admin123@gmail.com' ?
           <div>
            <div className='bglogin'>
           
           <div className='login-container1'>
               <form className='login-form1'>
                   <p>Welcome {loggeduser[0].username}</p>
                   <button onClick={gotohomepage}>Go to Home Page</button>
               </form>
           </div>
           <p></p>
        </div>
           </div>:
           <div>
            <div className='login-container1'>
          <form className='login-form1'>
              <p>Login</p>

              {successMsg && <>
                  <div className='success-msg'>
                      {successMsg}     
                  </div></>}

                  {errorMsg && <>
                  <div className='error-msg'> 
                      {errorMsg}
                  </div> </> }

              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} 
              type='email' placeholder='Enter your email' />
              
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} 
              type='password' placeholder='Enter your password' />

              <button onClick={handleLogin}>Login</button>
          </form>
      </div></div>}
      <p></p>
   </div>}
    </div>
  )
}

export default AdminLogin