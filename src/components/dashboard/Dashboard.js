import { useState, useEffect } from "react";
import Category from "../reusable/category/Category";
import Card from "../screen/Card/Card";
import { useNavigate } from "react-router-dom";
import Slider from "../reusable/slider/Slider";
import Navbar from "../reusable/navbar/Navbar";
import Footer from "../reusable/footer/Footer";
import { getAds } from "../config/Firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const ads = await getAds();
    setProducts(ads);
  };

  // const fetchApi = () => {
  //   fetch("https://dummyjson.com/products/")
  //     .then((res) => res.json())
  //     .then((res) => setData(res))
  //     .catch((error) => console.log("Error fetching data: ", error));
  // };

  if (!products) {
    return <div>LOADING.....</div>;
  }

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <Navbar />
        <Slider />
        <Category />
        <div className="container-fluid">
          <div className="row">
            {/* {products.map(item => {
              return <Card item = {item}/>
            })} */}

            {products.map((item) => {
              const { imageUrl, title, description, price, id, brand } = item;
              return (
                <Card
                  // item={item}
                  id={id}
                  brand={brand}
                  imageUrl={imageUrl}
                  title={title}
                  description={description}
                  price={price}
                  // onClick={onClick} // Commented out or remove this line
                />
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
