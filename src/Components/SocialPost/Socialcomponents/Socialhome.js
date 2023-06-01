import React, { useState, useEffect } from 'react'
//import { makeStyles } from '@mui/material/styles';
import { auth,db } from '../../../FirebaseConfigs/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import SocialAddpost from './SocialAddpost'
import SocialPost from './SocialPost'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';  
import logo from './logo.png'
import SocialStories from './SocialStories';
import './SocialLogin.css'
import Pleaselogin from './Pleaselogin';

const Socialhome = () => {
  const [username, setUsername] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const auth = getAuth();
  const [socialpost, setsocialpost] = useState([]);
  function GetCurrentUser () {
    const[user,setUser] = useState (null);
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
            //console.log(q);
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
// timestamp proper
useEffect (() => {
  const postedArray = [];
  const docRef = query(collection(db, "socialpost"),orderBy('timestamp', 'desc'));
  getDocs(docRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) =>{
      postedArray.push({id: doc.id, post: doc.data()})
    })
    setsocialpost(postedArray)
  }).catch('Error error error')
}, [])


const handleLogin = (e) => {
  e.preventDefault()
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setSuccessMsg('Logged in successfully')

    setEmail('')
    setPassword('')
    setErrorMsg('')
    setTimeout(() => {
      setSuccessMsg('');
      navigate('/cryptoys/social');
    }, 3000);
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
          setSuccessMsg('New User added successfully, You will now be automatically redirected to login page.')
          setUsername('')
          setPhonenumber('')
          setEmail('')
          setPassword('')
          setErrorMsg('')
          setTimeout(() => {
              setSuccessMsg('');
              navigate('/cryptoys/social');
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
const [open1, setOpen1] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const handleOpen1 = () => setOpen1(true);
const handleClose1 = () => setOpen1(false);
const navigate = useNavigate()


  return (
    <div>
      {loggeduser? 
      <div className="app__header">
      <button onClick={() => navigate("/home")} style={{border:"none"}}>
      <img
          className="app__headerImage"
          src={logo}
          alt=""
          width={'180'}
          height={'60'}
      /></button>
    
      {loggeduser ? (

          <Button variant="contained" color='primary' onClick={() => auth.signOut().then(() => {navigate("/cryptoys/login")})}>Logout</Button>   
      ) : (
        <div>
            <Button onClick={handleOpen}>Sign In</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Sign In
                </Typography>
                <Typography>

  <form className='login-form'>
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


                </Typography>
              </Box>
            </Modal>
            <span>&nbsp;</span>
            <Button onClick={handleOpen1}>Sign Up</Button>
            <Modal
              open={open1}
              onClose={handleClose1}
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
    )}
  </div>:<></>}
            {loggeduser && loggeduser[0].username ?
            (<>
            <SocialStories/>
       <Button onClick={handleOpen}>Add New Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Post
          </Typography>
          <SocialAddpost username={loggeduser.username}/>
        </Box>
      </Modal>
      </>) :(
        <div className='unauth'>
        Please Login Register to Add New Post
    </div>
      )}
{loggeduser && loggeduser[0].username ?
            (<>
            <div>
              <a href={`/cryptoys/social/${loggeduser[0].email}`}>{loggeduser[0].username}</a>
            </div>
      </>) :(
        <div>
        <a>Guest</a>
    </div>
      )}
<div className="app__posts">
                <div className="app__postright">

                    {/* {user && user.displayName && <h2 style={{ textAlign: ' center' }}>userid: {user.displayName}</h2>} */}
                    <br />
                    {loggeduser ? 
                    <div>
                      {socialpost.map(({ id, post }) => (
                        <SocialPost
                            key={id}
                            postId={id}
                            user={loggeduser}
                            currentuseremail={loggeduser[0].email}
                            currentusername={loggeduser[0].username}
                            currentuserprofile={loggeduser[0].profileimage}
                            numberofliked={post.liked}
                            username={post.username}
                            postemail={post.email}
                            postcaption={post.postcaption}
                            postimage={post.postimage}
                            posttime={post.timemillis}
                            postprofileimage={post.profileimage}
                        />
                    ))}
                    </div>:
                    <div>
                      <Pleaselogin/>
                      </div>}
                </div>
            </div>

    </div>
)
}

export default Socialhome