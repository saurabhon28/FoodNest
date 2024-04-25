import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

function Card({ options, foodItem }) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let option = options;
  let foodItems = foodItem;
  let priceOptions = Object.keys(option);

  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItems._id,
          name: foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
          image: foodItems.image,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItems._id,
      name: foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
      image: foodItems.image,
    });
    console.log(data);
  };

  let finalPrice = qty * parseInt(option[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div
        className="card mt-5 ml-5"
        style={{ width: "18rem", height: "25rem" }}>
        <img
          className="card-img-top"
          style={{ objectFit: "cover", height: "60%" }}
          src={foodItem.image}
          alt="Card image cap"
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 w-10 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">Rs.{finalPrice}/-</div>
          </div>
          <button
            className="btn btn-success justify-center m-3"
            onClick={handleAddCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
