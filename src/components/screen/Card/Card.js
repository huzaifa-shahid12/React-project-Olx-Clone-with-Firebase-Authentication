// // Card.js
// import React from "react";
// // import { Link } from "react-router-dom";
// import "./Card.css";
// import { useNavigate } from "react-router-dom";

// function Card(props) {
//     const navigate = useNavigate();

//     const { price, title, description, thumbnail , onClick} = props;

//   // const handleClick = (e) => {
//   //   e.stopPropagation();
//   //   onClick();
//   // };

//   return (
//     <div className="Card col-md-3 mb-4">
//       {/* <Link to="/Detailspage" className="card-link"> */}
//       <div className="card" onClick={() => navigate(`/card/${id}`)}>
//         <img src={thumbnail} className="card-img-top" alt="Card Thumbnail" />
//         <div className="card-body">
//           <h5 className="card-title">{title}</h5>
//           <p className="card-text">{description}</p>
//           <h6 className="card-price">Price: {price}</h6>
//         </div>
//       </div>
//       {/* </Link> */}
//     </div>
//   );
// }

// export default Card;
// Card.js
import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Card(item) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(item, "ïtem");

  const { id, price, title, description, imageUrl, brand } = item;

  console.log("Image URL:", imageUrl);

  return (
    <div className="Card col-md-3 mb-4">
      <div className="card-item">
        <img
          src={imageUrl[0]}
          className="card-img-top"
          alt="Card Thumbnail"
          onClick={() => navigate(`/Carddetails/${id}`)}
        />
        <div className="card-detail ">
          <h6 className="card-title">Brand: {brand}</h6>
          <h5 className="card-title mt-2">{title}</h5>
          <p className="card-text mt-2">Description : {description}</p>
          <h6 className="card-price">Price: {price}</h6>
          <button className="add-to-cart">
            <a onClick={() => dispatch(addToCart(item))}>Add To Cart </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
