import "./Misc.css";
import { React, useState, useEffect } from "react";

function Misc() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/getMisc")
      .then((response) => response.json())
      .then((item) => setItem(item));
    }, []);

  // Need to implement filters still

  return (
    <div className="Misc">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            {item.map((dataObj, index) => {
              return (
                <div class="flex w-1/2 flex-wrap">
                  <div class="w-screen p-1 md:p-2">
                    <div className="flex card h-screen h-5/6 w-90 bg-base-100 shadow-xl m-6">
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

export default Misc;
