import "./Bikes.css";
import { React, useState, useEffect, useContext } from "react";
import { basket } from "../components/itemMaps";

function Bike() {
  const [item, setItem] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleBuyNow = (dataObj) => {
    basket.addToBikeMap(dataObj);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const [loading, setLoading] = useState(false);

  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);

  const [bikeBrands, setBikeBrands] = useState([]);

  const getBikes = async () => {};

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3030/getBikeBrands")
      .then((response) => response.json())
      .then((item) => {
        console.log(item);
        setBikeBrands(item);
      });
    fetch("http://localhost:3030/getBikes")
      .then((response) => response.json())
      .then((item) => setItem(item));
    setLoading(false);
  }, []);

  const applyFilters = async () => {
    const brand =
      document.getElementById("brand-filter").value === "Brand"
        ? ""
        : document.getElementById("brand-filter").value;
    const minPrice = document.getElementById("min-price-filter").value;
    const maxPrice = document.getElementById("max-price-filter").value;

    setLoading(true);
    fetch(
      `http://localhost:3030/getBikes?filter=true&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
      .then((response) => response.json())
      .then((item) => setItem(item))
      .finally(() => setLoading(false));
    console.log("filters applied!");
  };

  const removeFilters = async () => {
    document.getElementById("brand-filter").value = "Brand";
    document.getElementById("min-price-filter").value = "";
    document.getElementById("max-price-filter").value = "";

    setLoading(true);
    fetch(`http://localhost:3030/getBikes?filter=false`)
      .then((response) => response.json())
      .then((item) => setItem(item))
      .finally(() => setLoading(false));

    console.log("filters removed!");
  };

  return (
    <div className="Bike">
      {addedToCart && (
        <div
          role="alert"
          class="alert alert-success"
          style={{
            position: "fixed",
            bottom: 0,
            left: 50,
            zIndex: 999,
            maxWidth: "95%",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      )}
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button"
                >
                  Filters
                </label>
              </div>
              <div className="drawer-side z-20">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-6 w-80 min-h-full bg-base-200 text-base-content z-10">
                  {/* Sidebar content here */}
                  <li>
                    <select
                      className="select select-bordered max-w-xs m-2"
                      id="brand-filter"
                    >
                      <option disabled selected>
                        Brand
                      </option>
                      {/* Needs a query for getting the brands. */}
                      {bikeBrands.map((brand) => {
                        return <option>{brand}</option>;
                      })}
                    </select>
                  </li>
                  <li>
                    <input
                      type="number"
                      placeholder="Minimum Price"
                      className="input input-bordered max-w-xs m-2"
                      id="min-price-filter"
                    />
                  </li>
                  <li>
                    <input
                      type="number"
                      placeholder="Maximum Price"
                      className="input input-bordered max-w-xs m-2"
                      id="max-price-filter"
                    />
                  </li>
                  <li>
                    <button
                      className="btn btn-primary m-2 p-3.5"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-primary m-2 p-3.5"
                      onClick={removeFilters}
                    >
                      Remove Filters
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {item.map((dataObj, index) => {
              // flex w-1/[Number of images per row]
              return (
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-screen p-1 md:p-2">
                    <div className="flex card h-full w-90 bg-base-100 shadow-xl m-2">
                      <figure>
                        <img
                          src={require("../img/bikes/" +
                            dataObj.b_bike_serial_num +
                            ".png")}
                          alt="BikeIMG"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{dataObj.b_model}</h2>
                        <h3>${dataObj.b_price}</h3>
                        <p className="text-sm">{dataObj.b_brand_name}</p>
                        <div className="card-actions justify-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleBuyNow(dataObj)}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Bike;
