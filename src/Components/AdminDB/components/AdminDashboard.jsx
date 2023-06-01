import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Analytics from "./AdminTotaluser";
import Earnings from "./AdminEarnings";

import Navbar from "./AdminNavbar";

import Transfers from "./AdminTransfers";
import scrollreveal from "scrollreveal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../FirebaseConfigs/firebaseConfig";
import Adminaccessinvalid from "./Adminaccessinvalid";
export default function Dashboard() {


  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
<div>
  <div>
        <div style={{backgroundColor: 'black'}}>
    <Section>
      <Navbar />
      <div className="grid">
        <div className="row__one">
          <Analytics />
          <Earnings />
        </div>
        <div className="row__two">
          <Transfers />
          
        </div>
      </div>
    </Section>
    </div>
  </div>
</div>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100vh;
  .grid {
    display: flex;
    flex-direction: column;
    height: 85%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(0, 1fr);
      gap: 1rem;
      height: 50%;
     
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
