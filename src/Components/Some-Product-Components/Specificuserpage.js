import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../FirebaseConfigs/firebaseConfig';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { FaStar } from 'react-icons/fa';

const Specificuserpage = () => {
    const [specificuser, setSpecificUser] = useState('');
    const { email } = useParams()

    function GetCurrentUser () {
        const[user,setUser] = useState ("");
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
          auth.onAuthStateChanged(userlogged => {
            if (userlogged) {
              // console.log(userlogged.email)
              const getUsers = async () => {
                const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
                // console.log(q)
              const data = await getDocs(q);
              setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})))
              }
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
  
   function GetSpecificUser() {
        // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
  
        useEffect(() => {
          const getSpecificUser = async () => {
            
            const docRef = doc(db, "users", email);
            const docSnap = await getDoc(docRef);
            
            setSpecificUser(docSnap.data());
          };
          getSpecificUser();
        }, [])
        return specificuser
      }
      GetSpecificUser();
      const currentuser = GetSpecificUser();
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
        const stars = Array(5).fill(0)
        const colors = {
          orange: "#FFBA5A",
          grey: "#a9a9a9"
          
      };
      const userrating = currentuser.userrating / currentuser.ratingusernumber;
    let overalluserrating = parseInt(userrating);
  return (
    <div>
        <Navbar/>
        <div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "center"}}>
        <p className='prod-head'>Username: {currentuser.username}</p> 
        <p className='prod-head'>Email: {currentuser.email}</p> 
        <p className='prod-head'>Address: {currentuser.address}</p> 
        <p className='prod-head'>Phone Number: {currentuser.phonenumber}</p> 
        <p className='prod-head'>Buyers: {currentuser.numberofbuyers}</p> </div>
        <div style={styles.container}>
      <h2> Rating:</h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              color={(overalluserrating) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
        </div>
        </div>
            <Footer/>
            </div>
  )
}

export default Specificuserpage