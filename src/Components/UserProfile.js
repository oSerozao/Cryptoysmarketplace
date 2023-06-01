import React, { useState, useEffect} from "react"
import { auth, db } from "../FirebaseConfigs/firebaseConfig"
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth"
import { updateProfile } from "firebase/auth"
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore"
import Navbar from "./Navbar"
import './UserProfile.css'
import Footer from "./Footer"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Snackbar, TextField } from "@mui/material"
import MuiAlert from '@mui/material/Alert';
import defaultimg from './assets/default.png'
const UserProfile = () => {
/*  const auth = getAuth();

const user = auth.currentUser;
const newPassword = getPWFromForm();
updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});*/
const [newpass, setNewPassword] = useState("");
const [confirmpass, setConfirmPassword] = useState("");
  function GetCurrentUser () {

    const[user,setUser] = useState ('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          // console.log(userlogged.email)
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

const updatePass = ()  => {
  
  const email = loggeduser[0].email
const password = loggeduser[0].password

  signInWithEmailAndPassword(auth, email, password)
    //const user = userCredential.user;
  .then(() => {
    const newPassword = newpass;
const user = getAuth().currentUser;
    updatePassword(user,newPassword)
    // User deleted.
    console.log("Password Changed");
})
.catch((error) => {
  console.log("An error occurred");
    // ...
});
 // const auth = getAuth();
 // const user1 = auth.currentUser;
  /*const newPassword = newpass;
  const user1 = getAuth().currentUser;
  updatePassword(user1, newPassword)
  .then(() => {
    // User deleted.
    console.log("Password Changed");
})
.catch((error) => {
    // An error occurred
    // ...
});*/
}
const newpassdb = async () => {
  const email1 = loggeduser[0].email
  const itemref = doc(db,"users",`${email1}`)
  await updateDoc(itemref, {
      password: newpass
  }).then(() => {console.log('changed  quantity')})
}
//if (loggeduser) { console.log(loggeduser[0].email) }
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

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
    const [open1, setOpen1] = React.useState(false);
  
    const handleClick1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen1(false);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    };
    const [state, setState] = React.useState({
      open1: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, } = state;
    
  return (
    <div>
        <Navbar />
        <div className='userprofile-outercontainer'>
          {loggeduser ? 
          
          <div className="user-profile">
            <p>Your Account Details</p>

            {loggeduser[0].profileimage === '' ?
            <div className="data-row">
            <span>Profile Image</span>
            <span ><img style={{width: "50%", height: "10vh"}} src={defaultimg}/></span>
          </div>:
          <div className="data-row">
          <span>Profile Image</span>
          <span ><img style={{width: "50%", height: "10vh"}} src={loggeduser[0].profileimage}/></span>
        </div>}

            <div className="data-row">
              <span>Your Name</span>
              <span>{loggeduser[0].username}</span>
            </div>

            <div className="data-row">
              <span>Your Email</span>
              <span>{loggeduser[0].email}</span>
            </div>

            <div className="data-row">
              <span>Your Phone Number</span>
              <span>{loggeduser[0].phonenumber}</span>
            </div>

            <div className="data-row">
              <span>Your Address</span>
              <span>{loggeduser[0].address}</span>
            </div>
            <div>
            <Button onClick={handleOpen}>Reset Password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reset Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form >
              <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" sx={{width: "100%", mt: 2}} onChange={(e) => setNewPassword(e.target.value)}/>
              <TextField id="outlined-password-input1" label="Confirm Password" type="password" autoComplete="current-password" sx={{width: "100%", mt: 2}} onChange={(e) => setConfirmPassword(e.target.value)}/>
              {newpass !== confirmpass || newpass === '' && confirmpass === '' && newpass.length < 6 || confirmpass.length < 6 ?
              <Button onClick={() => {handleClick1({ vertical: 'top', horizontal: 'right', });}}>Confirm</Button>
              :
              <Button onClick={() => {updatePass(); newpassdb(); handleClick2({ vertical: 'top', horizontal: 'right', })}}>Confirm</Button>}
              <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}  anchorOrigin={{ vertical, horizontal }} sx={{ width: '80%' }}>
        <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
          Invalid Password Input! | Password Length must be greater than 7!
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={() => {handleClose2(); handleClose();}} anchorOrigin={{ vertical, horizontal }} sx={{ width: '80%' }}>
        <Alert onClose={() => {handleClose2(); handleClose();}} severity="success" sx={{ width: '100%' }}>
          Password successfully change!
        </Alert>
      </Snackbar>
            </form>
          </Typography>
        </Box>
      </Modal>
            </div>
            </div> : <div>
              You are not Logged In
            </div> }
            
        </div>
        <Footer />
    </div>
  )
}

export default UserProfile