import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import './Allproductpage.css'
import Productcontainer from './Productcontainer'
import { 
    collection, 
    query, 
    onSnapshot, getDocs, orderBy } 
from "firebase/firestore";

import { db } from '../../FirebaseConfigs/firebaseConfig';
import Footer from '../Footer';

const Allproductpage = (props) => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = () => {

            const productsArray = [];
            
            console.log(props)

            getDocs(collection(db, "All-Added-Product","products", `products-${props.type.toUpperCase()}`), orderBy('timestamp', 'desc')).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    productsArray.push({ ...doc.data(), id: doc.id })
                });
                setProducts(productsArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getProducts();
    }, [])


  return (
    <div className='allproductpage'>
        <Navbar />
        <div className='heading'>
            <p>Top Results for {props.type}</p>
        </div>

        <div className='allproductcontainer'>
            {products.map((product) => (
                <Productcontainer 
                key={product.id}
                product={product}
                />
            ))}
        </div>
        <Footer/>
    </div>
  )
}

export default Allproductpage