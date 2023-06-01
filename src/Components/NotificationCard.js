import React, { useState, useEffect } from 'react'
import './CartCard.css'
import { deleteDoc, doc, setDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../FirebaseConfigs/firebaseConfig';
import del from './del.png'
import './Notification.css'

const NotificationCard = (props) => {
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
    const readnotification =  async () => {
        setReadnotif(readnotif)
        const itemref = doc(db,"users", `${props.useremail}`,"notification",`${props.itemdata.id}`)
        await updateDoc(itemref, {
            read: 'yes'
        }).then(() => {console.log('changed  quantity')})
    }
  return (
    <div className='notifcenter'>
    <button className='notifcontainer' onClick={readnotification}>
    <div className='notifimgtitle' >
        <div className='notifimage'><img src={props.itemdata.productimage} /></div>
        <div >{props.itemdata.info}</div>
        <div>{timeago} hours ago</div>
    </div>
    </button>
</div>
  )
}

export default NotificationCard
// change the css for the notif and navbar menuitems <div style={{color: 'gray'}}>{time1}</div>
