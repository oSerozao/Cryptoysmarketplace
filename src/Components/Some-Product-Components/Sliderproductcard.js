import React from 'react'
import { Link } from 'react-router-dom';
import './Sliderproductcard.css'

const Sliderproductcard = (product) => {
  let p = product.product
  let overalltax = 10/100;
  let overcommission = 10/100;
  let extraforfun = 10/100;

  let mrp = parseFloat(p.price);
  mrp = mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp
  const saleprice = mrp - extraforfun*mrp

  return (
    <div className='mini-product-container'>
      <div className='mini-img-container'>
        <img src={p.productimage}/>
      </div>

      <div className='mini-product-details'>
        <p className='mini-producttitle'>{p.producttitle}</p>

        <div className='mini-price-container'>
                <p className='mrp'>MRP: <p className='rate'>₱{mrp}</p></p>
                <p className='saleprice'>Discount: <p className='rate'>₱{saleprice}</p></p>
                <p className='yousave'>You Save: ₱{mrp - saleprice}</p>
            </div>
            
            <a href={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>Show more &gt;</button></a>
      </div>
    </div>
  )
}

export default Sliderproductcard