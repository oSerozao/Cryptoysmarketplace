import React, { useState, useEffect} from "react"
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc } from "firebase/firestore"
import { db, auth } from "../../FirebaseConfigs/firebaseConfig";
import Socialhome from "./Socialcomponents/Socialhome";
import './SocialPost.css'

const Social = () => {
  return (
    <div>
    
        <Socialhome/>
        
        </div>
  )
}

export default Social