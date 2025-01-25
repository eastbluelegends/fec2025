import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import '../../../assets/styles.css';



const Similar = () => {

  const [similar, setSimilar] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1', {headers: {Authorization: process.env.AUTH_SECRET}})
    .then((response) => {
      setProducts(response.data);
    })
    .catch((err) => {
      console.error('Similar failed', err);
    })
  }

    React.useEffect(() => {
      getProducts()
    }, []);

    var settings = {
      arrows: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    var settings2 = {
      speed: 500,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  return (
    <>
      <div>
        Similar products go here!
      </div>
      <div className="slider-container">
        <button className="prev">Last</button>
        <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="similarCard">
                <h3>{product.name}</h3>
              </div>
            ))}
        </Slider>
        <button className="next">Next</button>
      </div>
      <div className="slider-container">
        <button className="prev">Last</button>
        <Slider {...settings2}>
          <div className="outfitCard">
            <button>Add to Outfit</button>
          </div>
        </Slider>
        <button className="next">Next</button>
      </div>
    </>
  );
};


export default Similar;

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?page=1
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/related
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles

// product[0] = {
//   campus: "hr-rfp"
//   category: "Jackets"
//   created_at: "2021-08-13T14:38:44.509Z"
//   default_price: "140.00"
//   description: "The So Fatigues will wake you up and fit you in.
//                  This high energy camo will have you blending in to even the
//                  wildest surroundings."
//   id: 40344
//   name: "Camo Onesie"
//   slogan: "Blend in to your crowd"
//   updated_at: "2021-08-13T14:38:44.509Z"
// }