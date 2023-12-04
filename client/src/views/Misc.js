import "./Misc.css";
import { React, useState, useEffect } from "react";
import { basket } from "../components/itemMaps";

function Misc() {
  const [item, setItem] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleBuyNow = (dataObj) => {
    basket.addToMiscMap(dataObj);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  useEffect(() => {
    fetch("http://localhost:3030/getMisc")
      .then((response) => response.json())
      .then((item) => setItem(item));
  }, []);

  // Need to implement filters still

  return (
    <div className="Misc">
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
            {item.map((dataObj, index) => {
              return (
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-screen p-1 md:p-2">
                    <div className="flex card h-full w-90 bg-base-100 shadow-xl m-2">
                      <figure>
                        <img
                          src={require("../img/misc/" +
                            dataObj.mi_item_id +
                            ".png")}
                          alt="MiscIMG"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{dataObj.mi_item_name}</h2>
                        <h3>${dataObj.mi_item_price}</h3>
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

export default Misc;
