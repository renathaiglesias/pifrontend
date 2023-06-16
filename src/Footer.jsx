import React from 'react';
import { BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function Footer() {
  return (
    <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-4 d-flex align-items-center">

            <span class="mb-3 mb-md-0 text-body-dark">&copy; 2023 ReciclApp, Inc</span>
          </div>

          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3">
              <a href="#" className='muted-blue'>
                <BsLinkedin size={25} />
              </a>
            </li>
            <li class="ms-3">
              <a href="#">
                <BsTwitter size={25} />
              </a>
            </li>
            <li className="ms-3">
              <a href="#" className='muted-red'>
                <BsInstagram size={25} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
  );
}

export default Footer;
