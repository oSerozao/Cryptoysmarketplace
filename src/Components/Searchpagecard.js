import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/firebaseConfig';

const Searchpagecard = (props) => {
    const [searchdata, setsearchdata] = useState([]);
    /*const getsearchdata = async () => {
        const searchdataArray = [];
        
        // console.log(path)
        getDoc(doc(db, "All-Added-Product", "products", "allproduct",props.itemdata.id)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            searchdataArray.push({ ...doc.data(), id: doc.id})
          });
          setsearchdata(searchdataArray)
          // console.log('done')
        }).catch('Error error error')
      }
      getsearchdata()
      const searchsolo = getsearchdata();*/

      function GetCurrentSearch() {
        // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
  
        useEffect(() => {
          const getsearchdata = async () => {
            
            const docRef = doc(db, "All-Added-Product", "products", "allproduct",props.itemdata.id);
            const docSnap = await getDoc(docRef);
            
            setsearchdata(docSnap.data());
          };
          getsearchdata();
        }, [])
        return searchdata
      }
      GetCurrentSearch();
      const searchsolo = GetCurrentSearch();
  return (
    <div>
        <a href={`/product/${searchsolo.producttype}/${searchsolo.id1}`}>{searchsolo.producttitle}</a>
        
    </div>
    
  )
}

export default Searchpagecard