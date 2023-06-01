import React, { useState, useEffect } from 'react'
import './MyCartCard.css'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../FirebaseConfigs/firebaseConfig';
import del from './del.png'

const MyCartCard = (props) => {
    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);

    let p = props.itemdata.product.price
    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

    let mrp = parseInt(p);
    mrp = mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp
    const saleprice = (mrp - extraforfun*mrp)*prodquantity

    // console.log(saleprice)

    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1)

            const itemref = doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity +1
            }).then(() => {console('changed  quantity')})
    }
    const decreasequantity = async () => {
        if (prodquantity >= 1) {
            setProdQuantity(prodquantity - 1)

            const itemref = doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`)
            await updateDoc(itemref, {
                quantity: prodquantity -1
            }).then(() => {console('changed  quantity')})
        }
    }

    const deletcartitem =  async () => {
        await deleteDoc(doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`))
        .then(() => {
            console.log('Doc Deleted')
        })
    }

  return (
    <div className='cart-prod-container'>
        <div className='cart-prod-imgtitle'>
            <div className='prod-image'><img src={props.itemdata.product.productimage} /></div>
            <div className='prod-title'>{props.itemdata.product.producttitle}</div>
        </div>
        <div className='prodquantity-div'>
            <button onClick={increasequantity}>+</button>
            <p>{prodquantity}</p>
            <button onClick={decreasequantity}>-</button>
        </div>
        <div className='prodprice'>₱{saleprice}</div>
        <button className='deletebtn' onClick={deletcartitem}><img src={del}/></button>
    </div>
  )
}

export default MyCartCard