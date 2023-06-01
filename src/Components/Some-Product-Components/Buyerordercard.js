import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfigs/firebaseConfig';
import { Alert, MenuItem, Stack, TextField } from '@mui/material';

const Buyerordercard = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
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
  const [open3, setOpen3] = React.useState(false);

  const handleClick3 = () => {
    setOpen3(true);
  };

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };
  const [yesorno, setyesorno] = useState('');
  const handleyesorno = (event) => {
    setyesorno(event.target.value);
};
const changeordercon = async () => {
  const confirmed = 'confirmed'
        const itemref = doc(db,"users", `${props.useremail}`,"buyerorders",`${props.itemdata.id1}`)
        const itemref1 = doc(db,"users", `${props.itemdata.buyeremail}`,"mypurchase",`${props.itemdata.id1}`)
        updateDoc(itemref, {
            ordercondition: confirmed
        }) &&
        updateDoc(itemref1, {
          ordercondition: confirmed
      }).then(() => {console.log('changed  quantity')})
}
const deleteorderitem =  async () => {
  await deleteDoc(doc(db,"users", `${props.useremail}`,"buyerorders",`${props.itemdata.id1}`))
  .then(() => {
      console.log('Doc Deleted')
  })
}
const currenciesyes = [
  {
    value: 'confirmed',
    label: 'Yes',
  },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const [openright, setOpenright] = React.useState(false);

const handleClickright = () => {
  setOpenright(true);
};

const handleCloseright = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenright(false);
};
  return (
    <div className='cart-prod-container'>
<div className='cart-prod-imgtitle'>
            <div className='prod-image'><img src={props.itemdata.productimage} /></div>
            <a className='stylenone prod-title' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a>
        </div>
        <Button variant="outlined" onClick={handleClickOpen}>
        View Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.itemdata.ordercondition === 'confirmed' ?
        <DialogTitle id="alert-dialog-title">
        <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a> Order Details.
      </DialogTitle>:
      <DialogTitle id="alert-dialog-title">
      
    </DialogTitle>}
       <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <a className='stylenone' href={`/users/${props.itemdata.buyeremail}`}>{props.itemdata.buyerusername}</a> order {props.itemdata.buyerquantity} pc/s of <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a>
          <p>Buyer Username: {props.itemdata.buyerusername}</p>
          <p>Buyer Email: {props.itemdata.buyeremail}</p>
          <p>Total Price: {props.itemdata.buyertotalprice}</p>
          <p>Order Condition: {props.itemdata.ordercondition}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {handleClose();}} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {props.itemdata.ordercondition !== 'confirmed' ?
      <div>
        <Button variant="outlined" onClick={handleClickOpen1}>
        Confirm Product
      </Button>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {"Confirm Transaction?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selecting "YES" means confirming {props.itemdata.buyerusername} "{props.itemdata.buyeremail}" to buy {props.itemdata.productitle}. If not click "cancel"
          </DialogContentText>
          <TextField id="outlined-select-currency" select label="Select" value={yesorno}  sx={{minWidth: "100%"}} onChange={changeordercon}> 
          {currenciesyes.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
        </DialogContent>
        <DialogActions>
        {yesorno === '' ?
        <Button onClick={() => { handleClick3();}} autoFocus>
        Agree
      </Button>:
      <Button onClick={() => { handleClick2(); changeordercon();}} autoFocus>
      Agree
    </Button>}
          <Snackbar open={open2} autoHideDuration={6000} onClose={() => { handleClose1(); handleClose2();}}>
        <Alert onClose={() => { handleClose1(); handleClose2();}} severity="success" sx={{ width: '100%' }}>
          Success! Transaction is complete!
        </Alert>
      </Snackbar>
      <Snackbar open={open3} autoHideDuration={6000} onClose={() => { handleClose3();}}>
        <Alert onClose={() => { handleClose3();}} severity="warning" sx={{ width: '100%' }}>
          Please select Yes!
        </Alert>
      </Snackbar>
          <Button onClick={handleClose1}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <div></div>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClickright}>
        Delete
      </Button>
      <Snackbar open={openright} autoHideDuration={6000} onClose={handleCloseright}>
        <Alert onClose={handleCloseright} severity="warning" sx={{ width: '100%' }}>
        Warning! Are you sure you want to delete the order?
        <div >
        <Button onClick={() => { deleteorderitem();}} sx={{ display: "block", alignContent: "center", width: '50%',borderRadius: "50px", borderStyle: "none", color: "yellow", backgroundColor: "red"}}>Confirm?</Button></div>
        </Alert>
      </Snackbar>
    </Stack>
      </div>:
      <></>}
    </div>
  )
}

export default Buyerordercard
//line 142 empty yes