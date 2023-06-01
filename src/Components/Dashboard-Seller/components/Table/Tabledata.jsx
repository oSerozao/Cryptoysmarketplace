import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../../../../FirebaseConfigs/firebaseConfig'
import "./Table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tablecard from './Tablecard';

const Tabledata = () => {
  const { type, id } = useParams()

function GetCurrentUser () {
  const[user,setUser] = useState ("")
  const usersCollectionRef = collection(db, "users")
  useEffect(() => {
    auth.onAuthStateChanged(userlogged=>{
      if(userlogged){
        // console.log(userlogged.email)
        const getUsers = async () => {
          const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
          // console.log(q)
        const data = await getDocs(q);
        setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
        };
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

const [buyerdata, setbuyerdata] = useState([]);

if (loggeduser) {
const getbuyerdata = async () => {
  const buyerdataArray = [];
  const email1 = loggeduser[0].email
  
  // console.log(path)
  getDocs(collection(db,"users", `${email1}`,"buyerorders"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      buyerdataArray.push({ ...doc.data(), id: doc.id})
    });
    setbuyerdata(buyerdataArray)
    // console.log('done')
  }).catch('Error error error')

}
getbuyerdata()
}

return (
  <div>
    {buyerdata.length !== 0 ? 
    <div className="Table">
    <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Buyer Email</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {buyerdata.map((item) => (
              <Tablecard
              key={item.id} 
              itemdata = {item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>:
    <div className="Table">
    <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Buyer Email</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="left">Empty</TableCell>
              <TableCell align="left">Empty</TableCell>
              <TableCell align="left">Empty</TableCell>
              <TableCell align="left">Empty</TableCell>
              <TableCell align="left">Details</TableCell>
              </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>}
  </div>
)
}

export default Tabledata