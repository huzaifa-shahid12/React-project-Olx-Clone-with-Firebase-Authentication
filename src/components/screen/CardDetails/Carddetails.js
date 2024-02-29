import "./App.css";
import React, { useEffect, useState } from "react";
// import { Navbar } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Navbar from "../../reusable/navbar/Navbar";
import Footer from "../../reusable/footer/Footer";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

// import { db } from "../../config/Firebase";

function Carddetails() {
  const db = getFirestore();
  const { id } = useParams();
  console.log("id", id);
  const [product, setProduct] = useState(null); // State to store the fetched product

  useEffect(() => {
    getProductDetail();
  }, [id, db]); // Fetch data whenever Id changes

  // ya kam single product ka liyee ha ka jab user kisi product par click karay to us ka data detail page par ajayee //

  const getProductDetail = async () => {
    try {
      const docRef = doc(db, "ads", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setProduct(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Id:", id);
  // fetch(`https://dummyjson.com/products/${id}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     setProduct(data); // Set the fetched data to the state
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching product:", error);
  //     // Handle errors here, e.g., display an error message
  //   });

  if (!product) {
    return <div>wait</div>;
  }
  return (
    <div className="Detail">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="detail-content">
              {product && (
                <Swiper
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {product.imageUrl.map((item) => (
                    <SwiperSlide>
                      <img src={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              {/* <img src={product.imageUrl} alt="img" /> */}

              {/* <swiperSlider /> */}
            </div>
            <div className="detail">
              <img src="data:image/png;base64,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" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                viewBox="0 0 1024 1024"
                id="icon"
              >
                <path
                  d="M768 853.3a85.4 85.4 0 1 1 0-170.7 85.4 85.4 0 0 1 0 170.7zm-512-256a85.4 85.4 0 1 1 0-170.7 85.4 85.4 0 0 1 0 170.7zm512-426.6a85.4 85.4 0 1 1 0 170.7 85.4 85.4 0 0 1 0-170.7zm0 426.6c-52.4 0-98.7 24.1-130 61.3L424.3 535.3c1-7.7 2.4-15.3 2.4-23.3 0-4.8-1-9.3-1.4-14l218.2-126A169.5 169.5 0 0 0 768 426.8 170.7 170.7 0 1 0 597.3 256c0 14.2 2.3 27.8 5.5 41L397 416a170.7 170.7 0 1 0-141 266.8c55.5-.1 104.2-27 135.4-68l209.2 120.8A170.7 170.7 0 1 0 768 597.4z"
                  class="rui-77aaa"
                />
              </svg>
              <h1>{`Rs ${product.price}`}</h1>
              <br />
              <h4>{product.title}</h4> <br />
              <h5>Others, Karachi</h5>
              <span className="span">2 Weeks ago</span>
              <br />
              <div class="cf4781f0" aria-label="Description">
                <div class="c03c2f32">
                  <h3>Description </h3>
                </div>
                <div class="_0f86855a">
                  <span>{product.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-owner">
              <div className="img"></div>
              <div className="text mt-3">
                <h3 className="span">M.Huzaifa</h3>
                <span>Member since jan 2024</span>
                <br />
                <br />
                <a>See Profile </a>
                <br />
                <button className="_4408f4a8 _58676a35" type="submit">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 1024 1024"
                    className="b32fb7b2"
                  >
                    <path d="M784.55 852.4c-331.43-14.64-598.31-281.52-612.94-612.95l149.97-60 91.69 183.43-71 35.5v26.45c0 141.66 115.25 256.9 256.9 256.9h26.45l11.86-23.64 23.68-47.36 183.38 91.74-59.99 149.93zM918.1 643.45L661.16 514.99l-57.47 19.2-30.04 60.03c-74.07-11.1-132.73-69.8-143.87-143.87l60.08-30.04L509 362.88 380.6 105.94l-54.2-20.6-214.18 85.63-26.88 39.8c0 401.37 326.57 727.9 727.94 727.9l39.76-26.88 85.64-214.19-20.61-54.19z"></path>
                  </svg>
                  <span class="_5079de6b be13fe44">Show phone number</span>
                </button>
              </div>
            </div>
            <div className="location">
              <h3>Location</h3>
              <span>I-8 Markaz Islamabad</span>
            </div>
          </div>
        </div>
      </div>
      <div className="comp">
        <Footer />
      </div>
    </div>
  );
}

export default Carddetails;
