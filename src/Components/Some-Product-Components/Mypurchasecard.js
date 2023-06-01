import React, { useState, useEffect } from 'react'
import '../CartCard.css'
import { deleteDoc, doc, setDoc, updateDoc, addDoc, collection, serverTimestamp, increment, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfigs/firebaseConfig';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaStar } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Mypurchasecard = (props) => {
    const deletcartitem =  async () => {
        await deleteDoc(doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`))
        .then(() => {
            console.log('Doc Deleted')
        })
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif"
      };
      const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};
 const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  const [currentValue1, setCurrentValue1] = useState(0);
  const [hoverValue1, setHoverValue1] = useState(undefined);
  const stars1 = Array(5).fill(0)

  const handleClick1 = value1 => {
    setCurrentValue1(value1)
  }

  const handleMouseOver1 = newHoverValue1 => {
    setHoverValue1(newHoverValue1)
  };

  const handleMouseLeave1 = () => {
    setHoverValue1(undefined)
  }
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};
const [successMsg, setSuccessMsg] = useState('');
const [errorMsg, setErrorMsg] = useState("")
    const handleRating = async () => {
      const done = 'done';
      const buyerref = doc(db,"users", `${props.useremail}`,"mypurchase",`${props.itemdata.id1}`);
            const itemref = doc(db,"All-Added-Product","products", "allproduct",`${props.itemdata.productuid}`);
            const itemref1 = doc(db,"All-Added-Product","products", `products-${props.itemdata.producttype.toUpperCase()}`,`${props.itemdata.productuid}`);
            const itemref2 = doc(db,"users", `${props.itemdata.productemail}`,"listing",`${props.itemdata.productuid}`);
            const userref = doc(db,"users", `${props.itemdata.productemail}`);
            if ((currentValue === '') && (currentValue1 === '')) {
              console.log('Empty Array')
              setSuccessMsg('')
                          setErrorMsg('Please fill all required fields.')
                          setTimeout(() => {
                              setErrorMsg('');
                              
                          }, 2000);
            }
            else {
              updateDoc(itemref, {
                productrating: increment(currentValue), ratingnumber: increment(1)
            }) &&
             updateDoc(itemref1, {//productrating
                productrating: increment(currentValue), ratingnumber: increment(1)
            }) &&
             updateDoc(itemref2, {//productrating
                productrating: increment(currentValue), ratingnumber: increment(1)
            }) &&
             updateDoc(userref, {//userrating
                userrating: increment(currentValue1), ratingusernumber: increment(1)
            }) && 
            updateDoc(buyerref, {//buyerratingdata
              prodrateequal: increment(currentValue), userrateequal: increment(currentValue1), ratingcondition: done,
           }).then(() => {console.log('changed  quantity')})
            }
    }
   /* const handleproductrating = async (e) => {
      e.preventDefault();
            const itemref = doc(db,"All-Added-Product","products", "allproduct",`${props.itemdata.productuid}`);
            const itemref1 = doc(db,"All-Added-Product","products", `products-${props.itemdata.producttype.toUpperCase()}`,`${props.itemdata.productuid}`);
            const itemref2 = doc(db,"users", `${props.itemdata.productemail}`,"listing",`${props.itemdata.producttype}${props.itemdata.productitle}`);
            const done = 'done';
            const buyerref = doc(db,"users", `${props.useremail}`,"mypurchase",`${props.itemdata.id1}`);
            updateDoc(itemref, {
                productrating: increment(currentValue), ratingnumber: increment(1)
            }) &&
             updateDoc(itemref1, {//productrating
                productrating: increment(currentValue), ratingnumber: increment(1)
            }) &&
             updateDoc(itemref2, {//productrating
                productrating: increment(currentValue), ratingnumber: increment(1)
            }) &&
            updateDoc(buyerref, {//buyerratingdata
              prodrateequal: increment(currentValue), ratingcondition: done,
           }).then(() => {console.log('changed  quantity')})
    }
    const handleuserrating = async (e) => {
      e.preventDefault();
      const done = 'done';
      const buyerref = doc(db,"users", `${props.useremail}`,"mypurchase",`${props.itemdata.id1}`);
            const userref = doc(db,"users", `${props.itemdata.productemail}`);
            updateDoc(userref, {//userrating
              userrating: increment(currentValue1), ratingusernumber: increment(1)
          }) &&
          updateDoc(buyerref, {//buyerratingdata
            userrateequal: increment(currentValue1), ratingcondition: done,
         }).then(() => {console.log('changed  quantity')})
    }*/
const handleBuyerratedata = async () => {
  
  const done = 'done';
  const buyerref = doc(db,"users", `${props.useremail}`,"mypurchase",`${props.itemdata.id1}`);
  if ((currentValue === '') && (currentValue1 === '')) {
    console.log('Empty Array')
    setSuccessMsg('')
                setErrorMsg('Please fill all required fields.')
                setTimeout(() => {
                    setErrorMsg('');
                    
                }, 2000);
  }
  else{
    updateDoc(buyerref, {//buyerratingdata
    prodrateequal: increment(currentValue), userrateequal: increment(currentValue1), ratingcondition: done,
 }).then(() => {console.log('changed  quantity')})
}
}

const [open1, setOpen1] = React.useState(false);

const handleClickOpen1 = () => {
  setOpen1(true);
};

const handleClose1 = () => {
  setOpen1(false);
};

  return (
    <div className='cart-prod-container'>
        <div className='cart-prod-imgtitle'>
            <div className='prod-image'><img src={props.itemdata.productimage} /></div>
            <a href={`/mypurchase/${props.useremail}/${props.itemdata.id1}`} className='prod-title'>{props.itemdata.productitle}</a>
        </div>
        <div className='prod-title'>Payment: {props.itemdata.paymenttype}</div>
        <div className='prodprice'>₱{props.itemdata.producttotalprice}</div>
        
        <div>
      <Button onClick={handleOpen}>View</Button>
      {props.itemdata.ordercondition !== 'confirmed' && props.itemdata.prodrateequal === 0 && props.itemdata.userrateequal === 0? 
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is in Progress...
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      </div>
    :
    <div>
      {props.itemdata.ordercondition === 'confirmed' && props.itemdata.prodrateequal !== 0 && props.itemdata.userrateequal !== 0 ? 
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is Confirmed and Rating Done.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis
          </Typography>
          <div style={styles.container}>
      <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
      <div style={styles.stars}>
        {stars.map((_, index3) => {
          return (
            <FaStar
              key={index3}
              size={24}
              color={(props.itemdata.prodrateequal) > index3 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a></h2>
      <div style={styles.stars}>
        {stars1.map((_, index4) => {
          return (
            <FaStar
              key={index4}
              size={24}
              color={(props.itemdata.userrateequal) > index4 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <Button onClick={handleClose}>Close</Button>
    </div>
          
        </Box>
      </Modal>
      </div>
    :
    <div>
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is Confirmed and Please Rate.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          
          <div style={styles.container}>
      <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              onChange={(e) => setCurrentValue(e.target.value)}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a> </h2>
      <div style={styles.stars}>
        {stars1.map((_, index1) => {
          return (
            <FaStar
              key={index1}
              size={24}
              onClick={() => handleClick1(index1 + 1)}
              onMouseOver={() => handleMouseOver1(index1 + 1)}
              onMouseLeave={handleMouseLeave1}
              onChange={(e) => setCurrentValue1(e.target.value)}
              color={(hoverValue1 || currentValue1) > index1 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      {currentValue === 0 || currentValue1 === 0 ?
      <div>
        <Button variant="outlined" onClick={handleClickOpen1}>
        Submit
      </Button>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Rate"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Plase rate the product and the vendor.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </div>:
      <div><button  onClick={() => {  handleRating(); handleClose(); }}
      style={styles.button}
    >
      Submit
    </button></div>}   
    </div>
        
        </Box>
      </Modal>
      </div></div>}
      </div>}





{/* 
      {props.itemdata.ordercondition !== 'confirmed' && props.itemdata.prodrateequal === 0 && props.itemdata.userrateequal === 0? 
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is in Progress...
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      </div>
    :
    <div>
      {props.itemdata.ordercondition === 'confirmed' && props.itemdata.prodrateequal === 0 && props.itemdata.userrateequal === 0 ?
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is Confirmed and Please Rate.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <form onSubmit={handleRating}>
          <div style={styles.container}>
      <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              onChange={(e) => setCurrentValue(e.target.value)}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a> </h2>
      <div style={styles.stars}>
        {stars1.map((_, index1) => {
          return (
            <FaStar
              key={index1}
              size={24}
              onClick={() => handleClick1(index1 + 1)}
              onMouseOver={() => handleMouseOver1(index1 + 1)}
              onMouseLeave={handleMouseLeave1}
              onChange={(e) => setCurrentValue1(e.target.value)}
              color={(hoverValue1 || currentValue1) > index1 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <button type='submit' onClick={() => { handleBuyerratedata(); handleClose(); }}
        style={styles.button}
      >
        Submit
      </button>
      
    </div>
        </form>
        </Box>
      </Modal>
      </div>
      :
      <div>
      {props.itemdata.ordercondition === 'confirmed' && props.itemdata.prodrateequal === 0 && props.itemdata.userrateequal !== 0 ?
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is Confirmed and Please Rate the Product.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <form onSubmit={handleproductrating}>
          <div style={styles.container}>
      <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              onChange={(e) => setCurrentValue(e.target.value)}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a></h2>
      <div style={styles.stars}>
        {stars1.map((_, index4) => {
          return (
            <FaStar
              key={index4}
              size={24}
              color={(props.itemdata.userrateequal) > index4 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <button type='submit' onClick={() => { handleClose();}}
        style={styles.button}
      >
        Submit
      </button>
      
    </div>
    </form>
        </Box>
      </Modal>
      </div>:
        <div>
          {props.itemdata.ordercondition === 'confirmed' && props.itemdata.prodrateequal !== 0 && props.itemdata.userrateequal === 0 ?
          <div>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is Confirmed and Please Rate the Vendor.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          
          <form onSubmit={handleuserrating}>
          <div style={styles.container}>
          <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
      <div style={styles.stars}>
        {stars.map((_, index3) => {
          return (
            <FaStar
              key={index3}
              size={24}
              color={(props.itemdata.prodrateequal) > index3 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a></h2>
      <div style={styles.stars}>
        {stars1.map((_, index1) => {
          return (
            <FaStar
              key={index1}
              size={24}
              onClick={() => handleClick1(index1 + 1)}
              onMouseOver={() => handleMouseOver1(index1 + 1)}
              onMouseLeave={handleMouseLeave1}
              onChange={(e) => setCurrentValue1(e.target.value)}
              color={(hoverValue1 || currentValue1) > index1 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <button type='submit' onClick={() => { handleClose();}}
        style={styles.button}
      >
        Submit
      </button>
      
    </div>
    </form>
        </Box>
      </Modal>
          </div>:
          <div>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order is Confirmed and Rating Done.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis
          </Typography>
          <div style={styles.container}>
      <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
      <div style={styles.stars}>
        {stars.map((_, index3) => {
          return (
            <FaStar
              key={index3}
              size={24}
              color={(props.itemdata.prodrateequal) > index3 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a></h2>
      <div style={styles.stars}>
        {stars1.map((_, index4) => {
          return (
            <FaStar
              key={index4}
              size={24}
              color={(props.itemdata.userrateequal) > index4 ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <button
        style={styles.button}
      >
        Submit
      </button>
    </div>
          
        </Box>
      </Modal>
            </div>}
          </div>}
        </div>}
      </div>}*/}
    </div>
        <button className='deletebtn' onClick={deletcartitem}>DEL</button>
    </div>
  )
}

export default Mypurchasecard