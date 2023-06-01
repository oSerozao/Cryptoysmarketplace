import React from 'react'
import TableCell from "@mui/material/TableCell";
import { TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Tablecard = (props) => {

    const makeStyle=()=>{
        if(props.itemdata.ordercondition === 'confirmed')
        {
          return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
          }
        }
        else if(props.itemdata.ordercondition=== 'unconfirmed')
        {
          return{
            background: '#ffadad8f',
            color: 'red',
          }
        }
        else{
          return{
            background: '#59bfff',
            color: 'white',
          }
        }
      }
      //const datestring = props.itemdata.timemillis.toString();
      const time = Date.now() - props.itemdata.timestamp.toMillis();
      const time0 = time/60000;
      const time1 = time0/24;
      let timeago = parseInt(time1);
      var stringified = props.itemdata.timestamp.toDate().toISOString();
  //console.log(stringified);
  var split1 = stringified.split('T');
  var date = split1[0].replace(/\-/g, ' ');
  var timetrue = split1[1].split('.');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <TableRow>
        <TableCell component="th" scope="row">
                  {props.itemdata.productitle}
                </TableCell>
                <TableCell align="left">{props.itemdata.buyeremail}</TableCell>
                <TableCell align="left">{date}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(props.itemdata.ordercondition)}>{props.itemdata.ordercondition}</span>
                </TableCell>
                <TableCell align="left" className="Details">
                  <Button onClick={handleOpen}>Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <a className='stylenone' href={`/users/${props.itemdata.buyeremail}`}>{props.itemdata.buyerusername}</a> order {props.itemdata.buyerquantity} pc/s of <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a>
          <p>Buyer Username: {props.itemdata.buyerusername}</p>
          <p>Buyer Email: {props.itemdata.buyeremail}</p>
          <p>Total Price: {props.itemdata.buyertotalprice}</p>
          <p>Order Condition: {props.itemdata.ordercondition}</p>
          <Button onClick={() => {handleClose();}} autoFocus>
            Close
          </Button>
          </Typography>
        </Box>
      </Modal></TableCell>
    </TableRow>
  )
}

export default Tablecard