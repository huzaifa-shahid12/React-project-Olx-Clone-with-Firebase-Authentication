import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css";
import SearchableDropdown from "./SearchableDropdown.js";
import { animals } from "./data.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/Firebase.js";
import { signOut } from "firebase/auth";
import { profileData } from "../../config/Firebase.js";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCartTotal } from "../../store/cartSlice.js";

const Navbar = () => {
  const [value, setValue] = useState("Select option...");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [found, setFound] = useState();
  const [image, setImage] = useState();

   const { cart, totalQuantity} = useSelector(
     (state) => state.allcart
   );

  useEffect(() => {
    // check if user is logged in and store their info
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Logout kam  //
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user;
        setCurrentUser(uid.email);
        console.log("user ", currentUser);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  // sab se pahla kam ha db se data get karna user ka //
  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const pdata = await profileData();
        console.log("pdata", pdata);
        const foundItem = pdata.filter((res) => res.email === currentUser);

        setFound(foundItem);
        console.log("FOund", foundItem);
      } catch (error) {
        alert(error);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (found && found[0]) {
      setImage(found[0].imageUrl);
    } else {
      setImage(null);
    }
  }, [found]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <div className="Navbar">
      <div className="container-fluid">
        <div className="header">
          <div className="logo">
            <svg
              height="20"
              viewBox="0 0 36.289 20.768"
              alt="Logo"
              class="_10c831ef"
            >
              <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="88.9"
              height="33"
              alt="OLX Motors"
              class="_1a6eed8f"
            >
              <defs>
                <linearGradient
                  id="a"
                  x1=".5"
                  x2=".5"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stop-color="#ddd"></stop>
                  <stop offset="1" stop-color="#fff"></stop>
                </linearGradient>
              </defs>
              <path
                stroke="rgba(0,0,0,0)"
                d="M40 20.5h1v-6.2l3 6.2h.6l2.8-6.2v6.2h1v-8.3h-1L44.1 19l-3-6.8H40zm18.3-4.2A4.1 4.1 0 0 0 54 12a4.1 4.1 0 0 0-4.2 4.3 4.1 4.1 0 0 0 4.2 4.3 4.1 4.1 0 0 0 4.2-4.3zm-7.3 0a3 3 0 0 1 3-3.3 3 3 0 0 1 3.2 3.3 3 3 0 0 1-3 3.3 3 3 0 0 1-3.2-3.3zm8.2-3.3h2.3v7.5h1V13H65v-1h-5.7zm15 3.3A4.1 4.1 0 0 0 70 12a4.1 4.1 0 0 0-4.2 4.3 4.1 4.1 0 0 0 4.2 4.3 4.1 4.1 0 0 0 4.2-4.3zm-7.2 0a3 3 0 0 1 3-3.3 3 3 0 0 1 3 3.3 3 3 0 0 1-3 3.3 3 3 0 0 1-3-3.3zm13.2-1.7c0 1-.6 1.6-1.8 1.6h-1.6V13h1.6c1.2 0 1.8.6 1.8 1.6zM75.7 12v8.4h1V17H78l2 3.4h1.3l-2-3.5a2.4 2.4 0 0 0 2-2.4c0-1.4-1-2.5-3-2.5zm12.7 6c0-3-4.5-1.7-4.5-3.8 0-1 .7-1.4 1.6-1.4a1.5 1.5 0 0 1 1.6 1.2h1.2a2.5 2.5 0 0 0-2.7-2.1c-1.7 0-2.8 1-2.8 2.3 0 3 4.5 1.7 4.5 4 0 .7-.6 1.3-1.7 1.3a1.5 1.5 0 0 1-1.7-1.4h-1.2c0 1.4 1.3 2.4 3 2.4a2.5 2.5 0 0 0 2.7-2.4z"
              ></path>
              <path
                fill="url(#a)"
                d="M0 16.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z"
                opacity=".6"
              ></path>
              <path d="M24.7 13.5a1.1 1.1 0 0 0-1.4-.7l-.6.2-1-2.2-.4-.1a16 16 0 0 0-4.8-.7 12 12 0 0 0-4.3.7l-.3.1-1 2.3h-.5a1.1 1.1 0 0 0-.6 2v.2a4 4 0 0 0-.4 1.5v4a2.1 2.1 0 0 0 0 .6.7.7 0 0 0 .8.5h1.6a.7.7 0 0 0 .8-.5 2.1 2.1 0 0 0 0-.7v-.3a47.1 47.1 0 0 0 8.3 0v.3a2.1 2.1 0 0 0 0 .7.7.7 0 0 0 .8.5h1.6a.7.7 0 0 0 .7-.5 2.1 2.1 0 0 0 .1-.7v-4a3.7 3.7 0 0 0-.4-1.5V15h.3a1.1 1.1 0 0 0 .7-1.5zm-12.2-2.1a11.3 11.3 0 0 1 4-.6 15.2 15.2 0 0 1 4.6.6l.9 1.8a17.6 17.6 0 0 1-4.3.4H17a28.2 28.2 0 0 1-5.4-.3zm-.6 9.3a2.2 2.2 0 0 1 0 .4h-1.7a2.2 2.2 0 0 1 0-.4V20a1 1 0 0 0 .3 0l1.4.2v.4zm11.4 0a2.2 2.2 0 0 1 0 .4h-1.6a2.2 2.2 0 0 1 0-.4v-.4H23a1 1 0 0 0 .4-.2zm.5-6.5l-1.2.4.5 1a3 3 0 0 1 .3 1.2V18l-.1.7c0 .3-.2.7-.5.7-3 .3-4.5.5-6 .5s-3-.2-6.2-.5c-.2 0-.3-.3-.4-.6V18a17 17 0 0 1 0-1 3.2 3.2 0 0 1 .3-1.3l.5-1-1-.2a.3.3 0 0 1-.2-.4.3.3 0 0 1 .4-.3l1.1.4a23.6 23.6 0 0 0 5 .3h1.4a17.9 17.9 0 0 0 4.6-.5h.3l1-.4a.3.3 0 0 1 .4.3.3.3 0 0 1-.2.4z"></path>
              <path d="M12 16a1.2 1.2 0 1 0 1.1 1.2A1.2 1.2 0 0 0 12 16zm0 1.6a.4.4 0 1 1 .3-.4.4.4 0 0 1-.4.4zm9.6-1.6a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2zm0 1.6a.4.4 0 1 1 .5-.4.4.4 0 0 1-.5.4zm-7.8.2h6v.8h-6z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97.25"
              height="33"
              alt="OLX Property"
              class="_1a6eed8f"
            >
              <defs>
                <linearGradient
                  id="a"
                  x1=".5"
                  x2=".5"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stop-color="#ddd"></stop>
                  <stop offset="1" stop-color="#fff"></stop>
                </linearGradient>
              </defs>
              <path
                stroke="rgba(0,0,0,0)"
                d="M41.1 16.64v-3.07h1.6c1.25 0 1.78.58 1.78 1.55 0 .94-.53 1.52-1.78 1.52zm4.5-1.52c0-1.37-.93-2.45-2.9-2.45H40v8.36h1.1v-3.49h1.6c2.08 0 2.9-1.15 2.9-2.42zm5.82.01c0 .94-.54 1.6-1.77 1.6h-1.6v-3.16h1.6c1.25 0 1.77.61 1.77 1.57zm-4.47-2.46v8.36h1.1v-3.42h1.31l2 3.42h1.3l-2.1-3.5a2.36 2.36 0 0 0 2-2.4c0-1.36-.94-2.45-2.9-2.45zm15.3 4.18a4.12 4.12 0 0 0-4.2-4.28 4.13 4.13 0 0 0-4.2 4.28 4.13 4.13 0 0 0 4.2 4.27 4.12 4.12 0 0 0 4.2-4.27zm-7.3 0a3.05 3.05 0 0 1 3.1-3.33 3.05 3.05 0 0 1 3.07 3.33 3.06 3.06 0 0 1-3.08 3.32 3.06 3.06 0 0 1-3.09-3.32zm9.82-.2v-3.08h1.6c1.25 0 1.78.58 1.78 1.55 0 .94-.53 1.52-1.77 1.52zm4.5-1.53c0-1.36-.93-2.44-2.9-2.44h-2.7v8.35h1.1v-3.49h1.6c2.08 0 2.9-1.15 2.9-2.42zm5.85-2.46h-4.5v8.37h4.5v-.9h-3.4v-2.88h3.04v-.9h-3.04v-2.8h3.4zm6.14 2.48c0 .93-.54 1.6-1.78 1.6h-1.6v-3.17h1.6c1.25 0 1.78.61 1.78 1.57zm-4.48-2.47v8.36h1.1v-3.42h1.32l1.98 3.42h1.3l-2.1-3.5a2.36 2.36 0 0 0 2-2.4c0-1.36-.94-2.45-2.9-2.45zm6.78.9h2.29v7.46h1.1v-7.47h2.27v-.89h-5.66zm9.04 4.3v3.16h1.1v-3.15l2.72-5.2h-1.2l-2.07 4.23-2.07-4.24h-1.2z"
              ></path>
              <path
                fill="url(#a)"
                d="M0 16.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z"
                opacity=".57"
              ></path>
              <path d="M25.03 21.92v-9.35l-4.99-1.66v1.05l4 1.33v8.59h-5V7.85h-8.38v14.08h-.4v1h15.17v-1zm-6.98-11.68v11.68h-6.4V8.84h6.4z"></path>
              <path d="M15.17 10.3h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm2.42 1.6h1.61v.81h-1.6zm-2.42 0h1.6v.81h-1.6zm2.42 2.42h1.61v.81h-1.6zm-2.42 0h1.6v.81h-1.6zm2.42 1.62h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm2.42 2.42h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm8.87-4.04h.8v.81h-.8zm-1.62 0h.8v.81H20zm1.62 1.62h.8v.8h-.8zm-1.62 0h.8v.8H20zm1.62 2.42h.8v.8h-.8zm-1.62 0h.8v.8H20z"></path>
            </svg>
          </div>

          <div className="content" style={{ display: "flex" }}>
            <div className="search-logo">
              <svg
                height="20"
                viewBox="0 0 36.289 20.768"
                alt="Logo"
                class="b28a1eb6"
              >
                <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
              </svg>
            </div>
            <div className="searchbar">
              <SearchableDropdown
                options={animals}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val) => setValue(val)}
              />
            </div>
            <div className="hhh">
              <input
                className="ms-3"
                placeholder="Find Cars, Mobile Phones and more..."
              />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 1024 1024"
                  class="_4743d0f8"
                >
                  <path d="M448 725.33c-152.92 0-277.33-124.41-277.33-277.33S295.08 170.67 448 170.67 725.33 295.08 725.33 448 600.92 725.33 448 725.33zm436.44 98.78v.02L732.52 672.19c48.77-61.78 78.15-139.54 78.15-224.19 0-199.98-162.7-362.67-362.67-362.67S85.33 248.03 85.33 448c0 199.98 162.69 362.67 362.67 362.67 84.63 0 162.41-29.38 224.17-78.15l206.14 206.15h60.36v-60.33l-54.23-54.23z"></path>
                </svg>
              </button>
            </div>
            <div className="abc">
              {console.log(user)}
              {user ? (
                <div className="main-div">
                  <div className="main-container d-flex ">
                    <div className="profile-img">
                      <img
                        className="mt-1"
                        src={
                          image
                            ? `${image}`
                            : "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
                        }
                        // src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
                        alt="User profile"
                        aria-label="User profile picture"
                      />
                    </div>
                    <div className="dropdown position-absolute ">
                      <img
                        src="https://www.olx.com.pk/assets/iconArrowDown_noinline.ec05eae7013321c193965ef15d4e2174.svg"
                        className="mt-4 se-img"
                        alt="User profile dropdown arrow"
                      />
                      <div class="dropdown-content">
                        <a>
                          <div className="drop-content">
                            <div className="image-section d-flex">
                              <div className="image">
                                <img
                                  // className="mt-1"
                                  src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
                                  alt="User profile"
                                  aria-label="User profile picture"
                                />
                              </div>
                              <div className="image-content">
                                <h6>Hello ,</h6>
                                <h5>{user.email}</h5>
                                <a onClick={() => navigate("/postdetail")}>
                                  View and edit your profile
                                </a>
                              </div>
                            </div>
                            <hr />
                            <div className="bottom-div">
                              <div className="my-ads">
                                <img src="https://www.olx.com.pk/assets/iconMyAds_noinline.81f6b0cc8a3d16d363fb142e1489d035.svg" />
                                <span>My Ads</span>
                              </div>
                              <div className="my-favourite mt-2 ">
                                <img src="https://www.olx.com.pk/assets/iconHeart_noinline.752f43cc1a8fed78adeed73225a090db.svg" />
                                <span>Favourites & Saved searches</span>
                              </div>
                              <div className="by-bussiness mt-2 ">
                                <img src="https://www.olx.com.pk/assets/iconBusinessPackages_noinline.64a7db94ef2eb1776d43916ce82b1a40.svg" />
                                <span>Buy bussiness packages</span>
                              </div>
                              <div className="bought-package mt-2">
                                <img src="https://www.olx.com.pk/assets/iconBoughtPackages_noinline.b29b2b61c39def95f4bf58ac5b6dbb59.svg" />
                                <span>Bought Packages & Billing </span>
                              </div>
                              <div className="help mt-2">
                                <img src="https://www.olx.com.pk/assets/iconBoughtPackages_noinline.b29b2b61c39def95f4bf58ac5b6dbb59.svg" />
                                <span>Help</span>
                              </div>
                              <div className="settings mt-2">
                                <img src="https://www.olx.com.pk/assets/iconFilters_noinline.0aa1e7bd623dcbcc065196fa3ccba789.svg" />
                                <span>Settings</span>
                              </div>
                              <div
                                className="logout mt-2"
                                onClick={handleLogout}
                              >
                                <img src="https://www.olx.com.pk/assets/iconLogout_noinline.9da9ed94dfe84e900cc1ae3198b0375b.svg" />
                                <span>Logout</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              ) : (
                // <span>{user.email}</span>
                <a className="ms-2" href="#" onClick={() => navigate("/login")}>
                  Login
                </a>
              )}
              <div className="sell-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="104"
                  height="48"
                  viewBox="0 0 1603 768"
                  class="_3V9PS"
                  className="svg"
                >
                  <path
                    class="_2bClX _12yOz"
                    d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058S231.721 16.943 434.442 16.943z"
                    fill="#fff"
                  />
                  <path
                    class="_2bClX _YBz-"
                    d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-.016-.014C139.407 542.352 99.766 464.914 99.766 383.997c0-41.07 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845C18.8 280.243 6.201 331.224 6.201 383.997c0 104.027 50.962 203.61 139.799 273.175h.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783H427.237z"
                    fill="#ffce32"
                  />
                  <path
                    class="_2bClX _3uYj7"
                    d="M1318.522 38.596c-45.72-14.369-93.752-21.658-142.762-21.658H427.249c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829 44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.01-97.197-67.703-154.957-85.852z"
                    fill="#23e5db"
                  />
                  <path
                    class="_2bClX BfroU"
                    d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88a251.85 251.85 0 01-11.214 74.363c-38.348 124.311-168.398 211.129-316.262 211.129H726.949l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498a323.69 323.69 0 0014.423-95.559c0-98.044-43.805-190.216-123.317-259.551z"
                    fill="#3a77ff"
                  />
                </svg>
                <h1 className="ms-5" onClick={() => navigate("/postAd")}>
                  +Sell
                </h1>
              </div>
            </div>
            <div className="card-btn">
              <button onClick={() => navigate("/addToCart")}>
                Card <sub>({totalQuantity})</sub>
              </button>
            </div>
          </div>
        </div>
        <div className="lower-header">
          <span>All categories</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="10px"
            viewBox="0 0 1024 1024"
          >
            <path
              className="svg"
              d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"
            />
          </svg>
          <ul className="last-header">
            <li>
              <a href="">Mobile phones</a>
            </li>
            <li>
              <a href="">Cars</a>
            </li>
            <li>
              <a href="">Motorcycles</a>
            </li>
            <li>
              <a href="">Houses</a>
            </li>
            <li>
              <a href="">Video-Audios</a>
            </li>
            <li>
              <a href="">Tablets</a>
            </li>
            <li>
              <a href="">Land & Plots</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
