import { createContext, useContext, useReducer } from "react";
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}
const initialState = {
  products: [],

  productsCost: 0,
  shippingCost: 0,
  totalCost: 0,
  productsTotal: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const newProduct = action.product;
      const existingCartItem = state.products.find(
        (cartItem) => cartItem.product.id === newProduct.id
      );

      if (existingCartItem) {
        const updatedCart = state.products.map((cartItem) =>
          cartItem.product.id === newProduct.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        return {
          ...state,
          products: updatedCart,
          productsTotal: state.productsTotal + 1,
          productsCost: state.productsCost + newProduct.price,
          totalCost: state.productsCost + newProduct.price + state.shippingCost,
        };
      } else {
        const newCartItem = { product: newProduct, quantity: 1 };
        return {
          ...state,
          products: [...state.products, newCartItem],
          productsTotal: state.productsTotal + 1,
          productsCost: state.productsCost + newProduct.price,
          totalCost: state.productsCost + newProduct.price + state.shippingCost,
        };
      }

    case "DELETE":
      const deletedProductIndex = state.products.findIndex(
        (el) => el.product.id === action.productId
      );

      if (deletedProductIndex !== -1) {
        const deletedProduct = state.products[deletedProductIndex];

        let updatedProducts;

        if (deletedProduct.quantity > 1) {
          updatedProducts = state.products.map((product) =>
            product.product.id === action.productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          );
        } else {
          updatedProducts = state.products.filter(
            (product) => product.product.id !== action.productId
          );
        }

        return {
          ...state,
          products: updatedProducts,
          productsTotal: state.productsTotal - 1,
          productsCost: state.productsCost - deletedProduct.product.price,
          totalCost:
            state.productsCost -
            deletedProduct.product.price +
            state.shippingCost,
        };
      }
      return state; // No changes if product not found

    default:
      return state;
  }
}
export default function Cart({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
