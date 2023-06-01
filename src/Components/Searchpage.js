import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/firebaseConfig';
import { useParams } from 'react-router-dom';
import Searchpagecard from './Searchpagecard';
import Navbar from './Navbar';
import Footer from './Footer';

const Searchpage = () => {
    const { item } = useParams();
    const [searchvalue, setsearchvalue] = useState([]);
    // search product title
    useEffect (() => {
      let item1 = item.toLowerCase();
      //const usersearch = item.toUpperCase();
      const searchvalueArray = []
  
     const docRef = query(collection(db, "All-Added-Product", "products", "allproduct"),where("lowercaseproducttitle", "==", item1));
      getDocs(docRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
          searchvalueArray.push({id: doc.id, post: doc.data()})
        })
        setsearchvalue(searchvalueArray)
      }).catch('Error error error')
    }, [])

  /*// search product type (4)
  const [searchvaluetype, setsearchvaluetype] = useState([]);
  useEffect (() => {
    let item1 = item
    //const usersearch = item.toUpperCase();
    const searchvaluetypeArray = []

   const docRef = query(collection(db, "All-Added-Product", "products", "allproduct"),where("producttype", "==", item1));
    getDocs(docRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        searchvaluetypeArray.push({id: doc.id, post: doc.data()})
      })
      setsearchvaluetype(searchvaluetypeArray)
    }).catch('Error error error')
  }, [])*/

  // search product other
  const [searchvaluetype1, setsearchvaluetype1] = useState([]);
  useEffect (() => {
    let item1 = item.toLowerCase();
    //const usersearch = item.toUpperCase();
    const searchvaluetype1Array = []

   const docRef = query(collection(db, "All-Added-Product", "products", "allproduct"),where("lowercaseproducttype1", "==", item1));
    getDocs(docRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        searchvaluetype1Array.push({id: doc.id, post: doc.data()})
      })
      setsearchvaluetype1(searchvaluetype1Array)
    }).catch('Error error error')
  }, [])

  return (

    <div>
    <Navbar/>
    {searchvalue.length > 0  ? 
    <div>
            <div className='cart-head'>Search {item}</div>
            <div className='notifcenter'>
              {searchvalue.map((product) => (
                <Searchpagecard 
                key={product.id} 
                itemdata = {product}
                />
              ))}
            </div>
      </div>
      :
      <div>
        {searchvaluetype1.length > 0  ?
        <div>
        <div className='cart-head'>Search {item}</div>
        <div className='notifcenter'>
          {searchvaluetype1.map((product) => (
            <Searchpagecard 
            key={product.id} 
            itemdata = {product}
            />
          ))}
        </div>
      </div>
        :
        <p>No Search Result</p>}
      </div> }

    <Footer/>
    </div>
  )
}

export default Searchpage

//<p>No Search Result</p>