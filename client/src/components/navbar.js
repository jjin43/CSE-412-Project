import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Navbar() {
  const [isLoggedIn, setLoginState] = useState(false);

  const handleLogin = () => {
    let username, password

    fetch(`http://localhost:3030/login`, {
      method: 'GET',
      headers: {
        'username': username,
        'password': password
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
    
    document.getElementById("my_modal_3").close();
    setLoginState(true);
  };

  const handleLogout = () => {
    setLoginState(false);
  };

  return (
    <nav class="text-black">
      <div class="navbar bg-primary">
        <div class="navbar-start space-x-2 pl-12 text-primary-content">
          <Link to="/" class="btn btn-ghost rounded-btn">Home</Link>
          <Link to="/Bikes" class="btn btn-ghost rounded-btn">Bikes</Link>
          <Link to="/Misc" class="btn btn-ghost rounded-btn">Misc</Link>
        </div>

        <div class="navbar-end pr-12">
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
                  <button class="btn btn-ghost rounded-btn">My Orders</button>
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