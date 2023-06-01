import React, { useState, useEffect} from "react"
import { auth, db, storage } from "../../../../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where, setDoc, doc, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import './App1.css'
import './Selldashboard.css'
import Cards from "../Cards/Cards";

const Selldashboard = () => {
    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("");
    const [keyspecs, setKeyspecs] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [customersupport, setCustomersupport] = useState("");
    const [price, setPrice] = useState("");
    const [warranty, setWarranty] = useState("");
    const [productimage, setProductImage] = useState("");

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
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

    const handleAddProduct = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `product-images${producttype.toUpperCase()}/${Date.now()}`)
        const email1 = loggeduser[0].email
        // console.log(storageRef._location.path)

        uploadBytes(storageRef, productimage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products-${producttype.toUpperCase()}`),{
                        producttitle,
                        producttype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs:keyspecs
                    }) &&
                    setDoc(doc(db,"users", `${email1}`,"listing", `products-${producttype.toUpperCase()}`), {
                        producttitle,
                        producttype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs:keyspecs
                    })
                    }
                )
            })
        


    }
    return (
        <div className="App">
          <div className="AppGlass">
          <Sidebar/>
          <div className="selldb">
          {loggeduser && loggeduser[0].email == "azores@gmail.com" ? 
        <div className="addprod-container">
            <form className="addprod-form" onSubmit={handleAddProduct}>
                <p>Add Data</p>
                {successMsg && <div className="success-msg">{successMsg}</div>}
                {uploadError && <div className="error-msg">{uploadError}</div>}
                <label>Product Title</label>
                <input onChange={(e) => setProductTitle(e.target.value)} type="text" placeholder="Product Title" />

                <label>Product Type</label>
                <input onChange={(e) => setProductType(e.target.value)} type="text" placeholder="Product Type" />

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
                <input onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Price without tax" />

                <label>Customer Support</label>
                <input onChange={(e) => setCustomersupport(e.target.value)} type="text" placeholder="Customer Support Email, Phone or Address" />

                <button type='submit'>Add</button>
            </form>
        </div> : <div>You don't have access to add Products</div>}
          </div>
          </div>
          </div>
    )
  }

export default Selldashboard