import "./Bikes.css";
import { React, useState, useEffect } from "react";

function Bike() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3030/getBikes")
      .then((response) => response.json())
      .then((item) => setItem(item))
      .finally(() => setLoading(false));
  }, []);

  // Need to implement filters still

  return (
    <div className="Bike">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            {item.map((dataObj, index) => {
              // flex w-1/[Number of images per row]
              return (
                <div class="flex w-1/2 flex-wrap">
                  <div class="w-screen p-1 md:p-2">
                    <div className="flex card h-screen h-5/6 w-90 bg-base-100 shadow-xl m-6">
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
                        <div className="card-actions justify-end">
                          <button className="btn btn-primary">Buy Now</button>
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
