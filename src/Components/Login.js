import React, { useState } from 'react'
import Navbar from './Navbar'
import './Login.css'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';
import cryptoasdas from './cryptoasdas.jpg'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../FirebaseConfigs/firebaseConfig';

const Login = () => {
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState("")
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const auth = getAuth();
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
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setSuccessMsg('Logged in successfully, you will be redirected to homepage')

      setEmail('')
      setPassword('')
      setErrorMsg('')
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/home');
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
  const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleForgot = (event) => {
    setForgot(event.target.value);
};
const handleForgotpassword = () => {
    let collectionRef = collection(db, "users", "admin123@gmail.com", "forgotpassword");
    
    if ((forgot === '')) {
        console.log('Empty Array')
    }
    else {

                   addDoc (collectionRef,{//seller
                      email: forgot,
                      condition: "not",
                  }).then(() => {
                    console.log('Confirmed Order')
                })
    }  
}

  return (
    /*<div className='bg'>
        <img src={cryptoasdas} alt=""/>*/
        <div>
          <Navbar/>
          
        <div className='login-container'>
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
                <div>
                    <span>Don't have an account?</span>
                    <Link to='/signup'>Sign Up</Link>
                    <Button onClick={handleOpen}>Forgot Password?</Button>
      {forgot == '' ?
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => { handleClose1(); handleClose();}}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Forgot Password
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width: "100%"}} helperText="Enter your Email" onChange={handleForgot}/>
            </Typography>
            <Button variant="outlined" onClick={handleClickOpen1}>
        Confirm
      </Button>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => { handleClose1(); handleClose();}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Incorecct Email..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Invalid Input! Please enter your email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose1(); handleClose();}}>Go Back</Button>
        </DialogActions>
      </Dialog>
          </Box>
        </Fade>
      </Modal></div>:<div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Forgot Password
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width: "100%"}} helperText="Enter your Email" onChange={handleForgot}/>
            </Typography>
            <Button variant="outlined" onClick={handleClickOpen1}>
        Confirm
      </Button>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Request is in process..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your request is being processed. You will receive an email/text shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose1(); handleForgotpassword(); handleClose();}}>Confirm</Button>
        </DialogActions>
      </Dialog>
          </Box>
        </Fade>
      </Modal>
        </div>}
                </div>

            </form>

        </div>
        <p></p>
        <Footer/>
    </div>
  )
}

export default Login