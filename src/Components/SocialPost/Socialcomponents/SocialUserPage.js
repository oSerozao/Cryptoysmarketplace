import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../../FirebaseConfigs/firebaseConfig';
import SocialUserPageCard from './SocialUserPageCard';

const SocialUserPage = () => {
    const { email } = useParams()

    function GetCurrentUser () {
        const[user,setUser] = useState (null);
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
          auth.onAuthStateChanged(userlogged=>{
            if(userlogged){
              // console.log(userlogged.email)
              const getUsers = async () => {
                const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
                //console.log(q);
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

    const [specificuser, setSpecificUser] = useState('');
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
      const currentspecificuser = GetSpecificUser();

      const [mysocialpost, setmysocialpost] = useState([]);
       /* useEffect(() => {
            const getmysocialpost = async () => {
                
                
                // console.log(path).
                const q = query(collection(db, "socialpost"),where("email","==",email), orderBy("timestamp", "desc"))
                const data = await getDocs(q);
                setmysocialpost(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
                };
                getmysocialpost()
        }, [])*/
 useEffect(() => {
      const getmysocialpost =  () => {

          const mysocialpostArray = [];
          //console.log(props)
          const docRef = query(collection(db, "socialpost"),where("email","==",email));
          getDocs(docRef).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  mysocialpostArray.push({ ...doc.data(), id: doc.id })
              });
              setmysocialpost(mysocialpostArray)
              // console.log('done')
          }).catch('Error error error')
      }

      getmysocialpost();
  }, [])
  return (
    <div>
    <div>{currentspecificuser.username}</div>
    <div>
    {mysocialpost.length != 0 ? <div>
          <div className='cart-head'>Posts</div>
          <div className='allcartitems'>
            {mysocialpost.map((item) => (
              <SocialUserPageCard
              key={item.id} 
              itemdata = {item}
              loggeduser = {loggeduser}
              userid={loggeduser[0].uid} 
              useremail={loggeduser[0].email}
              userprofile={loggeduser[0].profileimage}
              userusername={loggeduser[0].username}
              usernumber={loggeduser[0].phonenumber}
              useraddress={loggeduser[0].address}
              postedprofile={currentspecificuser.profileimage}
              />
            ))}
          </div>
    </div>

    : <p>No post yet</p>}
</div>
</div>
  )
}

export default SocialUserPage