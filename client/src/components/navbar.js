import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Navbar() {
  return (
    <nav class="text-black">
      <div class="navbar bg-primary">
        <div class="navbar-start space-x-5 text-primary-content">
          <Link to="/">Home</Link>
          <Link to="/">Bikes</Link>
          <Link to="/">Misc</Link>
        </div>

        <div class="navbar-end">
          <div class="flex justify-end flex-1 px-2">
            <div class="flex items-stretch">
              <a class="btn btn-ghost rounded-btn">Account</a>
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost rounded-btn">
                  Basket
                </label>
                <ul
                  tabindex="0"
                  class="menu dropdown-content z-[1] p-2 shadow bg-primary rounded-box w-52 mt-4"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
