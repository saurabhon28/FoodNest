import React from "react";
import { useCart, useDispatchCart } from "../components/contextReducer";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  console.log(data);
  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center text-success fs-3">
        This cart is Empty!
      </div>
    );
  }

  //checkout
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

    // Check if userEmail exists and is valid
    if (!userEmail) {
      console.error("No user email found.");
      return;
    }

    const orders = {
      order_data: data, // Ensure 'data' is defined and is an array
      email: userEmail,
      order_date: new Date().toDateString(), // Double-check this format is expected
    };

    console.log(orders);
    try {
      let response = await axios.post(
        "https://foodnest-at1q.onrender.com/api/food/orders",
        orders,
        {
          headers: { "Content-Type": "application/json" }, // Ensure correct content type
        }
      );

      console.log("Order response:", response);

      // Check response status from the HTTP response
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "DROP" }); // Ensure 'dispatch' is defined and behaves as expected
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error(
        "Axios request failed:",
        error.response?.data || error.message
      );
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div className="mt-5">
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <RiDeleteBin6Line
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-success">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
