import { React, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";
import "./cookie"

function Navbar() {
  const [isLoggedIn, setLoginState] = useState(false);
  
  const handleLogin = async () => {
    const username = document.getElementById("username_input").value;
    const password = document.getElementById("password_input").value;
    let curr_userID = 0;

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'username': username,
        'password': password
      })
    }

    document.getElementById("my_modal_3").close();

    const response = await fetch(`http://localhost:3030/login`, requestOptions);
    curr_userID = await response.json();
    
    // ID == 0 : Account doesn't exist
    // ID == -1 : Incomplete Login
    if(curr_userID===0 || curr_userID===-1){
      setLoginState(false)
      console.log('login failed')
    }
    else{
      global.cookie.userID = curr_userID
      console.log(global.cookie.userID)
      setLoginState(true)
      console.log('login success')
    }

  };

  const handleLogout = () => {
    setLoginState(false);
  };

  return (
    <nav class="text-black">
      <div class="navbar bg-primary">
        <div class="navbar-start space-x-5 text-primary-content">
          <Link to="/">Home</Link>
          <Link to="/Bikes">Bikes</Link>
          <Link to="/Misc">Misc</Link>
        </div>

        <div class="navbar-end">
          <div class="flex justify-end flex-1 px-2">
            <div class="flex items-stretch">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    class="btn btn-ghost rounded-btn"
                  >
                    Logout
                  </button>
                  <Link to="/Account" class="btn btn-ghost rounded-btn">My Orders</Link>
                </>
              ) : (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  class="btn btn-ghost rounded-btn"
                >
                  Login
                </button>
              )}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box text-white">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Login</h3>
                  <div class="form-control w-full max-w-xs">
                    <label class="label">
                      <span id="username" class="label-text">Username</span>
                    </label>
                    <input
                      id="username_input"
                      type="text"
                      placeholder="Enter your username"
                      class="input input-bordered w-full max-w-xs"
                    />
                    <label class="label"></label>
                    <label class="label">
                      <span id="password" class="label-text">Password</span>
                    </label>
                    <input
                      id="password_input"
                      type="password"
                      placeholder="Enter your password"
                      class="input input-bordered w-full max-w-xs"
                    />
                    <label class="label"></label>
                  </div>
                  <button
                    onClick={handleLogin}
                    class="btn btn-ghost rounded-btn"
                  >
                    Login
                  </button>
                  <button class="btn btn-ghost rounded-btn">Sign up</button>
                </div>
              </dialog>
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