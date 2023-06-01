import React, { useState, useEffect} from 'react'
import { db } from '../../../FirebaseConfigs/firebaseConfig';
import { collection, getDoc, doc, getDocs, query, where } from 'firebase/firestore'
import AdminTransferscard from './AdminTransferscard';
import styled from "styled-components";
import { HiArrowNarrowRight } from "react-icons/hi";
import avatarImage from "../assets/avatarImage.jpeg";
import { cardStyles } from "./AdminReusableStyles";


/*export default function Transfers() {
  const transactions = [
    {
      image: avatarImage,
      name: "From Kishan Sheth",
      time: "Today, 16:36",
      amount: "+$50",
    },
    {
      image: avatarImage,
      name: "To Lauras Santos",
      time: "Today, 08:49",
      amount: "-$25",
    },
    {
      image: avatarImage,
      name: "From Jadon S.",
      time: "Yesterday, 14:36",
      amount: "+$150",
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>Your Transfers</h2>
      </div>
      <div className="transactions">
        {transactions.map((transaction) => {
          return (
            <div className="transaction">
              <div className="transaction__title">
                <div className="transaction__title__image">
                  <img src={transaction.image} alt="" />
                </div>
                <div className="transaction__title__details">
                  <h3>{transaction.name}</h3>
                  <h5>{transaction.time}</h5>
                </div>
              </div>
              <div className="transaction__amount">
                <span>{transaction.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
      <a className="view" href="#">
        View all <HiArrowNarrowRight />
      </a>
    </Section>
  );
      }*/
  const AdminTransfers = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = () => {

            const usersArray = [];
            
            //console.log(props)

            getDocs(collection(db, "users")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    usersArray.push({ ...doc.data(), id: doc.id })
                });
                setUsers(usersArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getUsers();
    }, [])


  return (
    <Section>
    <div>
        <div>
            <div className="title">
              <h2>All Users</h2></div>
            <div className="transactions">
              {users.map((item) => (
                <AdminTransferscard 
                key={item.id} 
                itemdata = {item}
                useremail = {item.email}
                userpassword = {item.password}
              
                />
              ))}
            </div>
      </div>
        
    </div>
    <a className="view" href="/admin/allusers">
        View all <HiArrowNarrowRight />
      </a>
    </Section>
  )
}

export default AdminTransfers



const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title {
    h2 {
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &__title {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
          button {
            transition: 0.3s ease-in-out;
      font-size: 1.4rem;
      background-color: transparent;
          }
          &:hover {
            transform: translateX(0.5rem);
          }
        }
        &__details {
        }
      }
      &__amount {
        background-color: #d7e41e1d;
        padding: 0.2rem 0.5rem;
        width: 4rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #ffc107;
          span {
            color: black;
          }
        }
        span {
          color: #ffc107;
        }
      }
    }
  }
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #ffc107;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 375px) {
    .transactions {
      .transaction {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
