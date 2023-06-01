import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../FirebaseConfigs/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Accessform = () => {
    const [fullname, setFullName] = useState("");
    const [maintype, setMaintype] = useState("");
    const [productimage, setProductImage] = useState("");
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
    const loggeduser = GetCurrentUser();
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
    const handleRequest = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `requesttobeseller/${loggeduser[0].email}`)
        const email1 = loggeduser[0].email
        const username1 = loggeduser[0].username
        // console.log(storageRef._location.path)
        if ((fullname === '') || (maintype === '') || (productimage === ''))
        {
            console.log('Empty Array')
            setSuccessMsg('Please fill all required fields.')
                        setErrorMsg('')
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 1000);
        }
        else {
            uploadBytes(storageRef, productimage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    const initialproductrating = 0;
                    const initialbuyers = 0;
                    const ratingnumber = 0;
                    setDoc (doc(db,"users","admin123@gmail.com", "notification",`${loggeduser[0].email}`),{
                        fullname,
                        maintype,
                        productimage: url,//valid id
                        timestamp: serverTimestamp(),
                        address: loggeduser[0].address,
                        contactnum: loggeduser[0].phonenumber,
                        username: loggeduser[0].username,
                        email: loggeduser[0].email,
                    }).then(() => {
                        setSuccessMsg('Request is in process, Wait 2-3 working days to be complete your request.')
                        setErrorMsg('')
                        setTimeout(() => {
                            setSuccessMsg('');
                            navigate('/home');
                        }, 2000);
                    })
                    }
                )
            })}
        
    }
  return (
    <div style={{height: "50vh"}}>
        {loggeduser && loggeduser[0].seller == "no"  ? 
        <div className="addprod-container">
            <form className="addprod-form" onSubmit={handleRequest}>
                <p>Add Data</p>
                {successMsg && <div className="success-msg">{successMsg}</div>}
                {uploadError && <div className="error-msg">{uploadError}</div>}
                <label>Full Name</label>
                <input onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Enter Full Name" />

                <label>Valid Identification</label>
                <input onChange={handleProductImg} type="file" />
                {imageError && <>
                    <div className="error-msg">{imageError}</div>
                </>}

                <label>Main Type of Toy You are Selling</label>
                <input onChange={(e) => setMaintype(e.target.value)} type="text" placeholder="eg. Anime Figurine, Kids Toy" />

                <button type='submit'>Add</button>
            </form>
        </div> : <div>You don't have access to add Products</div>}
        <p></p>
    </div>
  )
}

export default Accessform