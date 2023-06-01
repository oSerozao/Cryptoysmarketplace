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

const AdminNotificationcard = (props) => {

    const navigate =useNavigate()
    const [successMsg, setSuccessMsg] = useState("")
   const deletenotif =  async () => {
        await deleteDoc(doc(db,"users","admin123@gmail.com","notification",`${props.itemdata.email}`))
        .then(() => {
            console.log('Doc Deleted')
            setSuccessMsg('Notification Deleted')
            setTimeout(() => {
                setSuccessMsg('');
            }, 1000);
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
        <div className='notifcenter'>
    <button className='notifcontainer' onClick={handleClickOpen}>
    <div className='notifimgtitle' >
        <div className='notifimage'><img src={props.itemdata.productimage} /></div>
        <div >{props.itemdata.fullname}</div>
        <div>{props.itemdata.address}</div>
    </div>
    </button>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {"Make "}{props.itemdata.fullname} "{props.itemdata.email}"{" a vendor?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selecting "YES" means making {props.itemdata.username} "{props.itemdata.email}" to become a vendor. If not click "cancel"
          </DialogContentText>
          <TextField id="outlined-select-currency" select label="Select" value={yesorno}  sx={{minWidth: "100%"}} onChange={handleyesorno}> 
          {currenciesyes.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => { handleClick1(); changeyesorno(); deletenotif();}} autoFocus>
            Agree
          </Button>
          <Snackbar open={open1} autoHideDuration={6000} onClose={() => { handleClose1(); handleClose();}}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          Success! {props.itemdata.username} is now a vendor!
        </Alert>
      </Snackbar>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog></div>

      )
    
    }
    
    export default AdminNotificationcard

 