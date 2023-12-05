import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import homeImg1 from "../img/HomeImage1.jpg";
import homeImg2 from "../img/HomeImage2.jpg";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <div class="container mx-auto px-3 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div class="flex w-1/2 flex-wrap">
              <div class="w-screen p-1 md:p-2">
                <div className="flex card h-full w-90 bg-base-100 shadow-xl m-2">
                  <figure>
                    <img src={homeImg1} className="homeImg" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Bicycles</h2>
                    <p className="text-xl">
                      Premium Brand Bikes For Maximum Comfort
                    </p>
                    <div className="card-actions justify-end">
                      <Link className="btn btn-primary" to="/Bikes">
                        Shop Bikes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-1/2 flex-wrap">
              <div class="w-screen p-1 md:p-2">
                <div className="flex card h-full w-90 bg-base-100 shadow-xl m-2">
                  <figure>
                    <img src={homeImg2} className="homeImg" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Miscellaneous Items</h2>
                    <p className="text-xl">
                      Awesome Gears to Enhance Your Riding Experience
                    </p>
                    <div className="card-actions justify-end">
                      <Link className="btn btn-primary" to="/Misc">
                        Shop Accessories
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
