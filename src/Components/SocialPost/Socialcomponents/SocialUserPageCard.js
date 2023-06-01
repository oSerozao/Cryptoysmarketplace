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

const SocialUserPageCard = (props) =>  {
    const [likedquantity, setlikedquantity] = useState(props.itemdata.liked);
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
        const itemref = doc(db, "socialpost",`${props.itemdata.id}`)
        const itemref1 = collection(db, "socialpost",`${props.itemdata.id}`,"likeduser")
        updateDoc(itemref, {
            liked: likedquantity +1
        }) && 
        addDoc(itemref1, {//userwith like need to be zero because of the increment
            currentuserliked: zero,
            currentlikedemail: props.useremail,
            currentusername: props.userusername
        }).then(() => {console.log('changed  quantity')})
}
const decreaseliked = async () => {
   if (likedquantity >= 1) {
        setlikedquantity(likedquantity - 1)

        const itemref = doc(db, "socialpost",`${props.itemdata.id}`)
        const itemref1 = doc(db, "socialpost",`${props.itemdata.id}`,"likeduser", `${props.useremail}`)
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
    if (props.itemdata.id) {
      getDocs(collection(db, "socialpost", props.itemdata.id, "comments"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commentArray.push({id: doc.id, comment: doc.data()})
        })
        setComments(commentArray)
      }).catch('Error error error')
    }
  }
    unsubscribe();
  
},[props.itemdata.id])

const [userliked, setuserliked] = useState([]);
  useEffect (() => {
    const userlikedArray = [];
    const unsubscribe = () => {
      if (props.itemdata.id) {
        getDocs(collection(db, "socialpost", props.itemdata.id, "likeduser")).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userlikedArray.push({id: doc.id, comment: doc.data()})
          })
          setuserliked(userlikedArray)
        }).catch('Error error error')
      }
    }
      unsubscribe();
    
  },[props.itemdata.id])
  const [currentuserliked, setCurrentUserliked] = useState('')
  function GetCurrentUserliked() {
    // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
    
    useEffect(() => {
        const getCurrentUserliked = async () => {
            const docRef = query(collection(db, "socialpost", props.itemdata.id, "likeduser"),where("currentlikedemail","==", props.useremail));
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
      addDoc(collection(db,"socialpost", props.itemdata.id, "comments"),{
          text: newComment,
          username: props.loggeduser[0].username,
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
      updateDoc(doc(db, "socialpost", props.itemdata.id, "comments", commentID),{
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
    await deleteDoc(doc(db, "socialpost", props.itemdata.id))
    .then(() => {
      console.log('Doc Deleted')
  })}
  const [updatepostimage, setupdatepostimage] = useState("");
  const [updatecaption, setupdatecaption] = useState(props.itemdata.postcaption);
  const handleEditpost = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `postsocial/${props.itemdata.timemillis}`)
    uploadBytes(storageRef, updatepostimage)
    .then(() => {
      getDownloadURL(storageRef).then(url => {
        updateDoc (doc(db, "socialpost", props.itemdata.id), {
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

  return (
      <div className="post">
          {props.postedprofile === '' ?
          <span className="post__header" >
          <Avatar
              className="post__avatar"
              alt={props.itemdata.displayname}
              src={defaultimage}
          />
          <h3><a href={`/cryptoys/social/${props.itemdata.email}`}>{props.itemdata.displayname}</a></h3>
      </span>:
      <span className="post__header" >
      <Avatar
          className="post__avatar"
          alt={props.itemdata.displayname}
          src={props.postedprofile}
      />
      <h3><a href={`/cryptoys/social/${props.itemdata.email}`}>{props.itemdata.displayname}</a></h3>
  </span>}
  {props.itemdata.email === props.email ? <div>
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
          <TextField onChange={(e) => setupdatecaption(e.target.value)} id="outlined-multiline-static" multiline maxRows={10} defaultValue={props.itemdata.postcaption} variant="outlined" sx={{ width: "100%" , mt: 1 }} />
          </Typography>
          <Button onClick={handleEditpost}>Confirm</Button>
        </Box>
      </Modal>

  <MenuItem onClick={handleDeletepost}><DeleteIcon />Delete Post</MenuItem>
  
</Menu></div>:
<></>}
          <img
              className="post__image"
              src={props.itemdata.postimage}
          />
          
            {isClick === (false) ?
          <Heart isClick={isClick} onClick={() => {setClick(!isClick); increaseliked();}} />:
          <Heart isClick={isClick} onClick={() => {setClick(!isClick); decreaseliked();}} />}
            
            {props.itemdata.liked}
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
              <b>{props.itemdata.displayname}</b> {props.itemdata.postcaption}
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
                  (comment.username === props.itemdata.displayname || props.userusername === props.itemdata.displayname) &&
                  <p key={id}>
                      <EditIcon style={{ color: 'blue' }} onClick={() => { handleEdit(id, comment.text) }} />
                      <DeleteOutlineIcon style={{ color: 'red' }} onClick={() => {
                          deleteDoc(doc(db, "socialpost", props.itemdata.id, "comments", id))
                      }} />

                  </p>

              ))}


          </div>
          {props.loggeduser && show && <>
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
          {props.loggeduser && (
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
                      props.userusername ===props.itemdata.displayname &&

                      <DeleteForeverIcon style={{ color: ' red' }} onClick={() => {
                          deleteDoc(doc(db, "posts", props.itemdata.id,"comments"))
                      }} />
                  }
              </form>
          )}

      </div>

  );
}

export default SocialUserPageCard