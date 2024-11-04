import React from "react";
import { Carousel } from "react-bootstrap";

const Accueil = () => {
  return (
    <div className="carousel-container">
      <div className="container-title">
        <h1>
          Bienvenue à l'école
          <br /> St Joseph d'Aubigné Racan
        </h1>
      </div>
      <Carousel className="carousel" pause={false} interval={4000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./src/assets/images/photoaccueil.jpg?text=Image+1"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./src/assets/images/photoaccueil2.jpg?text=Image+2"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./src/assets/images/photoaccueil3.jpg?text=Image+3"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default Accueil;
