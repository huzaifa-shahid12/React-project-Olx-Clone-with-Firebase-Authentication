import React from "react";
import Navbar from "../../reusable/navbar/Navbar";
import Footer from "../../reusable/footer/Footer";
import "./PostDetail.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { profileData } from "../../config/Firebase";
import { signOut } from "firebase/auth";
import { auth } from "../../config/Firebase";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { ubdateData } from "../../config/Firebase";

function PostDetail() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const [found, setFound] = useState([]);
  const [img, setImg] = useState();
  const [image, setImage] = useState();

  // useEffect(() => {
  //   fetchData();
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

  // useEffect(() => {
  //   fetchData();

  //   async function fetchData() {
  //     try {
  //       const pdata = await profileData();
  //       console.log("Pdata", pdata);
  //       const foundItem = pdata.filter((res) => res.email === currentUser);

  //       // Use the setFound callback function to get the updated state value
  //       setFound((prevFound) => {
  //         console.log("foundItem", foundItem);
  //         return foundItem;
  //       });
  //     } catch (e) {
  //       alert(e.message);
  //     }
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   console.log("Updated found:", found);
  // }, [found]);

  const handleDeleteAccount = async () => {
    try {
      // Show SweetAlert confirmation
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If the user clicks "Yes"
      if (result.isConfirmed) {
        // Add any additional logic for deleting the account if needed

        // Sign out the user
        await signOut(getAuth());

        // Notify the user that the account has been deleted
        await Swal.fire(
          "Deleted!",
          "Your account has been deleted.",
          "success"
        );

        // Optionally redirect the user to a different page
        // Example: window.location.href = "/login";
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  async function go() {
    await ubdateData(found, img);
    alert("post add ");
    //  navigate('/')
  }

  // const go = async () => {
  //   if (img) {
  //     //  setImg(URL.createObjectURL(img));
  //     await ubdateData(found, img);
  //    alert("Profile photo updated successfully!");
  //   } else {
  //     alert("Please select an image before saving changes.");
  //   }
  // };

  useEffect(() => {
    if (found && found[0]) {
      setImage(found[0].imageUrl);
    } else {
      setImage(null);
    }
  }, [found]);

  return (
    <div className="Post">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="post-div">
              <div className="edit-profile">
                <h1>Edit profile</h1>
              </div>

              {/* profile Section start */}
              <div className="profile">
                <h5>Profile Photo</h5>
                <div className="profile-div d-flex ">
                  <div className="profile-image">
                    <img
                        src={
                          image
                            ? `${image}`
                            : "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
                        }
                    />
                  </div>
                  <div className="upload">
                    <label class="f8e3a194">
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        hidden=""
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                      Upload Photo
                    </label>
                    <div className="image">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 .33A6.67 6.67 0 0 1 13.67 7 6.67 6.67 0 0 1 7 13.67 6.67 6.67 0 0 1 .33 7 6.67 6.67 0 0 1 7 .33zm0 1.34A5.34 5.34 0 0 0 1.67 7 5.34 5.34 0 0 0 7 12.33 5.34 5.34 0 0 0 12.33 7 5.34 5.34 0 0 0 7 1.67zm0 4l.67.66v3.34l-.67.66-.67-.66V6.33L7 5.67zm0-2A.67.67 0 1 1 7 5a.67.67 0 0 1 0-1.33z"
                          fill="#002F34"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                      <span>JPG, JPEG, PNG Min: 400px, Max: 1024px</span>
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              {/* Profile section End  */}

              {/* Detail Section Start  */}
              <div className="post-main">
                <div className="post-detail">
                  <div className="name">
                    <span>Name</span>
                  </div>
                  <div className="name-input">
                    <input
                      type="text"
                      // value={userData ? userData.fullname || "" : ""}
                      value={found && found[0] ? `${found[0].fullname} ` : ""}
                    />
                  </div>
                  <div className="age mt-2">
                    <span>Age</span>
                  </div>
                  <div className="age-input">
                    <input
                      value={found && found[0] ? `${found[0].age} ` : ""}
                    />
                  </div>
                  <div className="email mt-3">
                    <span>Email</span>
                  </div>
                  <div className="email-input">
                    <input
                      type="text"
                      value={found && found[0] ? `${found[0].email}` : ""}
                    />
                  </div>
                  <div className="about-input mt-5">
                    <textarea
                      id="description"
                      name="description"
                      spellcheck="false"
                      class="_162767a9"
                      maxlength="200"
                      autocomplete="nope"
                      type="text"
                      placeholder="About me (optional)"
                    ></textarea>
                  </div>
                </div>
              </div>
              {/* detail section End */}
              {/* save changes start*/}
              <div className="save-btn">
                <div className="discard mt-2 ">
                  <a>Discard</a>
                </div>
                <div className="save">
                  <button onClick={go}>Save Changes</button>
                </div>
              </div>
              {/* save changes end */}
            </div>
            <div className="Delete-section">
              <div className="Delete">
                <div className="delete-account">
                  <h5>Delete this account</h5>
                </div>
                <div className="warning">
                  <p>Are you sure you want to delete your account?</p>

                  <button onClick={handleDeleteAccount}>
                    Yes, delete my account
                  </button>

                  <h6>See more info</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostDetail;
