import React, { useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'
import cartlogo from '../Components/assets/cartlogo.png'
import profilelogo from '../Components/assets/profilelogo.png'
import applogo from '../Components/assets/applogo.png'
import { UilBell } from "@iconscout/react-unicons";
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import Dropdown from 'react-bootstrap/Dropdown'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductSlider from './Some-Product-Components/ProductSlider'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import Notificationcardmini from './Notificationcardmini'

const Navbar = () => {

    const gotoNotification = () => {navigate('/notification');};
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  function GetCurrentUser () {
    const[user,setUser] = useState ('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
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

const navigate = useNavigate()

const handleLogout = ()=>{
  auth.signOut().then(() => {
    navigate("/login")
  })
}
const [notification, setnotification] = useState([]);
      if (loggeduser) {
        const getnotification = async () => {
            const email1 = loggeduser[0].email
            const q = query(collection(db, "users", `${email1}`,"notification"),where("read", "==", "not"))
            const data = await getDocs(q);
            setnotification(data.docs.map((doc) =>({...doc.data(),id:doc.id})))
        }
        getnotification();
      }
/*const [notification, setnotification] = useState([]);
if (loggeduser) {
  const getnotification = async () => {
    const notificationArray = [];
    const email1 = loggeduser[0].email
    
    // console.log(path)
    getDocs(collection(db,"users", `${email1}`,"notification"),where("read","==","not")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        notificationArray.push({ ...doc.data(), id: doc.id})
      });
      setnotification(notificationArray)
      // console.log('done')s
    }).catch('Error error error')
  
  }
  getnotification()
  }*/
const [cartdata, setcartdata] = useState([]);
if (loggeduser) {
  const getcartdata = async () => {
    const cartArray = [];
    const email1 = loggeduser[0].email
    // console.log(path)
    getDocs(collection(db,"users", `${email1}`,"cart")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        cartArray.push({ ...doc.data(), id: doc.id })
      });
      setcartdata(cartArray)
      // console.log('done')
    }).catch('Error error error')

  }
  getcartdata()
}
//Socialhome 49line
const [notifdata, setnotifdata] = useState([]);
if (loggeduser) {
  const getnotifdata = async () => {
    const notifArray = [];
    const email1 = loggeduser[0].email
    // console.log(path)
    getDocs(collection(db,"users", `${email1}`,"notification"), orderBy("timestamp", "desc")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        notifArray.push({ ...doc.data(), id: doc.id })
      });
      setnotifdata(notifArray)
      // console.log('done')
    }).catch('Error error error')

  }
  getnotifdata()
}
const [shows3, setshows3] = useState(false)
const [search, setsearch] = useState("")

const [searchvalue, setsearchvalue] = useState([]);
useEffect (() => {
    //const usersearch = search.toUpperCase();
    const searchvalueArray = [];
    const docRef = query(collection(db, "All-Added-Product", "products", "allproduct"),where("producttitle", "==", search), where("producttype", "==", search), where("productype1", "==", search));
    getDocs(docRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        searchvalueArray.push({id: doc.id, post: doc.data()})
      })
      setsearchvalue(searchvalueArray)
    }).catch('Error error error')
  }, [])

  const gotosearch = ()=>{
       if((search === '')){
        navigate('/')
       }
       else {
        navigate(`/search/${search}`)
       }        
  }
  return (
    <div>
      {!loggeduser &&
    <nav>
        <div className='s1'>
          <Link to='/' >
          <img src={applogo} alt='logo' /></Link>
            
            <form className='searchbar' onSubmit={gotosearch}>
            
                <input typ="text" placeholder="Search for products and categories" onChange={(event) => setsearch(event.target.value)}/>

                <button type='submit' onClick={gotosearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </button>
            </form>

            <div className='right'>
                <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                        <Dropdown.Item href="/signup">Signup</Dropdown.Item>
                        
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <div className='s2'>
            <Link to='/'>
                <a>Home</a>
            </Link>
            <Link to='/cryptoys/login'>
                <a>Cryptogram</a>
            </Link>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    Categories
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href='/product-type/resin'>Resin</Dropdown.Item>
                    <Dropdown.Item href='/product-type/figmas'>Figmas</Dropdown.Item>
                    <Dropdown.Item href='/product-type/scales'>Scales</Dropdown.Item>
                    <Dropdown.Item href='/product-type/nendoroid'>Nendoroid</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    More
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item href="/contact">About Us</Dropdown.Item>
                <Dropdown.Item href="/about">Contact Us</Dropdown.Item>
                    <Dropdown.Item href="/FAQ">FAQ</Dropdown.Item>
                    <Dropdown.Item href="/privacypolicy">Privacy Policy</Dropdown.Item>
                    <Dropdown.Item href="/termsandconditions">
                        Terms & Conditions
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        {
                shows3 ?
                    <div className='s3'>
                        <div className='s31'>
                        <Link to='/'>
                            <img src={applogo} alt='logo'  /></Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => setshows3(!shows3)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        <form className='searchbar' onSubmit={gotosearch}>
            
                        <input typ="text" placeholder="Search for products and categories" onChange={(event) => setsearch(event.target.value)}/>

                        <button type='submit' onClick={gotosearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </button>
                        </form>

                        <ul className='s32'>
                            <li>
                                <Link to='/'
                                    className='stylenone'
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/cryptoys/social'
                                    className='stylenone'
                                >
                                    Cryptogram
                                </Link>
                            </li>
                            <li><Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    Categories
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item href='/product-type/resin'>Resin</Dropdown.Item>
                    <Dropdown.Item href='/product-type/figmas'>Figmas</Dropdown.Item>
                    <Dropdown.Item href='/product-type/scales'>Scales</Dropdown.Item>
                    <Dropdown.Item href='/product-type/nendoroid'>Nendoroid</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></li>

                            <li>
                            
                                
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                        <Dropdown.Item href="/signup">Signup</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>

                            <li>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        More
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item href="/contact">About Us</Dropdown.Item>
                <Dropdown.Item href="/about">Contact Us</Dropdown.Item>
                                        <Dropdown.Item href="/FAQ">FAQ</Dropdown.Item>
                                        <Dropdown.Item href="/privacypolicy">Privacy Policy</Dropdown.Item>
                                        <Dropdown.Item href="/termsandconditions">
                                            Terms & Conditions
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className='s3'>
                        <div className='s31'>
                        <Link to='/' >
                            <img src={applogo} alt='logo' /></Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                onClick={() => setshows3(!shows3)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                        </div>
                    </div>
            }
    </nav> 
    }

    {loggeduser &&
    <nav>
    <div className='s1'>
    <Link to='/' >
        <img src={applogo} alt='logo'  /></Link>
        
        <form className='searchbar' onSubmit={gotosearch}>
            
                <input typ="text" placeholder="Search for products and categories" onChange={(event) => setsearch(event.target.value)}/>

                <button type='submit' onClick={gotosearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </button>
            </form>

        <div className='right'>
        <div className='cart'>
                                    <span className='qty'>{notification.length}</span>
                                    
      <Link 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="bell">
                                            <path fill="#1c1c1c" d="M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z">
                                            </path></svg>
      </Link>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
                <Paper sx={{ width: 320 }}>
      <MenuList dense>
      <div className='wordnotif'>
        <div className='wordnotif1'>
            <div className='wordnotif2'>
                <div className='wordnotif3'>
                    <div className='wordnotif4'>
                        <div style={{marginBottom: "7px", marginTop: "7px"}}>
                            <span className='wordnotif5'>
                                <h1 style={{fontSize: "inherit", fontWeight: "inherit", color: "inherit", outline: "none"}} tabIndex={-1}>Notification</h1>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='wordnotif6'>
                    <div style={{display: "flex", flexShrink: 0}}>
                        <div style={{display: "flex", marginTop: "-8px", marginBottom: "-8px"}}>
                            <div className='wordnotif7'>
                                <a className='wordnotif8' href='/notification'>
                                <span class="tooltiptext">View All</span>
                                </a>
                                <div className='wordnotif9'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
              {notifdata.map((item) => (
                <Notificationcardmini
                key={item.id} 
                itemdata = {item}
                useremail={loggeduser[0].email}
                />
              ))}
      </MenuList>
    </Paper>
      </Menu>
    </div>
            <div className='cart'>

                <span className='qty'>{cartdata.length}</span>
                <Link to='/cart'
                    className='stylenone'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </Link>

            </div>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/userprofile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
    <div className='s2'>
        <Link to='/'>
            <a>Home</a>
        </Link>
        <Link to='/cryptoys/social'>
            <a>Cryptogram</a>
        </Link>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href='/product-type/resin'>Resin</Dropdown.Item>
                <Dropdown.Item href='/product-type/figmas'>Figmas</Dropdown.Item>
                <Dropdown.Item href='/product-type/scales'>Scales</Dropdown.Item>
                <Dropdown.Item href='/product-type/nendoroid'>Nendoroid</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Link to='/userproduct'>
                <a>My Product</a>
            </Link>
        <Link to='/sellproduct'>
                <a>Sell Product</a>
            </Link>
        <Link to='/sellerdashboard'>
                <a>Dashboard</a>
            </Link>
            <Link to='/mypurchase'>
                <a>My Purchase</a>
            </Link>
            <Link to='/buyerorder'>
                <a>My Orders</a>
            </Link>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                More
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item href="/contact">About Us</Dropdown.Item>
                <Dropdown.Item href="/about">Contact Us</Dropdown.Item>
                <Dropdown.Item href="/FAQ">FAQ</Dropdown.Item>
                <Dropdown.Item href="/privacypolicy">Privacy Policy</Dropdown.Item>
                <Dropdown.Item href="/termsandconditions">
                    Terms & Conditions
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
    {
                shows3 ?
                    <div className='s3'>
                        <div className='s31'>
                        <Link to='/' >
                            <img src={applogo} alt='logo'  /></Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => setshows3(!shows3)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        <form className='searchbar' onSubmit={gotosearch}>
            
                        <input typ="text" placeholder="Search for products and categories" onChange={(event) => setsearch(event.target.value)}/>

                        <button type='submit' onClick={gotosearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </button>
                        </form>

                        <ul className='s32'>
                            <li>
                                <Link to='/'
                                    className='stylenone'
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/cryptoys/social'
                                    className='stylenone'
                                >
                                    Cryptogram
                                </Link>
                            </li>
                            <li><Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    Categories
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item href='/product-type/resin'>Resin</Dropdown.Item>
                    <Dropdown.Item href='/product-type/figmas'>Figmas</Dropdown.Item>
                    <Dropdown.Item href='/product-type/scales'>Scales</Dropdown.Item>
                    <Dropdown.Item href='/product-type/nendoroid'>Nendoroid</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></li>

                            <li>
                            <div className='cart'>
                                    <span className='qty'>{notification.length}</span>
                                    
      <Link 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="bell">
                                            <path fill="#1c1c1c" d="M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z">
                                            </path></svg>
      </Link>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Paper sx={{ width: 320 }}>
      <MenuList dense>
      <div className='wordnotif'>
        <div className='wordnotif1'>
            <div className='wordnotif2'>
                <div className='wordnotif3'>
                    <div className='wordnotif4'>
                        <div style={{marginBottom: "7px", marginTop: "7px"}}>
                            <span className='wordnotif5'>
                                <h1 style={{fontSize: "inherit", fontWeight: "inherit", color: "inherit", outline: "none"}} tabIndex={-1}>Notification</h1>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='wordnotif6'>
                    <div style={{display: "flex", flexShrink: 0}}>
                        <div style={{display: "flex", marginTop: "-8px", marginBottom: "-8px"}}>
                            <div className='wordnotif7'>
                                <a className='wordnotif8' href='/notification'>
                                <span class="tooltiptext">View All</span>
                                </a>
                                <div className='wordnotif9'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
              {notifdata.map((item) => (
                <Notificationcardmini 
                key={item.id} 
                itemdata = {item}
                useremail={loggeduser[0].email}
                />
              ))}
            
        <Divider />
      <Button variant="outlined"onClick={gotoNotification} style={{ alignItems: 'center', minWidth: "100%"}}>View All</Button>
      </MenuList>
    </Paper>
      </Menu>
    </div>
                                <div className='cart'>

                                    <span className='qty'>{cartdata.length}</span>
                                    <Link to='/cart'
                                        className='stylenone'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </Link>

                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item href="/userprofile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>

                            <li>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        More
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item href="/contact">About Us</Dropdown.Item>
                <Dropdown.Item href="/about">Contact Us</Dropdown.Item>
                                        <Dropdown.Item href="/FAQ">FAQ</Dropdown.Item>
                                        <Dropdown.Item href="/privacypolicy">Privacy Policy</Dropdown.Item>
                                        <Dropdown.Item href="/termsandconditions">
                                            Terms & Conditions
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className='s3'>
                        <div className='s31'>
                        <Link to='/' >
                            <img src={applogo} alt='logo'  /></Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                onClick={() => setshows3(!shows3)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                        </div>
                    </div>
            }
</nav>}
    </div>
)
}

export default Navbar