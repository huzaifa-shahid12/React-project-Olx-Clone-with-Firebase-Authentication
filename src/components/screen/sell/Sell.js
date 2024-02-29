import React from "react";
import "./Sell.css";
import { useState } from "react";
// import { postAdToDb } from "../../config/Firebase";
import { postAdToDb } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();

  const postAd = async () => {
    await postAdToDb({ brand, title, description, price, image });
    navigate("/");

    setBrand("");
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className="Sell">
      <div class="sell">
        <h2>
          If you want to sell an item, please fill out this form completely.
        </h2>
        <form action="#">
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter brand name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div class="input-box">
            <input
              className="pt-2"
              type="file"
              // value={image}
              onChange={(e) => setImage([e.target.files])}
              multiple
            />
          </div>
          <div class="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>

          <div class="input-box button">
            <input type="button" value="Register Now" onClick={postAd} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sell;
