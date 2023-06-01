import React, { useState, useEffect } from 'react'
import { deleteDoc, doc, setDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../FirebaseConfigs/firebaseConfig';
import './Notification.css'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

const Notificationcardmini = (props) => {
    const navigate = useNavigate();
    const time = Date.now() - props.itemdata.timestamp.toMillis();
    const time0 = time/60000;
    const time1 = time0/24;
    let timeago = parseInt(time1);
  
  
  
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    //console.log(curr_date + "-" + curr_month + "-" + curr_year);
   // const time1 = time/3600;
  
      const [readnotif, setReadnotif] = useState(props.itemdata.read);
      const readnotification =  async (e) => {
          setReadnotif(readnotif)
          e.preventDefault();
          const itemref = doc(db,"users", `${props.useremail}`,"notification",`${props.itemdata.id}`)
          await updateDoc(itemref, {
              read: "yes"
          }).then(() => {console.log('changed  quantity')})
      }
    return (
        <div>
            {props.itemdata.read == 'not' ?
            <div className='mininotifcontainer'>
            <div style={{position: "relative"}}>
              <div style={{paddingLeft: "8px", paddingRight: "8px"}}>
                  <div role='gridcell'>
                      <a className='onenotif' onClick={readnotification} href={`/notification/${props.useremail}/${props.itemdata.link}`} >
                          <div className='onenotif1'>
                              <div className='onenotif2'>
                                  <div className='onenotif3'>
                                      <img src={props.itemdata.productimage} role='none'/>
                                  </div>
                              </div>
                              <div className='onenotif4'>
                                  <div className='onenotif5'>
                                      <div>
                                          <div className='onenotif6'>
                                              <div style={{marginBottom: "0px", marginTop: "0px"}}>
                                                  <span className='onenotif7notread' dir='auto'>
                                                      <strong>{props.itemdata.info}</strong>
                                                  </span>
                                              </div>
                                              <div style={{marginBottom: "0px", marginTop: "0px"}}>
                                                  <span className='onenotif8'>
                                                      <span className='onenotif9'>
                                                          <span className='onenotif10notread'>{timeago} hours ago</span>
                                                      </span>
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      <div style={{flexDirection: "column", display: "flex", marginLeft: "-12px", marginRight: "-12px"}}>
                                          <div style={{maxWidth: "100%"}}></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className='onenotif11'></div>
                      </a>
              </div>
              </div>
            </div>
            </div>
            :
            <div className='mininotifcontainer'>
      <div style={{position: "relative"}}>
        <div style={{paddingLeft: "8px", paddingRight: "8px"}}>
            <div role='gridcell'>
                <a className='onenotif' href={`/notification/${props.useremail}/${props.itemdata.link}`}>
                    <div className='onenotif1'>
                        <div className='onenotif2'>
                            <div className='onenotif3'>
                                <img src={props.itemdata.productimage} role='none'/>
                            </div>
                        </div>
                        <div className='onenotif4'>
                            <div className='onenotif5'>
                                <div>
                                    <div className='onenotif6'>
                                        <div style={{marginBottom: "0px", marginTop: "0px"}}>
                                            <span className='onenotif7' dir='auto'>
                                                <strong>{props.itemdata.info}</strong>
                                            </span>
                                        </div>
                                        <div style={{marginBottom: "0px", marginTop: "0px"}}>
                                            <span className='onenotif8'>
                                                <span className='onenotif9'>
                                                    <span className='onenotif10'>{timeago} hours ago</span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{flexDirection: "column", display: "flex", marginLeft: "-12px", marginRight: "-12px"}}>
                                    <div style={{maxWidth: "100%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='onenotif11'></div>
                </a>
        </div>
        </div>
      </div>
      </div>}
      <Divider/>
        </div>
    )
}

export default Notificationcardmini
//<MenuItem><div className='notifimage'><img src={props.itemdata.productimage} />{props.itemdata.info} {timeago} hours ago</div></MenuItem>