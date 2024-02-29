import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const itemToAdd = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === itemToAdd.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, create a new cart array
        // with the quantity of the existing item updated
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If the item does not exist in the cart, add it to the cart array
        return {
          ...state,
          cart: [...state.cart, { ...itemToAdd, quantity: 1 }],
        };
      }
    },

    getCartTotal: (state) => {
      const { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;

          // Convert price and quantity to numbers
          const itemPrice = parseFloat(price);
          const itemQuantity = parseInt(quantity);

          // Check if price or quantity is NaN
          if (isNaN(itemPrice) || isNaN(itemQuantity)) {
            console.error("Invalid price or quantity:", price, quantity);
            return cartTotal; // Skip this cartItem
          }

          const itemTotal = itemPrice * itemQuantity;

          // Check if itemTotal is NaN
          if (isNaN(itemTotal)) {
            console.error("Invalid itemTotal calculation for:", cartItem);
            return cartTotal; // Skip this cartItem
          }

          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += itemQuantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );

      state.totalPrice = parseFloat(totalPrice.toFixed(2)); // Use parseFloat to parse floating point numbers
      state.totalQuantity = totalQuantity;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    // ya kam ham card ki total ka liyee kiya tha yaha se shoro ha //

    // getCartTotal: (state) => {
    //   const { totalQuantity, totalPrice } = state.cart.reduce(
    //     (cartTotal, cartItem) => {
    //       console.log("carttotal", cartTotal);
    //       console.log("cartitem", cartItem);
    //       const { price, quantity } = cartItem;
    //       console.log("PRICE", price, quantity);
    //       const itemTotal = price * quantity;
    //       console.log("itemTotal", itemTotal);
    //       console.log("items", price * quantity);
    //       cartTotal.totalPrice += itemTotal;
    //       cartTotal.totalQuantity += quantity;
    //       return cartTotal;
    //     },
    //     {
    //       totalPrice: 0,
    //       totalQuantity: 0,
    //     }
    //   );
    //   state.totalPrice = parseInt(totalPrice.toFixed(2));
    //   state.totalQuantity = totalQuantity;
    // },

    // yaha khatam // 


    // item add karna se pahla ka ya code tha //

    // addToCart(state, data) {
    // let find = state.cart.findIndex((item) => item.id === data.payload.id);
    // if (find >= 0) {
    //   state.cart[find].quantity += 1;
    // } else {
    // const cartItem = data.payload;
    // state.cart.push(cartItem);
    // }
    // },

    // yahaa tak //
  },
});

export const { addToCart, getCartTotal, removeItem } = cartSlice.actions;
export default cartSlice;
