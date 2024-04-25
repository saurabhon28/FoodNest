import axios from "axios";
import { useEffect, useState } from "react";

export default function MyOrder() {
  const [orderData, setOrderData] = useState("");

  const fetchOrderData = async () => {
    const email = localStorage.getItem("userEmail");

    const response = await axios.post(
      "http://localhost:5000/api/food/myOrders",
      { email: email },
      {
        headers: { "Content-Type": "application/json" }, // Ensure correct content type
      }
    );

    setOrderData(response.data);
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {orderData ? (
          Array(orderData).map((data) => {
            return data.orderData.order_data
              .slice(0)
              .reverse()
              .map((item) => {
                return item.map((arrayData) => {
                  return (
                    <div key={arrayData._id}>
                      {arrayData.order_date ? (
                        <div className="m-auto mt-5">
                          {arrayData.order_date} <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{
                              width: "16rem",
                              maxHeight: "360px",
                            }}>
                            <img
                              src={arrayData.image}
                              className="card-img-top"
                              alt="..."
                              style={{
                                height: "120px",
                                objectFit: "fill",
                              }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}>
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                              </div>
                              <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              });
          })
        ) : (
          <h1 className="mt-5">No orders found</h1>
        )}
      </div>
    </div>
  );
}
