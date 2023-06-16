import React from 'react';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BsLinkedin } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'

const Home = () => {
  return (
    <div className="container">
      <br></br>
      <Carousel>
        <Carousel.Item>

          <img
            className="d-block w-100 custom-image"
            src={image1}
            alt="Primeiro slide"
          />
          <div className="custom-overlay"></div>
          <Carousel.Caption style={{ textAlign: 'left' }}>
            <h3>Reciclagem de papel</h3>
            <p style={{ color: '#FFFFFF' }}>A reciclagem de papel ajuda a preservar as florestas e reduzir a poluição do ar e da água.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>

          <img
            className="d-block w-100 custom-image"
            src={image2}
            alt="Segundo slide"
          />
          <div className="custom-overlay"></div>
          <Carousel.Caption style={{ textAlign: 'left' }}>
            <h3>Reciclagem de plástico</h3>
            <p style={{ color: '#FFFFFF' }}>O plástico reciclado pode ser transformado em novos produtos, evitando a poluição causada pelo descarte inadequado.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>

          <img
            className="d-block w-100 custom-image"
            src={image3}
            alt="Terceiro slide"
          />
          <div className="custom-overlay"></div>
          <Carousel.Caption style={{ textAlign: 'left' }}>
            <h3>Reciclagem de vidro</h3>
            <p style={{ color: '#FFFFFF' }}>O vidro reciclado pode ser utilizado na fabricação de embalagens, economizando energia e recursos naturais.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
    </div>
  );
};

export default Home;
