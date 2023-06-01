import React,{useState} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '../FirebaseConfigs/firebaseConfig'
import { setDoc, doc, serverTimestamp, collection, addDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import Footer from './Footer'
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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpass, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddress] = useState("")
    const [forgot, setForgot] = useState("")
    const navigate =useNavigate()
    const [profileimage, setProfileImage] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [imageError, setImageError] = useState('');
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']

    const handleProfileImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setProfileImage(selectedFile);
                setImageError('')
            }
            else {
                setProfileImage(null)
                setImageError('Please Select a Valid Image File Type(png or jpg')
            }
        }
        else{
            setImageError('Please Select a File')
        }
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if((username === '') || (email === '') || (phonenumber === '') || (password === '') || (address === '')) {
          setSuccessMsg('')
          setErrorMsg('Please fill all required fields.')
          setTimeout(() => {
              setErrorMsg('');
          }, 500);
        }
        else if ((phonenumber.length < 10)){
          setSuccessMsg('')
          setErrorMsg('Invalid Input in Phone Number.')
          setTimeout(() => {
              setErrorMsg('');
          }, 1000);
        }
        else if ((password != confirmpass)){
          setSuccessMsg('')
          setErrorMsg('Invalid Input in Password')
          setTimeout(() => {
              setErrorMsg('');
          }, 1000);
        }
        else if ((password.length < 6) || (confirmpass.length < 6)){
          setSuccessMsg('')
          setErrorMsg('Password lower than 6 letters/number is Invalid')
          setTimeout(() => {
              setErrorMsg('');
          }, 1000);
        }
        else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const initialcartvalue = 0;
            const initialrating = 0;
            const initialnumberrating = 0;
            const email1 = email;
            const no = "no";
            const numberofbuyers = 0;
            const timemill = Date.now() / 1000;
            const timemillis = timemill +172800000;
            console.log(user);
            const storageRef = ref(storage, `profilepic/${email1}`)
            if (profileimage === '') {
              setDoc(doc(db,"users", `${email1}`), {
                username: username, email: email1, phonenumber:
                phonenumber, password: password, cart: initialcartvalue, userrating: initialrating, ratingusernumber: initialnumberrating,
                address: address, uid: user.uid, seller: no, timestamp: serverTimestamp(), numberofbuyers: numberofbuyers, timemillis:timemillis, profileimage: '',
            }).then(() => {
              setSuccessMsg('New User added successfully, You will now be automatically redirected to login page.')
              setUsername('')
              setPhonenumber('')
              setEmail('')
              setPassword('')
              setErrorMsg('')
              setTimeout(() => {
                  setSuccessMsg('');
                  navigate('/login');
              }, 2000);
              auth.signOut()
          }).catch((error) => { setErrorMsg(error.message) });
            }
            else {
              setDoc(doc(db,"users", `${email}`), {
                username: username, email: email, phonenumber:
                phonenumber, password: password, cart: initialcartvalue, userrating: initialrating, ratingusernumber: initialnumberrating,
                address: address, uid: user.uid, seller: no, timestamp: serverTimestamp(), numberofbuyers: numberofbuyers, timemillis:timemillis, usersale: initialcartvalue
            }) && 
            uploadBytes(storageRef, profileimage).then(() => {
              getDownloadURL(storageRef).then(url => {
                updateDoc(doc(db,"users", `${email}`), {
              profileimage: url
                })
              })
            }).then(() => {
                setSuccessMsg('New User added successfully, You will now be automatically redirected to login page.')
                setUsername('')
                setPhonenumber('')
                setEmail('')
                setPassword('')
                setErrorMsg('')
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/login');
                }, 2000);
                auth.signOut()
            }).catch((error) => { setErrorMsg(error.message) });
            }
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
    }}
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
    <div>
        <Navbar />
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
                type='tel' placeholder='(+63)' maxLength={10} />

                <label>Email</label>
                <input helperText="Some important text" onChange={(e) => setEmail(e.target.value)} 
                type='email' placeholder='Enter your email' />
                
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} 
                type='password' placeholder='Enter your password' />
                
                <label>Confirm Password</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} 
                type='password' placeholder='Enter your password' />

                <label>Image</label>
                <input onChange={handleProfileImg} type="file" />
                {imageError && <>
                    <div className="error-msg">{imageError}</div>
                </>}

                <label>Address</label>
                <textarea onChange={(e) => setAddress(e.target.value)} 
                placeholder='Enter your address'></textarea>

                <button type='submit'>Sign up</button>
                <div>
                    <span>Already have an account?</span>
                    <Link to='/login'>Sign Up</Link>
                    <Button onClick={handleOpen}>Forgot Password?</Button>
                    {forgot == '' ?
      <div>
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
        onClose={() => { handleClose1(); handleClose();}}
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
        <Footer/>
    </div>
  )
}

export default Signup