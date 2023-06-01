import React, { useState, useEffect } from 'react'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../FirebaseConfigs/firebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import del from './del.png'


import { deleteUser, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertProps } from '@mui/material';
const Adminforgotpasscard = (props) => {
const [currentforgotpass, setCurrentForgotPass] = useState('')
    const navigate =useNavigate()
    const [successMsg, setSuccessMsg] = useState("")
   const deletenotif =  async () => {
        await deleteDoc(doc(db,"users","admin123@gmail.com","notification",`${props.itemdata.email}`))
        .then(() => {
            console.log('Doc Deleted')
            setSuccessMsg('Notification Deleted')
        })
    }

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const currenciesyes = [
    {
      value: 'yes',
      label: 'Yes',
    },
  ];
  const currenciesno = [
    {
      value: 'no',
      label: 'Yes',
    },
  ];
  const [yesorno, setyesorno] = useState('');
  const handleyesorno = (event) => {
    setyesorno(event.target.value);
};

function GetCurrentForgotPass() {
    // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
    
    useEffect(() => {
        const getCurrentForgotPass = async () => {
            const docRef = query(collection(db, "users"),where("email","==", props.useremail));
            const docSnap = await getDocs(docRef);
            
            setCurrentForgotPass(docSnap.docs.map((doc) =>({...doc.data(),id:doc.id})));
          };
          getCurrentForgotPass();
    }, []);
    return currentforgotpass
  }
  GetCurrentForgotPass();
  const emailforchange = GetCurrentForgotPass();

  const [openforgotpass, setOpenforgotpass] = React.useState(false);

  const handleClickOpenforgotpass = () => {
    setOpenforgotpass(true);
  };

  const handleCloseforgotpass = () => {
    setOpenforgotpass(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openforgotdialog, setOpenforgotdialog] = React.useState(false);

  const handleClickforgotdialog = () => {
    setOpenforgotdialog(true);
  };

  const handleCloseforgotdialog = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenforgotdialog(false);
  };
  const [openfaileddialog, setOpenfaileddialog] = React.useState(false);

  const handleClickfaileddialog = () => {
    setOpenfaileddialog(true);
  };

  const handleClosefaileddialog = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenfaileddialog(false);
  };
  const handleLogout = ()=>{
    auth.signOut()
        console.log("Out Success");
        
  }

const signIn = ()  => {
  const  email = emailforchange[0].email
  const  password = emailforchange[0].password
    console.log(emailforchange[0].email )
  console.log(emailforchange[0].password )
  const itemref = doc(db,"users",email)
  const itemref1 = doc(db,"users","admin123@gmail.com","forgotpassword",`${props.itemdata.id}`)
  const newPassword = newpass
signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user123 = getAuth().currentUser;
            updatePassword(user123,newPassword) &&  updateDoc(itemref, {password: newPassword}) && deleteDoc(itemref1)
            .then(() => {setTimeout(() => {
              console.log("DB changed");
              navigate('/admin');
              auth.signOut()
          }, 4000);}
          )
            const user = userCredential.user;
            console.log("Sign In SuccessFul!");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}
const [newpass, setNewPassword] = useState("");

const newpassdb = async () => {
  const  email = emailforchange[0].email
  const itemref = doc(db,"users",email)
  updateDoc(itemref, {
      password: newpass
  }).then(() => {setTimeout(() => {
    console.log("DB changed");
    navigate('/admin');
    auth.signOut()
}, 4000);}
)
}

    return (
        <a className='notifcenter'>
    <div className='notifcontainer' onClick={handleClickOpen}>
    <div className='notifimgtitle' >
    <div >{props.itemdata.email}</div>
    <div>
      <Button variant="outlined" onClick={handleClickOpenforgotpass}>
        Open form dialog
      </Button>
      <Dialog open={openforgotpass} onClose={handleCloseforgotpass}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change Password for {props.itemdata.email}.
          </DialogContentText>
          <TextField id="outlined-password-input" label="Password" type="text" autoComplete="current-password" sx={{width: "100%", mt: 2}} onChange={(e) => setNewPassword(e.target.value)}/>
        </DialogContent>
        <DialogActions>
        {newpass === '' || newpass.length < 6 ? 
          <Button onClick={() => {handleClickfaileddialog();}}>Confirm</Button>:
          <Button onClick={() => {handleLogout(); signIn();}}>Confirm</Button>}
        <Snackbar open={openforgotdialog} autoHideDuration={6000} onClose={handleCloseforgotdialog}>
        <Alert onClose={handleCloseforgotdialog} severity="success" sx={{ width: '100%' }}>
          Success! The password is changed.
        </Alert>
      </Snackbar>
      <Snackbar open={openfaileddialog} autoHideDuration={6000} onClose={handleClosefaileddialog}>
        <Alert onClose={handleClosefaileddialog} severity="error"sx={{ width: '100%' }}>
          Failed! The Password is not changed.
        </Alert>
      </Snackbar>
          <Button onClick={handleCloseforgotpass}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
    </div>
    </a>

      )
    
    }
    
    export default Adminforgotpasscard

 