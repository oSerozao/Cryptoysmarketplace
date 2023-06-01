import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../../FirebaseConfigs/firebaseConfig";
import styled from "styled-components";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard, FaTaxi } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import Logo from './logo512.png'
import PgFOF from "../../PgFOF";
const Sidebar = () => {
  const [currentLink, setCurrentLink] = useState('');
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));
  

  const [notification, setnotification] = useState([]);
      
        const getnotification = async () => {
           
            const q = query(collection(db, "users","admin123@gmail.com","notification"))
            const data = await getDocs(q);
            setnotification(data.docs.map((doc) =>({...doc.data(),id:doc.id})))
        }
        getnotification();
      
  useEffect(() => {

    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  const navigate = useNavigate()
  const handleLogout = ()=>{
    auth.signOut().then(() => {
      navigate("/admin")
    })
  }
  return (
   
    
      
        <div>
              <Section>
              <div className="top">
                <div className="brand">
                  <img src={Logo} alt="" style={{width: '3rem', height: '3rem'}} />
                  <span>Cryptoys</span>
                </div>
                <div className="toggle">
                  {navbarState ? (
                    <VscChromeClose onClick={() => setNavbarState(false)} />
                  ) : (
                    <GiHamburgerMenu
                      onClick={(e) => {
                        e.stopPropagation();
                        setNavbarState(true);
                      }}
                    />
                  )}
                </div>
                <div className="links">
                  <ul>
                    <li
                      className={currentLink === 1 ? "active" : "none"}
                      onClick={() => setCurrentLink(1)}
                    >
                      <a href="/admin/dashboard">
                        <MdSpaceDashboard />
                        <span> Dashboard</span>
                      </a>
                    </li>
                    <li
                      className={currentLink === 2 ? "active" : "none"}
                      onClick={() => setCurrentLink(2)}
                    >
                      <a href="/admin/allusers">
                        <RiDashboard2Fill />
                        <span> All Current Users</span>
                      </a>
                    </li>
                    <li
                      className={currentLink === 3 ? "active" : "none"}
                      onClick={() => setCurrentLink(3)}
                    >
                      <a href="/admin/notification">
                      <span className='menu-item' style={{padding: 0, margin: 0}}>
                        <FaAddressCard style={{position: "relative"}} />
                        <span className='qty1'>{notification.length}</span></span>
                        <span>Not Seller</span>
                      </a>
                    </li>
                    <li
                      className={currentLink === 4 ? "active" : "none"}
                      onClick={() => setCurrentLink(4)}
                    >
                      <a href="/admin/forgotpassword">
                        <RiDashboard2Fill />
                        <span> Forgot Password</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="logout">
                <a>
                  <FiLogOut />
                  <span className="logout" onClick={handleLogout}>Logout</span>
                </a>
              </div>
            </Section>
            <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
              <div className="responsive__links">
                <ul>
                  <li
                    className={currentLink === 1 ? "active" : "none"}
                    onClick={() => setCurrentLink(1)}
                  >
                    <a href="/admin/dashboard">
                      <MdSpaceDashboard />
                      <span> Dashboard</span>
                    </a>
                  </li>
                  <li
                    className={currentLink === 2 ? "active" : "none"}
                    onClick={() => setCurrentLink(2)}
                  >
                    <a href="/admin/allusers">
                      <RiDashboard2Fill />
                      <span> All Current Users</span>
                    </a>
                  </li>
                  <li
                    className={currentLink === 3 ? "active" : "none"}
                    onClick={() => setCurrentLink(3)}
                  >
                    <a href="/admin/notification">
                      <FaAddressCard />
                      <span> Notificaiton</span>
                    </a>
                  </li>
                </ul>
              </div>
            </ResponsiveNav>
            </div>
  );
}

export default Sidebar

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #ffc107;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #ffc107;
        a {
          color: black;
        }
      }
    }
  }
`;
