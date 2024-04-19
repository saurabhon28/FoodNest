import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function HomePage() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/food/getFood");

    setFoodItem(response.data[0]);
    setFoodCategory(response.data[1]);

    console.log(response.data[0], response.data[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "5" }}>
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success text-white"
                type="submit">
                Search
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98="
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg"
              className="d-block w-100"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
              className="d-block w-100"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev">
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next">
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCategory.length !== 0 ? (
          foodCategory.map((data) => {
            return (
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3" key={data._id}>
                  {data.categoryName}
                </div>
                <hr />
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.categoryName == data.categoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-10 md-6 col-lg-3 m-5">
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
