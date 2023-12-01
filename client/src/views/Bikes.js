import "./Bikes.css";
import { React, useState, useEffect } from "react";

function Bike() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/getBikes")
      .then((response) => response.json())
      .then((item) => setItem(item));
  }, []);

  // Need to implement filters still

  return (
    <div className="Bike">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            {item.map((dataObj, index) => {
              return (
                <div className="flex card w-96 bg-base-100 shadow-xl m-6">
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
                    <p>${dataObj.b_price}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
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
