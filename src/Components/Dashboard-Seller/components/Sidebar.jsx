import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Home from "../../Home";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilShoppingCartAlt,
  UilPricetagAlt,
  UilUserSquare,
  
} from "@iconscout/react-unicons";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  //console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:'' }
   
    >
      {/* logo */}
      <Link to='/Home' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="logo" alt="logo">
      
        <button>
        <img src={Logo} />
        </button><button>Cryp<span>toy</span>s</button>
      </div>
      </Link>

      <div className="menu">
        {
            <div>
              <div className="menu-item active">
                <Link to='/sellerdashboard' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilEstate/></button>
                <button ><span>Dashboard</span></button></Link>
              </div>
              <div className="menu-item active">
              <Link to='/myorder' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilClipboardAlt/></button>
                <button ><span>Order</span></button></Link>
              </div>
              <div className="menu-item active">
              <Link to='/mycustomers' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilUsersAlt/></button>
                <button ><span>Customer</span></button></Link>
              </div>
              <div className="menu-item active">
              <Link to='/myproducts' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilPackage/></button>
                <button ><span>Product</span></button></Link>
              </div>
              <div className="menu-item active">
              <Link to='/sellingdb' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilPricetagAlt/></button>
                <button ><span>Sell Product</span></button></Link>
              </div>
              <div className="menu-item active">
              <Link to='/mycart' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilShoppingCartAlt/></button>
                <button ><span>Cart</span></button></Link>
              </div>
              <div className="menu-item active">
              <Link to='/myprofile' style={{textDecoration: 'none', padding: 0, margin: 0, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "black"}}>
                <button><UilUserSquare/></button>
                <button ><span>Profile</span></button></Link>
              </div>
              </div>
        
        }
        {/* signoutIcon */}
        <div className="menuItem">
        <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
