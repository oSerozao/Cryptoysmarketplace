import React, { useState, useEffect } from 'react'
import './CartCard.css'
import { deleteDoc, doc, setDoc, updateDoc, addDoc, collection, serverTimestamp, increment, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfigs/firebaseConfig';
import del from './del.png'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CartCard = (props) => {
    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);
    const [paymenttype, setPaymenttype] = useState("");
    let p = props.itemdata.product.price
    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

    let mrp = parseInt(p);
    mrp = mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp
    const saleprice = (mrp - extraforfun*mrp)*prodquantity

    // console.log(saleprice)

    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

            const itemref = doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity +1
            }).then(() => {console.log('changed  quantity')})
    }
    const decreasequantity = async () => {
        if (prodquantity >= 1) {
            setProdQuantity(prodquantity - 1)

            const itemref = doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity -1
            }).then(() => {console.log('changed  quantity')})
        }
    }

    const deletcartitem =  async () => {
        await deleteDoc(doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`))
        .then(() => {
            console.log('Doc Deleted')
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
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      
      const currencies = [
        {
          value: 'Cash on Delivery',
          label: 'Cash on Delivery',
        },
        {
          value: 'Gcash Payment',
          label: 'Gcash Payment',
        },
      ];
      const [successMsg, setSuccessMsg] = useState('');
      const [errorMsg, setErrorMsg] = useState("")
        const [open1, setOpen1] = React.useState(false);
        const handleClickOpen1 = () => {
          setOpen1(true);
        };
      
        const handleClose1 = () => {
          setOpen1(false);
        };
      
      const handleBuyandRate = () => {
        let collectionRef2 = collection(db,"users", `${props.itemdata.product.email}`, "buyerorders")
        let docRef2 = doc(collectionRef2)
        if ((paymenttype === '')) {
            console.log('Empty Array')
        }
        else {
            const numberbuyer = 1;
            const not = "not";
            const unconfirmed = "unconfirmed";
            const zero = 0;
                        setDoc (docRef2,{//seller
                          notiftype: "seller",
                          productuid: props.itemdata.idurl,
                          id1: docRef2.id,
                          productimage: props.itemdata.product.productimage,
                          productitle: props.itemdata.product.producttitle,
                          productdescription: props.itemdata.product.description,
                          productbrand: props.itemdata.product.brand,
                          producttype: props.itemdata.product.producttype,
                            buyerusername: props.userusername,
                            buyerquantity: prodquantity,
                            buyertotalprice :saleprice,
                            buyeremail:props.useremail,
                            buyercontact: props.usernumber,
                            buyeraddress: props.useraddress,
                            timestamp: serverTimestamp(),
                            ordercondition: unconfirmed,
                          paymenttype,
                      }) && 
                      setDoc (doc(db,"users", `${props.useremail}`, "mypurchase",docRef2.id),{//buyer
                        notiftype: "buyer",
                        productuid: props.itemdata.idurl,
                        id1: docRef2.id,
                        productitle: props.itemdata.product.producttitle,
                          productbrand: props.itemdata.product.brand,
                          producttype: props.itemdata.product.producttype,
                          productdescription: props.itemdata.product.description,
                          producttotalprice: saleprice,
                          productquantity: prodquantity,
                          productimage: props.itemdata.product.productimage,
                          productemail: props.itemdata.product.email,
                          productusername: props.itemdata.product.productusername,
                          timestamp: serverTimestamp(),
                          ordercondition: unconfirmed,
                          ratingcondition: not,
                          prodrateequal: zero,
                          userrateequal: zero,
                        paymenttype,
                    }) &&
                    addDoc (collection(db,"users", `${props.useremail}`, "notification"),{//buyer
                      notiftype: "buyer",
                      productitle: props.itemdata.product.producttitle,
                      productbrand: props.itemdata.product.brand,
                      producttype: props.itemdata.product.producttype,
                      producttotalprice: saleprice,
                      productquantity: prodquantity,
                      productimage: props.itemdata.product.productimage,
                      productemail: props.itemdata.product.email,
                      productusername: props.itemdata.product.productusername,
                      read: not,
                      info: `YOU buy ${prodquantity} ${props.itemdata.product.producttitle} from ${props.itemdata.product.email} with total price of ₱ ${saleprice}`,
                      link: docRef2.id,
                      timestamp: serverTimestamp(),
                        paymenttype,
                    })  &&
                    setDoc (doc(db,"users", `${props.itemdata.product.email}`, "notification", `${props.itemdata.product.producttitle}`),{//seller
                        notiftype: "seller",
                        buyerusername: props.userusername,
                        productimage: props.itemdata.product.productimage,
                        buyerquantity: prodquantity,
                        buyertotalprice :saleprice,
                        buyeremail:props.useremail,
                        buyercontact: props.usernumber,
                        buyeraddress: props.useraddress,
                        info: `${props.userusername} buy ${prodquantity} of your product ${props.itemdata.product.producttitle} with total price of ₱ ${saleprice}`,
                        link: docRef2.id,
                        read: not,
                        timestamp: serverTimestamp(),
                      paymenttype,
                  }).then(() => {
                        console.log('Confirmed Order')
                    })
        }  
      }
      // notested
      const [productnumberdata, setproductnumberdata] = useState([]);

      const getproductnumberdata = async () => {
        const productnumberdataArray = [];
        // console.log(path)
        getDocs(collection(db,"All-Added-Product","products", "allproduct")).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            productnumberdataArray.push({ ...doc.data(), id: doc.id })
          });
          setproductnumberdata(productnumberdataArray)
          // console.log('done')
        }).catch('Error error error')
    
      }
      getproductnumberdata()
      const handleNumberofBuyer = () => {
        if(productnumberdata.length === 0) {
            if((props.itemdata.product.producttype === 'Resin')) {
                setDoc(doc(db,"All-Added-Product","products"), {
                      RESINnumberofbuyer: increment(1)
                })
              }
              else if ((props.itemdata.product.producttype === 'Figmas')){
                   setDoc(doc(db,"All-Added-Product","products"), {
                  FIGMASnumberofbuyer: increment(1)
                })
              }
              else if ((props.itemdata.product.producttype === 'Nendoroid')){
                   setDoc(doc(db,"All-Added-Product","products"), {
                      NENDOROIDnumberofbuyer: increment(1)
                  })
              }
              else if ((props.itemdata.product.producttype === 'Scales')){
                   setDoc(doc(db,"All-Added-Product","products"), {
                      SCALESnumberofbuyer: increment(1)
                  })
              }
              else {
                  addDoc(doc(db,"All-Added-Product","products"), {
                      OTHERnumberofbuyer: increment(1)
                  })
          }
        }
        else {
            if((props.itemdata.product.producttype === 'Resin')) {
                updateDoc(doc(db,"All-Added-Product","products"), {
                      RESINnumberofbuyer: increment(1)
                })
              }
              else if ((props.itemdata.product.producttype=== 'Figmas')){
                updateDoc(doc(db,"All-Added-Product","products"), {
                  FIGMASnumberofbuyer: increment(1)
                })
              }
              else if ((props.itemdata.product.producttype === 'Nendoroid')){
                updateDoc(doc(db,"All-Added-Product","products"), {
                      NENDOROIDnumberofbuyer: increment(1)
                  })
              }
              else if ((props.itemdata.product.producttype === 'Scales')){
                   setDoc(doc(db,"All-Added-Product","products"), {
                      SCALESnumberofbuyer: increment(1)
                  })
              }
              else {
                updateDoc(doc(db,"All-Added-Product","products"), {
                    OTHERnumberofbuyer: increment(1)
                  })
          }
        }
    }
      const Numberofbuyer = async () => {
       
        const itemref = doc(db,"All-Added-Product","products", "allproduct",`${props.itemdata.idurl}`)
        const itemref1 = doc(db,"All-Added-Product","products", `products-${props.itemdata.product.producttype.toUpperCase()}`,`${props.itemdata.idurl}`)
        const itemref2 = doc(db,"users", `${props.itemdata.product.email}`,"listing",`${props.itemdata.idurl}`)
        const userref = doc(db,"users", `${props.itemdata.product.email}`)
        updateDoc(itemref, {//productrating
          numberofbuyers: increment(1)
        }) &&
        updateDoc(itemref1, {//productrating
          numberofbuyers: increment(1)
        }) &&
        updateDoc(itemref2, {//productrating
          numberofbuyers: increment(1)
        }) &&
        updateDoc(userref, {//userating
            numberofbuyers: increment(1),
            usersale: saleprice
        }).then(() => {console.log('changed  quantity')})
}
const handlePaymenttype = (event) => {
    setPaymenttype(event.target.value);
};
  return (
    <div className='cart-prod-container'>
        <div className='cart-prod-imgtitle'>
            <div className='prod-image'><img src={props.itemdata.product.productimage} /></div>
            <div className='prod-title'>{props.itemdata.product.producttitle}</div>
        </div>
        <div className='prodquantity-div'>
            <button onClick={increasequantity}>+</button>
            <p>{prodquantity}</p>
            <button onClick={decreasequantity}>-</button>
        </div>
        <div className='prodprice'>₱{saleprice}</div>
        <div>
      <Button onClick={handleOpen}>Buy Now</Button>
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
              Buy {props.itemdata.product.producttitle}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <TextField disabled id="outlined-read-only-input" label="Name" defaultValue={props.userusername} InputProps={{ readOnly: true, }} sx={{minWidth: "100%"}} /><p></p>
            <TextField disabled id="outlined-read-only-input" label="Quantity" defaultValue={prodquantity} InputProps={{ readOnly: true, }} sx={{minWidth: "100%"}}/><p></p>
            <TextField disabled id="outlined-read-only-input" label="Total Price" defaultValue={saleprice} InputProps={{ readOnly: true, }} sx={{minWidth: "100%"}}/><p></p>
          <TextField disabled id="outlined-read-only-input" label="Email" defaultValue={props.useremail} InputProps={{ readOnly: true, }} sx={{minWidth: "100%"}}/><p></p>
          <TextField disabled id="outlined-read-only-input" label="Contact Number" defaultValue={props.usernumber} InputProps={{ readOnly: true, }} sx={{minWidth: "100%"}}/><p></p>
          <TextField disabled id="outlined-read-only-input" label="Address" defaultValue={props.useraddress} InputProps={{ readOnly: true, }} sx={{minWidth: "100%"}}/><p></p>
          <TextField id="outlined-select-currency" select label="Select" value={paymenttype} helperText="Please select type of payment" sx={{minWidth: "100%"}} onChange={handlePaymenttype}> 
          {currencies.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
            </Typography>
            {paymenttype === '' ?
            <div>
            <Button variant="outlined"onClick={handleClickOpen1} style={{ alignItems: 'center', minWidth: "100%"}}>
              Confirm Order
            </Button>
            <Dialog
              open={open1}
              onClose={handleClose1}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Invalid Input"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                 Please choose what type of payment you want in your transaction.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose1} autoFocus>
                  Go Back
                </Button>
              </DialogActions>
            </Dialog>
          </div>:
          <div>
          <Button variant="outlined"onClick={() => { handleBuyandRate(); handleClickOpen1(); Numberofbuyer(); handleNumberofBuyer();}} style={{ alignItems: 'center', minWidth: "100%"}}>
            Confirm Order
          </Button>
          <Dialog
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Order is Confirmed"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               Your order is confirmed. The vendor is handling the transaction.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { handleClose(); handleClose1();}} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>}
            <p></p><div>
            <Button variant="outlined" onClick={handleClose} style={{alignItems: 'center', minWidth: "100%"}}>Cancel</Button></div>
          </Box>
        </Fade>
      </Modal>
      
    </div>
        <button className='deletebtn' onClick={deletcartitem}><img src={del}/></button>
    </div>
  )
}

export default CartCard
// https://www.youtube.com/watch?v=ybC6nyBPLcM&ab_channel=CodingMSTR 12:22 "cod"