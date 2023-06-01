import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../FirebaseConfigs/firebaseConfig';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Notificationspecificpage = () => {

    const { email,id } = useParams();

const [currentnotif, setcurrentnotif] = useState([]);
useEffect(() => {
  const getcurrentnotif = async () => {
    const q = query(doc(db, "users",email,"mypurchase",id))
    // console.log(q)
  const data = await getDoc(q);
  setcurrentnotif(data.data())
  }
  getcurrentnotif();
})

const [currentnotifseller, setcurrentnotifseller] = useState([]);

useEffect(() => {
  const getcurrentnotifseller = async () => {
    const q = query(doc(db, "users",email,"buyerorders",id))
    // console.log(q)
  const data = await getDoc(q);
  setcurrentnotifseller(data.data())
  }
  getcurrentnotifseller();
})

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const updatecondition = async () => {
       const confirm = "confirmed";
  const itemref = doc(db,"users", email, "buyerorders",id)
  const itemref1 = doc(db,"users", `${currentnotifseller.buyeremail}`, "mypurchase",id)
  updateDoc(itemref, {//productrating
    ordercondition: 'confirmed'
  }) &&
  updateDoc(itemref1, {//productrating
    ordercondition: confirm
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
        <Navbar/>
        {currentnotif && currentnotif.notiftype === 'buyer' ? 
        <div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "center"}}>
    <p className='prod-head'>Username: {currentnotif.productusername}</p> 
    <p className='prod-head'>Email: {currentnotif.productemail}</p> 
    <p className='prod-head'>Description: {currentnotif.productdescription}</p> 
    <p className='prod-head'>Order Progress: {currentnotif.ordercondition}</p> 
     </div>
    </div>:<div>
      </div>}
    {currentnotifseller && currentnotifseller.notiftype === 'seller' ? 
        <div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "center"}}>
    <p className='prod-head'>Buyer Username: {currentnotifseller.buyerusername}</p> 
    <p className='prod-head'>Buyer Email: {currentnotifseller.buyeremail}</p> 
    <p className='prod-head'>Description: {currentnotifseller.productdescription}</p> 
    <p className='prod-head'>Order Progress: {currentnotifseller.ordercondition}</p> 
    <Button variant="outlined" onClick={handleClickOpen}>
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm {currentnotifseller.buyerusername} to buy {currentnotifseller.productitle}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {currentnotifseller.buyerusername} want to buy {currentnotifseller.buyerquantity} pc/s {currentnotifseller.productitle} with payment method of {currentnotifseller.paymenttype}.
          <p>Address: {currentnotifseller.buyeraddress}</p>
          <p>Contact Number: {currentnotifseller.buyercontact}</p>
          <p>Total Price: {currentnotifseller.buyertotalprice}</p>
          <DialogContentText id="alert-dialog-description">
            Clicking "agree" to confirmed the transaction. Click "cancel" to disregard transaction.
          </DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {handleClick1(); updatecondition();}} autoFocus>
            Agree
          </Button>
          <Snackbar open={open1} autoHideDuration={6000} onClose={() => {handleClose1(); handleClose();}}>
        <Alert onClose={() => {handleClose1(); handleClose();}} severity="success" sx={{ width: '100%' }}>
          Success! The transaction is complete!
        </Alert>
      </Snackbar>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
     </div>
    </div>:<div></div>}
        <Footer/>
      </div>
  )
}

export default Notificationspecificpage