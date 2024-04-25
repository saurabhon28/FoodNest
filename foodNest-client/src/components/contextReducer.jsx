import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          image: action.image,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
      let arr = [...state];
      arr.forEach((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
      });
      return arr;
    case "DROP":
      let emptyArr = [];
      return emptyArr;
    default:
      console.log("error in reducer");
      return state; // Return current state in default case
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
