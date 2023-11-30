import "./Bikes.css";
import { React, useState, useEffect } from "react";
import img from "../img/1.png";

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

  // Call the getImg function
  function getImg(dataObj) {
    return "../img/" + dataObj.b_bike_serial_num + ".png";
  }

  // Need to implement filters still

  return (
    <div className="Bike">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            {item.map((dataObj, index) => {
              let imgPath = getImg(dataObj);
              return (
                <div className="flex card w-96 bg-base-100 shadow-xl m-6">
                  <figure>
                    <img
                      src={require("../img/" +
                        dataObj.b_bike_serial_num +
                        ".png")}
                      alt={imgPath}
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
