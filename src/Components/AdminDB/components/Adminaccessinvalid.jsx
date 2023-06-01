import React from 'react'
import { useNavigate } from 'react-router-dom';

const Adminaccessinvalid = () => {
    const navigate = useNavigate();
    const gotohomepage = () => {

        navigate('/');
      
      }
  return (
    <div className='bglogin'>
           
      <div className='login-container1'>
          <form className='login-form1'>
              <p>You Don't have access to the Admin Side</p>
              <button onClick={gotohomepage}>Go to Site</button>
          </form>
      </div>
      <p></p>
   </div>
  )
}

export default Adminaccessinvalid