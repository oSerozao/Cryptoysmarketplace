import React from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import slide1 from './assets/bannerimages/1.jpg'
import slide2 from './assets/bannerimages/2.png'
import slide3 from './assets/bannerimages/3.png'
import slide4 from './assets/bannerimages/4.png'
import './Banner.css'

const Banner = () => {
 
  return (
    <Carousel className='imgcaro'>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcaro"
          src={slide1}
          alt="First Slide"
        />
        <Carousel.Caption>
          <h3>Figurine Sales</h3>
          <p>Buy yours now.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcaro"
          src={slide2}
          alt="Second Slide"
        />

        <Carousel.Caption>
          <h3>Collectible Action Figures</h3>
          <p>Save upto 50%</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcaro"
          src={slide3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Collectible Anime Figures</h3>
          <p>
            Buy your favorite anime character.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgcaro"
          src={slide4}
          alt="Fourth slide"
        />

        <Carousel.Caption>
          <h3>BIG SALE!</h3>
          <p>
            Shop Now! Get Discount!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}


export default Banner