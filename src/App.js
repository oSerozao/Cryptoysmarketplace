import './App.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseConfigs/firebaseConfig';
import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFOF from './Components/PgFOF';
import Cart from './Components/Cart';
import UserProfile from './Components/UserProfile';
import Addproduct from './Components/Addproduct';
import Allproductpage from './Components/Some-Product-Components/Allproductpage';
import Specificproductpage from './Components/Some-Product-Components/Specificproductpage';
import Dashboardapp from './Components/Dashboard-Seller/Dashboardapp';
import Myorder from './Components/Dashboard-Seller/components/MainDash/Myorder';
import Mycustomers from './Components/Dashboard-Seller/components/MainDash/Mycustomers';
import Myproducts from './Components/Dashboard-Seller/components/MainDash/Myproducts';
import Mycart from './Components/Dashboard-Seller/components/MainDash/Mycart';
import Myprofile from './Components/Dashboard-Seller/components/MainDash/Myprofile';
import Selldashboard from './Components/Dashboard-Seller/components/MainDash/Selldashboard';
import Productpage from './Components/Some-Product-Components/Productpage';
import AdminApp from './Components/AdminDB/AdminApp';
import AdminLogin from './Components/AdminDB/AdminLogin';
import AdminAllUsers from './Components/AdminDB/components/AdminAllUsers';
import Social from './Components/SocialPost/Social';
import SocialLogin from './Components/SocialPost/Socialcomponents/SocialLogin';
import Notification from './Components/Notification';
import Mypurchase from './Components/Some-Product-Components/Mypurchase';
import Buyerorder from './Components/Some-Product-Components/Buyerorder';
import AdminNotification from './Components/AdminDB/components/AdminNotification';
import Specificuserpage from './Components/Some-Product-Components/Specificuserpage';
import Notificationspecificpage from './Components/Notificationspecificpage';
import AdminForgotPassword from './Components/AdminDB/components/AdminForgotPassword';
import SocialUserPage from './Components/SocialPost/Socialcomponents/SocialUserPage';
import Searchpage from './Components/Searchpage';





function App() {
  function GetCurrentUser () {
    const[user,setUser] = useState (null);
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("email","==","admin123@gmail.com"))
            console.log(q);
          const data = await getDocs(q);
          setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
          };
          getUsers();
     
    },[])
    return user
}
const loggeduser = GetCurrentUser();
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/notification" element={<Notification />} />
      <Route exact path="/userprofile" element={<UserProfile />} />
      <Route exact path="/sellproduct" element={<Addproduct />} />
      <Route exact path="/search/:item" element={<Searchpage />} />
      <Route exact path="/userproduct" element={<Productpage />} />
      <Route exact path="/userproduct" element={<Productpage />} />
      <Route exact path="/users/:email" element={<Specificuserpage />} />
      <Route exact path="/notification/:email/:id" element={<Notificationspecificpage />} />

      <Route exact path="/product-type/resin" element={<Allproductpage type={'Resin'} />} />
      <Route exact path="/product-type/figmas" element={<Allproductpage type={'Figmas'} />} />
      <Route exact path="/product-type/scales" element={<Allproductpage type={'Scales'} />} />
      <Route exact path="/product-type/nendoroid" element={<Allproductpage type={'Nendoroid'} />} />
      <Route path="/product/:type/:id" element={<Specificproductpage />}/>
      <Route exact path="/mypurchase" element={<Mypurchase />} />
      <Route exact path="/buyerorder" element={<Buyerorder/>} />
      <Route exact path="/cartdata" element={<Cart />}/>
      <Route exact path="/sellerdashboard" element={< Dashboardapp />}/>
      <Route exact path="/myorder" element={< Myorder />}/>
      <Route exact path="/mycustomers" element={< Mycustomers />}/>
      <Route exact path="/myproducts" element={< Myproducts />}/>
      <Route exact path="/sellingdb" element={< Selldashboard />}/>
      <Route exact path="/mycart" element={< Mycart />}/>
      <Route exact path="/myprofile" element={< Myprofile />}/>
      <Route exact path="/admin" element={<AdminLogin />}/>
      <Route exact path="/admin/allusers" element={<AdminAllUsers />}/>
      <Route exact path="/admin/dashboard" element={<AdminApp />}/>
      <Route exact path="/admin/forgotpassword" element={<AdminForgotPassword />}/>
      <Route exact path="/admin/notification" element={<AdminNotification />}/>
      <Route exact path="/cryptoys/login" element={<SocialLogin />}/>
      <Route exact path="/cryptoys/social" element={<Social />}/>
      <Route exact path="/cryptoys/social/:email" element={<SocialUserPage />}/>

      
      <Route path="*" element={<PgFOF />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
