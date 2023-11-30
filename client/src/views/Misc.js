import "./Misc.css";
import { React, useState, useEffect } from "react";

function Misc() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3030/getMisc")
      .then((response) => response.json())
      .then((item) => setItem(item))
      .finally(() => setLoading(false));
  }, []);

  // Need to implement filters still

  return (
    <div className="Misc">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            {item.map((dataObj, index) => {
              return (
                <div className="flex card w-96 bg-base-100 shadow-xl m-6">
                  <figure>
                    <img
                      src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{dataObj.mi_item_name}</h2>
                    <p>${dataObj.mi_item_price}</p>
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

export default Misc;
