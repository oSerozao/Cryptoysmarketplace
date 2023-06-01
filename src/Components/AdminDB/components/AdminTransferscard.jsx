import React, { useState, useEffect } from 'react'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../FirebaseConfigs/firebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AdminTransferscard = (props) => {

    const navigate =useNavigate()
    const [successMsg, setSuccessMsg] = useState("")
   const deleteuserdb =  async () => {
        await deleteDoc(doc(db,"users",`${props.itemdata.id}`))
        .then(() => {
            console.log('Doc Deleted')
            setSuccessMsg('User Deleted, Please Login Again')
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/admin');
            }, 4000);
        })
    }
    const handleLogout = ()=>{
        auth.signOut()
            console.log("Out Success");
            navigate('/admin/dashboard');
      }
      const  email = props.useremail
      const  password = props.userpassword
const signIn = ()  => {
    signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Sign In SuccessFul!");
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
const DeleteUser = ()  => {
    const user = getAuth().currentUser;
 
    user
        .delete()
        .then(() => {
            // User deleted.
            console.log("User Account Deleted Successful");
        })
        .catch((error) => {
            // An error occurred
            // ...
        });
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
const changeyesorno = async () => {
        const itemref = doc(db,"users",`${props.itemdata.email}`)
        await updateDoc(itemref, {
            seller: yesorno
        }).then(() => {console.log('changed  quantity')})
}
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
    return (
        <div>
            {props.itemdata.email == "admin123@gmail.com" ?
                <div></div>:
                <div>
                    <div className="transaction">
            <div className="transaction__title">
                
                <div className="transaction__title__details">{props.itemdata.email}</div>
                {props.itemdata.seller == "yes" ?
                <div>
                    <div className="transaction__title__details">is a seller</div>
                </div>:
                <div>
                    <div className="transaction__title__details">is not a seller</div></div>}
            </div>
            
                {props.itemdata.seller == "yes" ?
                <div>
                     <Button variant="outlined" onClick={handleClickOpen}>
        Change
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Change "}{props.itemdata.username} "{props.itemdata.email}"{" to user only?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Selecting "YES" means making {props.itemdata.username} "{props.itemdata.email}" not a vendor anymore. If not click "cancel"
          </DialogContentText>
          <TextField id="outlined-select-currency" select label="Select" value={yesorno}  sx={{minWidth: "100%"}} onChange={handleyesorno}> 
          {currenciesno.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => { handleClick1(); changeyesorno();}} autoFocus>
            Agree
          </Button>
          <Snackbar open={open1} autoHideDuration={6000} onClose={() => { handleClose1(); handleClose();}}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          Success! {props.itemdata.username} is now a user!
        </Alert>
      </Snackbar>
          <Button onClick={handleClose}>Cancel</Button>  
        </DialogActions>
      </Dialog>
                </div>:
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
        Change
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {"Make "}{props.itemdata.username} "{props.itemdata.email}"{" a vendor?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selecting "YES" means making {props.itemdata.username} "{props.itemdata.email}" to become a vendor. If not click "cancel"
          </DialogContentText>
          <TextField id="outlined-select-currency" select label="Select" value={yesorno}  sx={{minWidth: "100%"}} onChange={handleyesorno}> 
          {currenciesyes.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => { handleClick1(); changeyesorno();}} autoFocus>
            Agree
          </Button>
          <Snackbar open={open1} autoHideDuration={6000} onClose={() => { handleClose1(); handleClose();}}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          Success! {props.itemdata.username} is now a vendor!
        </Alert>
      </Snackbar>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog></div>}
      <p></p><div className="transaction__title__image">
            <div><button  onClick={() => { handleLogout(); signIn();DeleteUser(); deleteuserdb();}}><img src={del}/></button></div>

            
        </div>
                </div>
                </div>
            }
        </div>
       
      )
    
    }
    
    export default AdminTransferscard

 