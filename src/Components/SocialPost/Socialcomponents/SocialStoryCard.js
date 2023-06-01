import React, { Component, useEffect, useState } from 'react'
import Stories from 'react-insta-stories';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../FirebaseConfigs/firebaseConfig';
import { Avatar } from '@mui/material';
import defaultimage from './default.png'
const SocialStoryCard = (product) => {
    let p = product.product
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        
        p: 4,
      };
      /*const stories = [
        p.image,
        {
            url: p.image,
            duration: 5000,
            header: {
                heading: p.username,
                subheading: p.timestamp,
                profileImage: 'https://picsum.photos/100/100',
                
            },
        },
    ];*/
    const stories = [
        {
            url: p.image,
            duration: 5000,
        },
    ];


  return (
   
    <StoryContainer>
      <Button style={{display: "flex", flexDirection: "column",}} onClick={handleOpen}>
        {p.profileimage !== '' ? 
        <Avatar className="post__avatar" alt={p.username} src={p.profileimage}/>:
        <Avatar className="post__avatar" alt={p.username} src={defaultimage}/>}
        <span>{p.username}</span></Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          		<Stories
			stories={stories}
			
			width={432}
			height={768}
		/>
          </Typography>
        </Box>
      </Modal>
    </StoryContainer>


  );
}

export default SocialStoryCard
const StoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  > img {
    object-fit: contain;
    height: 60px;
    width: 60px;
    border-radius: 9999px;
    padding: 4px;
    background-image: linear-gradient(
      to right,
      rgb(251 146 60),
      rgb(217 70 239)
    );
  }
  > p {
    font-size: 12px;
    max-width: 80px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
