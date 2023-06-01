import React, { useState, useEffect} from "react"
import { storage, auth, db } from "../FirebaseConfigs/firebaseConfig"
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "./Navbar"
import './Addproduct.css'
import Footer from "./Footer";
import Accessform from "./Accessform";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Addproduct = () => {
    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("");
    const [producttype1, setProductType1] = useState("");
    const [keyspecs, setKeyspecs] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [customersupport, setCustomersupport] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [warranty, setWarranty] = useState("");
    const [productimage, setProductImage] = useState("");
    const [productnumber, setProductNumber] = useState("");
    const [addingid, setaddingId] = useState("");
    const { id } = useParams()
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState("")
    const [uploadError, setUploadError] = useState('');
    const navigate =useNavigate();



    function GetCurrentUser () {
        const[user,setUser] = useState (null);
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
          auth.onAuthStateChanged(userlogged=>{
            if(userlogged){
              // console.log(userlogged.email)
              const getUsers = async () => {
                const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
                console.log(q);
              const data = await getDocs(q);
              setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
              };
              getUsers();
            }
            else{
              setUser(null);
            }
          })
        },[])
        return user
    }

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']

    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('')
            }
            else {
                setProductImage(null)
                setImageError('Please Select a Valid Image File Type(png or jpg')
            }
        }
        else{
            setImageError('Please Select a File')
        }
        
    }

    const loggeduser = GetCurrentUser();
    // if (loggeduser) { console.log(loggeduser[0].email) }

    const handleAddProduct = () => {
       
        let collectionRef2 = collection(db,"All-Added-Product","products", `products-${producttype.toUpperCase()}`)
        let docRef2 = doc(collectionRef2)
        const storageRef = ref(storage, `product-images${producttype.toUpperCase()}/${docRef2.id}`)
        const email1 = loggeduser[0].email
        const username1 = loggeduser[0].username
        // console.log(storageRef._location.path)
        if ((producttitle === '') || (producttype === '') || (description === '') ||  (brand === '') || (customersupport === '') || (price === '') || (stock === '') || (warranty === '') || (keyspecs === '') || (productimage === ''))
        {
            console.log('Empty Array')
            setSuccessMsg('Please fill all required fields.')
                        setErrorMsg('')
                        setTimeout(() => {
                            setSuccessMsg('');
                            navigate('/sellproduct');
                        }, 2000);
        }
        else {
            if(producttype === 'Other') {
                if((producttype1 === '')) {
                    console.log('Empty Array')
                        
                        setErrorMsg('Please fill all required fields.')
                        setTimeout(() => {
                            setErrorMsg('');
                            navigate('/sellproduct');
                        }, 2000);
                }
                else {
                    uploadBytes(storageRef, productimage)
                .then(() => {
                    getDownloadURL(storageRef).then(url => {
                        const initialproductrating = 0;
                        const initialbuyers = 0;
                        const ratingnumber = 0;
                        const lowerproduct = producttitle.toLowerCase();
                        const lowertype = producttype1.toLowerCase();
                        const zero = 0;
                        setDoc (doc(db,"All-Added-Product","products", "allproduct",docRef2.id),{
                            id1: docRef2.id,
                            producttitle,
                            lowercaseproducttitle: lowerproduct,
                            producttype,
                            producttype1,
                            lowercaseproducttype1: lowertype,
                            description,
                            brand,
                            customersupport,
                            price,
                            warranty,
                            productimage: url,
                            keyspecs:keyspecs,
                            email: email1,
                            productrating: initialproductrating,
                            timestamp: serverTimestamp(),
                            numberofbuyers: initialbuyers,
                            productusername: username1,
                            stock,
                            ratingnumber: ratingnumber
                        }) &&
                        setDoc (docRef2 ,{
                            id1: docRef2.id,
                            producttitle,
                            producttype,
                            producttype1,
                            description,
                            brand,
                            customersupport,
                            price,
                            warranty,
                            productimage: url,
                            keyspecs:keyspecs,
                            email: email1,
                            productrating: initialproductrating,
                            timestamp: serverTimestamp(),
                            numberofbuyers: initialbuyers,
                            productusername: username1,
                            stock,
                            ratingnumber: ratingnumber
                        }) &&
                        setDoc(doc(db,"users", `${email1}`,"listing",docRef2.id), {
                            id1: docRef2.id,
                            producttitle,
                            producttype,
                            producttype1,
                            description,
                            brand,
                            customersupport,
                            price,
                            warranty,
                            productimage: url,
                            keyspecs:keyspecs,
                            email: email1,
                            productrating: initialproductrating,
                            timestamp: serverTimestamp(),
                            numberofbuyers: initialbuyers,
                            productusername: username1,
                            stock,
                            ratingnumber: ratingnumber
                        }).then(() => {
                            setSuccessMsg('New product added successfully.')
                        })
                        }
                    )
                })
                }
            }
        else {
            uploadBytes(storageRef, productimage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    const initialproductrating = 0;
                    const initialbuyers = 0;
                    const ratingnumber = 0;
                    const lowerproduct = producttitle.toLowerCase();
                    const lowertype = producttype.toLowerCase();
                    setDoc (doc(db,"All-Added-Product","products", "allproduct",docRef2.id),{
                        id1: docRef2.id,
                        producttitle,
                        producttype,
                        lowercaseproducttitle: lowerproduct,
                        lowercaseproducttype1: lowertype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs:keyspecs,
                        email: email1,
                        productrating: initialproductrating,
                        timestamp: serverTimestamp(),
                        numberofbuyers: initialbuyers,
                        productusername: username1,
                        stock,
                        ratingnumber: ratingnumber
                    }) &&
                    setDoc (docRef2 ,{
                        id1: docRef2.id,
                        producttitle,
                        producttype,
                        lowercaseproducttitle: lowerproduct,
                        lowercaseproducttype1: lowertype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs:keyspecs,
                        email: email1,
                        productrating: initialproductrating,
                        timestamp: serverTimestamp(),
                        numberofbuyers: initialbuyers,
                        productusername: username1,
                        stock,
                        ratingnumber: ratingnumber
                    })&&
                    setDoc(doc(db,"users", `${email1}`,"listing",docRef2.id), {
                        id1: docRef2.id,
                        producttitle,
                        producttype,
                        lowercaseproducttitle: lowerproduct,
                        lowercaseproducttype1: lowertype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs:keyspecs,
                        email: email1,
                        productrating: initialproductrating,
                        timestamp: serverTimestamp(),
                        numberofbuyers: initialbuyers,
                        productusername: username1,
                        stock,
                        ratingnumber: ratingnumber
                    }).then(() => {
                        setSuccessMsg('New product added successfully.')
                    })
                    }
                )
            })
        }}
        
    }
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

   const handleStock = () => {
    if(productnumberdata.length === 0) {
        if((producttype === 'Resin')) {
            setDoc(doc(db,"All-Added-Product","products"), {
                  RESIN: increment(stock)
            }).then(() => {
                          navigate('/')
                      })
          }
          else if ((producttype === 'Figmas')){
               setDoc(doc(db,"All-Added-Product","products"), {
              FIGMAS: increment(stock)
            }).then(() => {
              navigate('/')
          })
          }
          else if ((producttype === 'Nendoroid')){
               setDoc(doc(db,"All-Added-Product","products"), {
                  NENDOROID: increment(stock)
              }).then(() => {
                  navigate('/')
              })
          }
          else if ((producttype === 'Scales')){
               setDoc(doc(db,"All-Added-Product","products"), {
                  SCALES: increment(stock)
              }).then(() => {
                  navigate('/')
              })
          }
          else {
              addDoc(doc(db,"All-Added-Product","products"), {
                  OTHER: increment(stock)
              }).then(() => {
                  navigate('/')
              })
      }
    }
    else {
        if((producttype === 'Resin')) {
            updateDoc(doc(db,"All-Added-Product","products"), {
                  RESIN: increment(stock)
            }).then(() => {
                          navigate('/')
                      })
          }
          else if ((producttype === 'Figmas')){
            updateDoc(doc(db,"All-Added-Product","products"), {
              FIGMAS: increment(stock)
            }).then(() => {
              navigate('/')
          })
          }
          else if ((producttype === 'Nendoroid')){
            updateDoc(doc(db,"All-Added-Product","products"), {
                  NENDOROID: increment(stock)
              }).then(() => {
                  navigate('/')
              })
          }
          else if ((producttype === 'Scales')){
               setDoc(doc(db,"All-Added-Product","products"), {
                  SCALES: increment(stock)
              }).then(() => {
                  navigate('/')
              })
          }
          else {
            updateDoc(doc(db,"All-Added-Product","products"), {
                OTHER: increment(stock)
              }).then(() => {
                  navigate('/')
              })
      }
    }
}
    const currencies = [
        {
          value: 'Resin',
          label: 'Resin Type',
        },
        {
          value: 'Figmas',
          label: 'Figmas Type',
        },
        {
            value: 'Scales',
            label: 'Scales Type',
          },
          {
            value: 'Nendoroid',
            label: 'Nendoroid Type',
          },
          {
            value: 'Other',
            label: 'Other',
          },
      ];
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
  return (
    <div>
        <Navbar />
        {loggeduser && loggeduser[0].seller == "yes"  ? 
        <div className="addprod-container">
            {((producttitle === '') || (producttype === '') || (description === '') ||  (brand === '') || (customersupport === '') || (price === '') || (stock === '') || (warranty === '') || (keyspecs === '') || (productimage === '')) ? 
            <div className="addprod-form">
            <p>Add Data</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}
            <label>Product Title</label>
            <input onChange={(e) => setProductTitle(e.target.value)} type="text" placeholder="Product Title" />

      {producttype === 'Other'?
      <div>
        <label>Product Type</label>
            {/*<input onChange={(e) => setProductType(e.target.value)} type="text" placeholder="Product Type" />*/}
            <TextField id="outlined-select-currency" select label="Select" value={producttype}  sx={{minWidth: "100%"}} onChange={(e) => setProductType(e.target.value)}> 
      {currencies.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
      <label>Other Product Type</label>
      <input onChange={(e) => setProductType1(e.target.value)} type="text" placeholder="What type of toy?" style={{width: "100%"}} />
      </div>:
      <div>
        <label>Product Type</label>
            {/*<input onChange={(e) => setProductType(e.target.value)} type="text" placeholder="Product Type" />*/}
            <TextField id="outlined-select-currency" select label="Select" value={producttype}  sx={{minWidth: "100%"}} onChange={(e) => setProductType(e.target.value)}> 
      {currencies.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
        </div>}
            <label>Brand Name</label>
            <input onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Brand Name" />

            <label>Warranty</label>
            <input onChange={(e) => setWarranty(e.target.value)} type="text" placeholder="Product Warranty" />

            <label>Image</label>
            <input onChange={handleProductImg} type="file" />
            {imageError && <>
                <div className="error-msg">{imageError}</div>
            </>}

            <label>Key Specification</label>
            <textarea onChange={(e) => setKeyspecs(e.target.value)} placeholder="Enter Item Specification"></textarea>

            <label>Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your Product in Brief"></textarea>

            <label>Price Without Tax -</label>
            <input onChange={(e) => setPrice(e.target.value)} type='number' placeholder="Enter Price without tax" />

            <label>Product OverAll Stock</label>
            <input onChange={(e) => setStock(e.target.value)} type='number' placeholder="Enter Price without tax" />

            <label>Customer Support</label>
            <input onChange={(e) => setCustomersupport(e.target.value)} type="text" placeholder="Customer Support Email, Phone or Address" />

            {producttype === 'Other' && producttype1=== '' ?
        <button onClick={() => {handleClickOpen1();}}>Add</button>:
        <button onClick={() => {handleClickOpen1();}}>Add</button>}
        </div> 
        :
        <div className="addprod-form">
        <p>Add Data</p>
        {successMsg && <div className="success-msg">{successMsg}</div>}
        {uploadError && <div className="error-msg">{uploadError}</div>}
        <label>Product Title</label>
        <input onChange={(e) => setProductTitle(e.target.value)} type="text" placeholder="Product Title" />

  {producttype === 'Other'?
  <div>
    <label>Product Type</label>
        {/*<input onChange={(e) => setProductType(e.target.value)} type="text" placeholder="Product Type" />*/}
        <TextField id="outlined-select-currency" select label="Select" value={producttype}  sx={{minWidth: "100%"}} onChange={(e) => setProductType(e.target.value)}> 
  {currencies.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
  <label>Other Product Type</label>
  <input onChange={(e) => setProductType1(e.target.value)} type="text" placeholder="What type of toy?" style={{width: "100%"}} />
  </div>:
  <div>
    <label>Product Type</label>
        {/*<input onChange={(e) => setProductType(e.target.value)} type="text" placeholder="Product Type" />*/}
        <TextField id="outlined-select-currency" select label="Select" value={producttype}  sx={{minWidth: "100%"}} onChange={(e) => setProductType(e.target.value)}> 
  {currencies.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>  ))} </TextField>
    </div>}
        <label>Brand Name</label>
        <input onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Brand Name" />

        <label>Warranty</label>
        <input onChange={(e) => setWarranty(e.target.value)} type="text" placeholder="Product Warranty" />

        <label>Image</label>
        <input onChange={handleProductImg} type="file" />
        {imageError && <>
            <div className="error-msg">{imageError}</div>
        </>}

        <label>Key Specification</label>
        <textarea onChange={(e) => setKeyspecs(e.target.value)} placeholder="Enter Item Specification"></textarea>

        <label>Description</label>
        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your Product in Brief"></textarea>

        <label>Price Without Tax -</label>
        <input onChange={(e) => setPrice(e.target.value)} type='number' placeholder="Enter Price without tax" />

        <label>Product OverAll Stock</label>
        <input onChange={(e) => setStock(e.target.value)} type='number' placeholder="Enter Price without tax" />

        <label>Customer Support</label>
        <input onChange={(e) => setCustomersupport(e.target.value)} type="text" placeholder="Customer Support Email, Phone or Address" />

        {producttype === 'Other' && producttype1=== '' ?
        <button onClick={() => {handleClickOpen1();}}>Add</button>:
        <button onClick={() => {handleAddProduct(); handleClickOpen();}}>Add</button>}
    </div>}
            <div>
      
      <Dialog
        open={open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"The Product is Successfully Added!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loggeduser[0].username} product is successfully added. You will be redirected to Home Page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStock} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Invalid Input!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please fill up the necessary information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
        </div> : <div><Accessform/></div>}
        <p></p>
        <Footer/>
    </div>
  )
}

export default Addproduct
// 462 and 516 not tested (Type Resin Other Empty of producttype1)