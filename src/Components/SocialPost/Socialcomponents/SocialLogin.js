import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';  
import './SocialLogin.css'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../FirebaseConfigs/firebaseConfig';
import { useNavigate } from 'react-router-dom'

import cryptoasdas from './cryptoasdas.jpg'

const SocialLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [address, setAddress] = useState("")
  const auth = getAuth();
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      setSuccessMsg('Logged in successfully, you will be redirected to Cryptogram')

      setEmail('')
      setPassword('')
      setErrorMsg('')
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/cryptoys/social');
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

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;
        const email1 = email;
        const no = "no";
        console.log(user);
       
        setDoc(doc(db,"users", `${email1}`), {
            username: username, email: email, phonenumber:
            phonenumber, password: password, cart: initialcartvalue,
            address: address, uid: user.uid, seller: no
        }).then(() => {
            setSuccessMsg('New User added successfully, Please Login.')
            setUsername('')
            setPhonenumber('')
            setEmail('')
            setPassword('')
            setErrorMsg('')
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/cryptoys/login');
            }, 4000);
            auth.signOut()
        })
        .catch((error) => { setErrorMsg(error.message) });
    })
    .catch((error) => { 
        if (error.message == 'Firebase: Error (auth/invalid-email).')
        {
            setErrorMsg('Please fill all required fields')
        }
        if (error.message == 'Firebase: Error (auth/email-already-in-use).')
        {
            setErrorMsg('User already exists');
        }
    })
  }

  return (
    <div className='bglogin'>
           
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
                <div>
                    <span>Don't have an account?</span>
                    <Button onClick={handleOpen}>Sign Up</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Sign Up
                          </Typography>
                          <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <p>Create Account</p>

                {successMsg && <>
                    <div className='success-msg'>
                        {successMsg}     
                    </div></>}

                    {errorMsg && <>
                    <div className='error-msg'> 
                        {errorMsg}
                    </div> </> }

                <label>Your Name</label>
                <input onChange={(e) => setUsername(e.target.value)} 
                type='text' placeholder='First and last name' />

                <label>Mobile Number</label>
                <input onChange={(e) => setPhonenumber(e.target.value)} 
                type='tel' placeholder='Mobile Number' />

                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} 
                type='email' placeholder='Enter your email' />
                
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} 
                type='password' placeholder='Enter your password' />
                
                <label>Address</label>
                <textarea onChange={(e) => setAddress(e.target.value)} 
                placeholder='Enter your address'></textarea>

                <button type='submit'>Sign up</button>

            </form>

        </div>
                        </Box>
                      </Modal>
                </div>
            </form>
        </div>
        <p></p>
     </div>
  )
}

export default SocialLogin