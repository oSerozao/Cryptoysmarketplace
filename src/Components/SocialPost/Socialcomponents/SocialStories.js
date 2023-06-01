import React,{ useState, useEffect} from 'react'
import styled from "styled-components";
import SocialAddStory from './SocialAddStory'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PlusIcon } from "@heroicons/react/outline";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SocialStoryCard from './SocialStoryCard';
import { getDocs,query, where, collection, orderBy } from 'firebase/firestore';
import { db,auth } from '../../../FirebaseConfigs/firebaseConfig';

const SocialStories = (props) => {
  // modal style
  const style = {
    position: 'absolute',
    
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function GetCurrentUser () {
    const[user,setUser] = useState (null);
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
            console.log(q);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [storyimg, setStoryImg] = useState([]);
  useEffect(() => {
      const getStoryImg = () => {

          const storiesArray = [];
          console.log(props)
          const docRef = query(collection(db,"stories"),orderBy('timestamp', 'desc'));
          getDocs(docRef).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  storiesArray.push({ ...doc.data(), id: doc.id })
              });
              setStoryImg(storiesArray)
              // console.log('done')
          }).catch('Error error error')
      }

      getStoryImg();
  }, [])
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    <StoriesWrap>
      <AddStoryWrap>
    <Button onClick={handleOpen}><PlusIcon style={{ height: 60, color: "gray", padding: 2 }} />Add Story</Button>
    </AddStoryWrap>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <SocialAddStory/>
          </Typography>
        </Box>
      </Modal>
      <div> 
      <StoryContainer>
        {storyimg.map((product) => 
            (<SocialStoryCard 
              key={product.id} 
              product={product}
              currentusername={loggeduser[0].username}
              currentprofile={loggeduser[0].profileimage} />)
            )}
            </StoryContainer>
    </div>
    </StoriesWrap>
  )
}

export default SocialStories
const StoriesWrap = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: scroll;
  background-color: #fff;
  border: 1px solid rgb(212 212 212);
  padding: 10px;
  height: 100px;
  margin-bottom: 25px;

  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
  }
`;
const AddStoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  > p {
    font-size: 12px;
  }
`;
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