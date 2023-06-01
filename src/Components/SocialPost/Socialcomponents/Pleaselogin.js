import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pleaselogin = () => {
    const navigate = useNavigate();
    const gotohomepage = () => {

        navigate('/cryptoys/login');
      
      }
  return (
    <div className='bglogin'>
      <div className='login-container1'>
          <form className='login-form1'>
              <p>Please Login to Use the Site</p>
              <button onClick={gotohomepage}>Go to Login Page</button>
          </form>
      </div>
      <p></p>
   </div>
  )
}

export default Pleaselogin