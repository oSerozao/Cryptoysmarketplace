import React, { useState, useEffect} from 'react'
import { addDoc, getDocs, serverTimestamp, collection, updateDoc, deleteDoc, orderBy, QuerySnapshot, doc, setDoc, increment, query, where } from 'firebase/firestore';
import { db, storage } from '../../../FirebaseConfigs/firebaseConfig';
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Heart from "react-animated-heart";
import {RiHeart3Fill} from 'react-icons/ri';
import defaultimage from './default.png'
import { Box, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const SocialPost = ({ postId, user, username, postcaption, postimage, postemail, numberofliked, currentuseremail, currentusername, currentuserprofile, posttime, postprofileimage }) =>  {
    const [likedquantity, setlikedquantity] = useState(numberofliked);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [editComment, setEditComment] = useState('');
  const [commentID, setCommentID] = useState('');
  const [show, setShow] = useState(false)
  const { type, id } = useParams()
  //console.log(currentuseremail)
  const increaseliked = async () => {
    setlikedquantity(likedquantity + 1)
        const zero = 0;
        const itemref = doc(db, "socialpost",`${postId}`)
        const itemref1 = collection(db, "socialpost",`${postId}`,"likeduser")
        updateDoc(itemref, {
            liked: likedquantity +1
        }) && 
        addDoc(itemref1, {//userwith like need to be zero because of the increment
            currentuserliked: zero,
            currentlikedemail: currentuseremail,
            currentusername: currentusername
        }).then(() => {console.log('changed  quantity')})
}
const decreaseliked = async () => {
   if (likedquantity >= 1) {
        setlikedquantity(likedquantity - 1)

        const itemref = doc(db, "socialpost",`${postId}`)
        const itemref1 = doc(db, "socialpost",`${postId}`,"likeduser", `${currentuseremail}`)
        updateDoc(itemref, {
            liked: likedquantity -1
        }) && 
        updateDoc(itemref1, {
            currentuserliked: increment(1)
        }).then(() => {console.log('changed  quantity')})
    }
}
useEffect (() => {
  const commentArray = [];
  const unsubscribe = () => {
    if (postId) {
      getDocs(collection(db, "socialpost", postId, "comments"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commentArray.push({id: doc.id, comment: doc.data()})
        })
        setComments(commentArray)
      }).catch('Error error error')
    }
  }
    unsubscribe();
  
},[postId])

const [userliked, setuserliked] = useState([]);
  useEffect (() => {
    const userlikedArray = [];
    const unsubscribe = () => {
      if (postId) {
        getDocs(collection(db, "socialpost", postId, "likeduser")).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userlikedArray.push({id: doc.id, comment: doc.data()})
          })
          setuserliked(userlikedArray)
        }).catch('Error error error')
      }
    }
      unsubscribe();
    
  },[postId])
  const [currentuserliked, setCurrentUserliked] = useState('')
  function GetCurrentUserliked() {
    // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
    
    useEffect(() => {
        const getCurrentUserliked = async () => {
            const docRef = query(collection(db, "socialpost", postId, "likeduser"),where("currentlikedemail","==", currentuseremail));
            const docSnap = await getDocs(docRef);
            
            setCurrentUserliked(docSnap.docs.map((doc) =>({...doc.data(),id:doc.id})));
          };
          getCurrentUserliked();
    }, []);
    return currentuserliked
  }
  GetCurrentUserliked();
  const likedcurrentuser = GetCurrentUserliked();
  const postComment = (event) => {
      event.preventDefault();
      addDoc(collection(db,"socialpost", postId, "comments"),{
          text: newComment,
          username: user[0].username,
          timestamp: serverTimestamp(),
          timemillis: Date.now()/1000,
      })
      setNewComment('');
  }

  const handleEdit = (id, txt) => {
      setShow(true)
      setEditComment(txt)
      setCommentID(id)

  }

  const updateComment = () => {
      updateDoc(doc(db, "socialpost", postId, "comments", commentID),{
              text: editComment
          })
      setShow(false)

  }
  const [isClick, setClick] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open3dot = Boolean(anchorEl);
  const handleClick3dot = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose3dot = () => {
    setAnchorEl(null);
  };

  const handleDeletepost =  async () => {
    await deleteDoc(doc(db, "socialpost", postId))
    .then(() => {
      console.log('Doc Deleted')
  })}
  const [updatepostimage, setupdatepostimage] = useState("");
  const [updatecaption, setupdatecaption] = useState(postcaption);
  const handleEditpost = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `postsocial/${posttime}`)
    uploadBytes(storageRef, updatepostimage)
    .then(() => {
      getDownloadURL(storageRef).then(url => {
        updateDoc (doc(db, "socialpost", postId), {
          postimage: url,
          postcaption: updatecaption
        }).then(() => console.log('saved to Db Successfully'));
      })
    })
  }
  
  const styleeditpost = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    const [openeditpost, setOpeneditpost] = React.useState(false);
    const handleOpeneditpost = () => setOpeneditpost(true);
    const handleCloseeditpost = () => setOpeneditpost(false);

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    const [imageError, setImageError] = useState('');
const handleUpdateImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if(selectedFile){
        if(selectedFile && types.includes(selectedFile.type)){
            setupdatepostimage(selectedFile);
            setImageError('')
        }
        else {
            setupdatepostimage(null)
            setImageError('Please Select a Valid Image File Type(png or jpg')
        }
    }
    else{
        setImageError('Please Select a File')
    }
    
}
const [postedinfo, setpostedinfo] = useState([]);
        useEffect(() => {
            const getpostedinfo = async () => {
                
                
                // console.log(path).
                const q = query(collection(db, "users"),where("email","==",postemail))
                const data = await getDocs(q);
                setpostedinfo(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
                };
                getpostedinfo()
        }, [])
        
  return (
      <div className="post">
          {postprofileimage === '' ?
          <span className="post__header" >
          <Avatar
              className="post__avatar"
              alt={username}
              src={defaultimage}
          />
          <h3><a href={`/cryptoys/social/${postemail}`}>{username}</a></h3>
      </span>:
      <span className="post__header" >
      <Avatar
          className="post__avatar"
          alt={username}
          src={postprofileimage}
      />
      <h3><a href={`/cryptoys/social/${postemail}`}>{username}</a></h3>
  </span>}
  {postemail === currentuseremail ? <div>
  <Button
  id="basic-button"
  aria-controls={open3dot ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open3dot ? 'true' : undefined}
  onClick={handleClick3dot}
>
<MoreHorizIcon />
</Button>
<Menu
  id="basic-menu"
  anchorEl={anchorEl}
  open={open3dot}
  onClose={handleClose3dot}
  MenuListProps={{
    'aria-labelledby': 'basic-button',
  }}
>
  <MenuItem onClick={handleOpeneditpost}><EditIcon />Edit Post</MenuItem>
  <Modal
        open={openeditpost}
        onClose={handleCloseeditpost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleeditpost}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField onChange={handleUpdateImg} id="outlined-basic" type='file' variant="outlined" sx={{ width: "100%", mt: 1 }} helperText="Product Title"/>
          {imageError && <>
                  <div className="error-msg">{imageError}</div>
              </>}
          <TextField onChange={(e) => setupdatecaption(e.target.value)} id="outlined-multiline-static" multiline maxRows={10} defaultValue={postcaption} variant="outlined" sx={{ width: "100%" , mt: 1 }} />
          </Typography>
          <Button onClick={handleEditpost}>Confirm</Button>
        </Box>
      </Modal>

  <MenuItem onClick={handleDeletepost}><DeleteIcon />Delete Post</MenuItem>
  
</Menu></div>:
<></>}
          <img
              className="post__image"
              src={postimage}
          />
          
            {isClick === (false) ?
          <Heart isClick={isClick} onClick={() => {setClick(!isClick); increaseliked();}} />:
          <Heart isClick={isClick} onClick={() => {setClick(!isClick); decreaseliked();}} />}
            
            {numberofliked}
            {/*{userliked.map(({ comment }) => (
                  <>
                      <p>
                          <b>{comment.currentlikedemail}</b>
                      </p>

                  </>
              ))}*/ }
              {userliked.map(({ id, comment }) => (
                  <>
                      <span key={id}>
                          {comment.currentlikedemail}
                      </span>

                  </>
              ))}
 
          <p className="post__text">
              <b>{username}</b> {postcaption}
          </p>
                
          <div className="post__comments">
              {comments.map(({ id, comment }) => (
                  <>
                      <p key={id}>
                          <b>{comment.username}</b>: &nbsp;{comment.text}
                      </p>

                  </>
              ))}

              &nbsp;
              {comments.map(({ id, comment }) => (
                  (comment.username === username || user.username === username) &&
                  <p key={id}>
                      <EditIcon style={{ color: 'blue' }} onClick={() => { handleEdit(id, comment.text) }} />
                      <DeleteOutlineIcon style={{ color: 'red' }} onClick={() => {
                          deleteDoc(doc(db, "socialpost", postId, "comments", id))
                      }} />

                  </p>

              ))}


          </div>
          {user && show && <>
              <form className="post__commentbox">
                  <input
                      className="post__input"
                      type="text"
                      placeholder="Edit comment..."
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                  />
                  <Button
                      className="post__button"
                      disabled={!editComment}
                      type="submit"
                      onClick={updateComment}
                  >
                      update
                  </Button>
              </form>
          </>}
          {user && (
              <form className="post__commentbox">
                  <input
                      className="post__input"
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                      className="post__button"
                      disabled={!newComment}
                      type="submit"
                      onClick={postComment}
                  >
                      POST
                  </Button>
                  {
                      user.username === username &&

                      <DeleteForeverIcon style={{ color: ' red' }} onClick={() => {
                          deleteDoc(doc(db, "posts", postId,"comments"))
                      }} />
                  }
              </form>
          )}

      </div>

  );
}

export default SocialPost