import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Cart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCartTotal, removeItem } from "../../store/cartSlice";

function Cart() {
  // yaha se ham data laa raha ha redux Reducer se //
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allcart
  );

  console.log(cart, "çart");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <div>
      <section className="h-100 gradient-custom">
        <MDBContainer className="py-5 h-100 ">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {cart.length} items
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBRow>
                    {cart?.map((item, index) => (
                      <React.Fragment key={index}>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleTag="div"
                            rippleColor="light"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <img
                              src={item.imageUrl[0]}
                              alt=""
                              className="w-100"
                            />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </MDBRipple>
                        </MDBCol>
                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                          <p>
                            <strong>Brand: {item.brand}</strong>
                          </p>
                          <p>{item.title}</p>

                          <MDBTooltip
                            wrapperProps={{ size: "sm" }}
                            wrapperClass="me-1 mb-2"
                            title="Remove item"
                          >
                            <MDBIcon
                              onClick={() => dispatch(removeItem(item.id))}
                              fas
                              icon="trash"
                            />
                          </MDBTooltip>

                          <MDBTooltip
                            wrapperProps={{ size: "sm", color: "danger" }}
                            wrapperClass="me-1 mb-2"
                            title="Move to the wish list"
                          >
                            <MDBIcon fas icon="heart" />
                          </MDBTooltip>
                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <MDBBtn className="px-3 me-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput
                              defaultValue={item.quantity}
                              // min={0}
                              type="number"
                              label="Quantity"
                            />

                            <MDBBtn className="px-3 ms-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </div>

                          <p className="text-start text-md-center">
                            <strong>{item.price}</strong>
                          </p>
                        </MDBCol>
                      </React.Fragment>
                    ))}
                  </MDBRow>

                  <hr className="my-4" />
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4">
                <MDBCardBody>
                  <p>
                    <strong>Expected shipping delivery</strong>
                  </p>
                  <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody>
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="mb-4">
                <MDBCardHeader>
                  <MDBTypography tag="h5" className="mb-0">
                    Summary
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      <strong> Total Quantity </strong>
                      <span>{totalQuantity}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                      <strong> Total amount </strong>
                      <span>{totalPrice}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      {/* <div>
                        <strong>Total amount</strong>
                      </div> */}
                      {/* <span>
                        <strong></strong>
                      </span> */}
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <MDBBtn block size="lg">
                    Go to checkout
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default Cart;

// import React from "react";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCardImage,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRipple,
//   MDBRow,
//   MDBTooltip,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./Cart.css";
// import Navbar from "../../reusable/navbar/Navbar";
// import { useSelector } from "react-redux";

// function Cart() {

//   // yaha se ham data laa raha ha redux Reducer se //
//   const cart = useSelector((state) => state.cart);

//   console.log(cart, "çart");
//   return (
//     <div>
//       {/* {cart.map((cart) => {
//         return ( */}
//           <section className="h-100 gradient-custom">
//             {/* <Navbar /> */}
//             <MDBContainer className="py-5 h-100 ">
//               <MDBRow className="justify-content-center my-4">
//                 <MDBCol md="8">
//                   <MDBCard className="mb-4">
//                     <MDBCardHeader className="py-3">
//                       <MDBTypography tag="h5" className="mb-0">
//                         Cart - 2 items
//                       </MDBTypography>
//                     </MDBCardHeader>
//                     <MDBCardBody>
//                       <MDBRow>
//                            {cart.map((cart) => {
//         return (
//                         <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
//                           <MDBRipple
//                             rippleTag="div"
//                             rippleColor="light"
//                             className="bg-image rounded hover-zoom hover-overlay"
//                           >
//                             <img
//                               // src={imageUrl}
//                               src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
//                               alt=""
//                               className="w-100"
//                             />
//                             <a href="#!">
//                               <div
//                                 className="mask"
//                                 style={{
//                                   backgroundColor: "rgba(251, 251, 251, 0.2)",
//                                 }}
//                               ></div>
//                             </a>
//                           </MDBRipple>
//                         </MDBCol>

//                         <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
//                           <p>
//                             <strong>{cart.title}</strong>
//                           </p>
//                           <p>Color: blue</p>
//                           <p>Size: M</p>

//                           <MDBTooltip
//                             wrapperProps={{ size: "sm" }}
//                             wrapperClass="me-1 mb-2"
//                             title="Remove item"
//                           >
//                             <MDBIcon fas icon="trash" />
//                           </MDBTooltip>

//                           <MDBTooltip
//                             wrapperProps={{ size: "sm", color: "danger" }}
//                             wrapperClass="me-1 mb-2"
//                             title="Move to the wish list"
//                           >
//                             <MDBIcon fas icon="heart" />
//                           </MDBTooltip>
//                         </MDBCol>
//                         <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
//                           <div
//                             className="d-flex mb-4"
//                             style={{ maxWidth: "300px" }}
//                           >
//                             <MDBBtn className="px-3 me-2">
//                               <MDBIcon fas icon="minus" />
//                             </MDBBtn>

//                             <MDBInput
//                               defaultValue={1}
//                               min={0}
//                               type="number"
//                               label="Quantity"
//                             />

//                             <MDBBtn className="px-3 ms-2">
//                               <MDBIcon fas icon="plus" />
//                             </MDBBtn>
//                           </div>

//                           <p className="text-start text-md-center">
//                             {/* <p>{price}</p> */}
//                             <strong>$17.99</strong>
//                           </p>
//                         </MDBCol>
//                           );
//                         })}
//                       </MDBRow>

//                       <hr className="my-4" />
//                     </MDBCardBody>
//                   </MDBCard>

//                   <MDBCard className="mb-4">
//                     <MDBCardBody>
//                       <p>
//                         <strong>Expected shipping delivery</strong>
//                       </p>
//                       <p className="mb-0">12.10.2020 - 14.10.2020</p>
//                     </MDBCardBody>
//                   </MDBCard>

//                   <MDBCard className="mb-4 mb-lg-0">
//                     <MDBCardBody>
//                       <p>
//                         <strong>We accept</strong>
//                       </p>
//                       <MDBCardImage
//                         className="me-2"
//                         width="45px"
//                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
//                         alt="Visa"
//                       />
//                       <MDBCardImage
//                         className="me-2"
//                         width="45px"
//                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
//                         alt="American Express"
//                       />
//                       <MDBCardImage
//                         className="me-2"
//                         width="45px"
//                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
//                         alt="Mastercard"
//                       />
//                       <MDBCardImage
//                         className="me-2"
//                         width="45px"
//                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
//                         alt="PayPal acceptance mark"
//                       />
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>
//                 <MDBCol md="4">
//                   <MDBCard className="mb-4">
//                     <MDBCardHeader>
//                       <MDBTypography tag="h5" className="mb-0">
//                         Summary
//                       </MDBTypography>
//                     </MDBCardHeader>
//                     <MDBCardBody>
//                       <MDBListGroup flush>
//                         <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                           Products
//                           <span>$53.98</span>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
//                           Shipping
//                           <span>Gratis</span>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                           <div>
//                             <strong>Total amount</strong>
//                             <strong>
//                               <p className="mb-0">(including VAT)</p>
//                             </strong>
//                           </div>
//                           <span>
//                             <strong>$53.98</strong>
//                           </span>
//                         </MDBListGroupItem>
//                       </MDBListGroup>

//                       <MDBBtn block size="lg">
//                         Go to checkout
//                       </MDBBtn>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>
//               </MDBRow>
//             </MDBContainer>
//           </section>

//     </div>
//   );
// }

// export default Cart;

// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBCardImage,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBRipple,
//   MDBRow,
//   MDBTooltip,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import React from "react";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./Cart.css";
// import Navbar from "../../reusable/navbar/Navbar";
// import { useSelector } from "react-redux";

// function cart() {
//   const cart = useSelector((state) => state.cart);

//   return (
//     <section className="h-100 gradient-custom">
//       {/* <Navbar /> */}
//       <MDBContainer className="py-5 h-100 ">
//         <MDBRow className="justify-content-center my-4">
//           <MDBCol md="8">
//             <MDBCard className="mb-4">
//               <MDBCardHeader className="py-3">
//                 <MDBTypography tag="h5" className="mb-0">
//                   Cart - 2 items
//                 </MDBTypography>
//               </MDBCardHeader>
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
//                     <MDBRipple
//                       rippleTag="div"
//                       rippleColor="light"
//                       className="bg-image rounded hover-zoom hover-overlay"
//                     >
//                       <img
//                         // src={imageUrl}
//                         src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
//                         alt=""
//                         className="w-100"
//                       />
//                       <a href="#!">
//                         <div
//                           className="mask"
//                           style={{
//                             backgroundColor: "rgba(251, 251, 251, 0.2)",
//                           }}
//                         ></div>
//                       </a>
//                     </MDBRipple>
//                   </MDBCol>

//                   <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
//                     <p>
//                       <strong>Blue denim shirt</strong>
//                     </p>
//                     <p>Color: blue</p>
//                     <p>Size: M</p>

//                     <MDBTooltip
//                       wrapperProps={{ size: "sm" }}
//                       wrapperClass="me-1 mb-2"
//                       title="Remove item"
//                     >
//                       <MDBIcon fas icon="trash" />
//                     </MDBTooltip>

//                     <MDBTooltip
//                       wrapperProps={{ size: "sm", color: "danger" }}
//                       wrapperClass="me-1 mb-2"
//                       title="Move to the wish list"
//                     >
//                       <MDBIcon fas icon="heart" />
//                     </MDBTooltip>
//                   </MDBCol>
//                   <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
//                     <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
//                       <MDBBtn className="px-3 me-2">
//                         <MDBIcon fas icon="minus" />
//                       </MDBBtn>

//                       <MDBInput
//                         defaultValue={1}
//                         min={0}
//                         type="number"
//                         label="Quantity"
//                       />

//                       <MDBBtn className="px-3 ms-2">
//                         <MDBIcon fas icon="plus" />
//                       </MDBBtn>
//                     </div>

//                     <p className="text-start text-md-center">
//                       {/* <p>{price}</p> */}
//                       <strong>$17.99</strong>
//                     </p>
//                   </MDBCol>
//                 </MDBRow>

//                 <hr className="my-4" />
//               </MDBCardBody>
//             </MDBCard>

//             <MDBCard className="mb-4">
//               <MDBCardBody>
//                 <p>
//                   <strong>Expected shipping delivery</strong>
//                 </p>
//                 <p className="mb-0">12.10.2020 - 14.10.2020</p>
//               </MDBCardBody>
//             </MDBCard>

//             <MDBCard className="mb-4 mb-lg-0">
//               <MDBCardBody>
//                 <p>
//                   <strong>We accept</strong>
//                 </p>
//                 <MDBCardImage
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
//                   alt="Visa"
//                 />
//                 <MDBCardImage
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
//                   alt="American Express"
//                 />
//                 <MDBCardImage
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
//                   alt="Mastercard"
//                 />
//                 <MDBCardImage
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
//                   alt="PayPal acceptance mark"
//                 />
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//           <MDBCol md="4">
//             <MDBCard className="mb-4">
//               <MDBCardHeader>
//                 <MDBTypography tag="h5" className="mb-0">
//                   Summary
//                 </MDBTypography>
//               </MDBCardHeader>
//               <MDBCardBody>
//                 <MDBListGroup flush>
//                   <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                     Products
//                     <span>$53.98</span>
//                   </MDBListGroupItem>
//                   <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
//                     Shipping
//                     <span>Gratis</span>
//                   </MDBListGroupItem>
//                   <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                     <div>
//                       <strong>Total amount</strong>
//                       <strong>
//                         <p className="mb-0">(including VAT)</p>
//                       </strong>
//                     </div>
//                     <span>
//                       <strong>$53.98</strong>
//                     </span>
//                   </MDBListGroupItem>
//                 </MDBListGroup>

//                 <MDBBtn block size="lg">
//                   Go to checkout
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// }

// export default cart;
