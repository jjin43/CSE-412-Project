import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "./getCookie";
import { setCookie, getCookie } from "./getCookie";
import { basket } from "./itemMaps";

function Navbar() {
  const [isLoggedIn, setLoginState] = useState(false);
  const [signup_error, setSignupError] = useState("");
  const [signup_state, setSignupState] = useState("");
  const [signup_msg, setSignupMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie() != null) {
      setLoginState(true);
    }
  });

  const confirmPW = async () => {
    const signup_password = document.getElementById(
      "signup_password_input"
    ).value;
    const confirm_password = document.getElementById("confirm_pw_input").value;
    if (signup_password !== confirm_password) {
      setSignupError("Password Does Not Match");
      return false;
    } else {
      setSignupError("");
      return true;
    }
  };

  const handleSignup = async () => {
    const username = document.getElementById("signup_username_input").value;
    const password = document.getElementById("signup_password_input").value;
    const fullname = document.getElementById("signup_name_input").value;
    const payment = document.getElementById("payment_method_input").value;
    if (!username || !password || !fullname || !payment) {
      alert("Please provide all missing information.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        name: fullname,
        email: username,
        password: password,
        payment_method: payment,
      }),
    };

    const response = await fetch(`http://localhost:3030/signup`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data == "Success") {
          console.log("Signup Success");
          setSignupState("Success");
          setSignupMsg("Account Created Sucessfully under Email: " + username);
        } else {
          console.log("Signup Failed");
          setSignupState("Failed");
          if (data.data == "Exists")
            setSignupMsg("Account Already Exists under Email: " + username);
          else setSignupMsg("Failed to Create Account, Try again later");
        }
      })
      .catch((error) => setSignupMsg("Server Error, Try again later"));

    document.getElementById("signup_return").showModal();
    document.getElementById("signup_modal").close();
  };

  const handleLogin = async () => {
    const username = document.getElementById("username_input").value;
    const password = document.getElementById("password_input").value;
    let curr_userID = 0;

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        username: username,
        password: password,
      }),
    };

    document.getElementById("login_modal").close();

    const response = await fetch(`http://localhost:3030/login`, requestOptions);
    curr_userID = await response.json();

    // ID == 0 : Account doesn't exist
    // ID == -1 : Incomplete Login
    if (curr_userID === 0 || curr_userID === -1) {
      setLoginState(false);
      console.log("login failed");
    } else {
      setCookie(curr_userID);
      setLoginState(true);
      console.log("login success");
    }
  };

  const handleLogout = () => {
    document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoginState(false);
    basket.clearMiscMap();
    basket.clearBikeMap();
    navigate("/");
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
                  <Link to="/Account" class="btn btn-ghost rounded-btn">
                    My Orders
                  </Link>
                </>
              ) : (
                <button
                  onClick={() =>
                    document.getElementById("login_modal").showModal()
                  }
                  class="btn btn-ghost rounded-btn"
                >
                  Login
                </button>
              )}
              <dialog id="signup_return" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-white">
                    {signup_state}
                  </h3>
                  <p className="py-4 text-white">{signup_msg}</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
              <dialog id="login_modal" className="modal">
                <div className="modal-box text-white">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Login</h3>
                  <div class="form-control w-full max-w-xs">
                    <label class="label">
                      <span id="username" class="label-text">
                        Email
                      </span>
                    </label>
                    <input
                      id="username_input"
                      type="text"
                      placeholder="Enter your username"
                      class="input input-bordered w-full max-w-xs"
                    />
                    <label class="label"></label>
                    <label class="label">
                      <span id="password" class="label-text">
                        Password
                      </span>
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
                  <button
                    class="btn btn-ghost rounded-btn"
                    onClick={() =>
                      document.getElementById("signup_modal").showModal()
                    }
                  >
                    Sign up
                  </button>
                </div>
              </dialog>
              <dialog id="signup_modal" className="modal">
                <div className="modal-box text-white">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Login</h3>
                  <div class="form-control w-full max-w-xs">
                    <label class="label">
                      <span id="signup_name" class="label-text">
                        Name
                      </span>
                    </label>
                    <input
                      id="signup_name_input"
                      type="text"
                      placeholder="Enter your full name"
                      class="input input-bordered w-full max-w-xs"
                      required
                    />
                    <label class="label"></label>
                    <label class="label">
                      <span id="signup_username" class="label-text">
                        Email
                      </span>
                    </label>
                    <input
                      id="signup_username_input"
                      type="text"
                      placeholder="Enter your username"
                      class="input input-bordered w-full max-w-xs"
                      required
                    />
                    <label class="label"></label>
                    <label class="label">
                      <span id="signup_password" class="label-text">
                        Password
                      </span>
                    </label>
                    <input
                      id="signup_password_input"
                      type="password"
                      placeholder="Enter your password"
                      class="input input-bordered w-full max-w-xs"
                      onChange={confirmPW}
                      required
                    />
                    <label class="label"></label>
                    <label class="label">
                      <span id="confirm_pw" class="label-text">
                        Confirm Password
                      </span>
                    </label>
                    <input
                      id="confirm_pw_input"
                      type="password"
                      placeholder="Enter your password again"
                      class="input input-bordered w-full max-w-xs"
                      onChange={confirmPW}
                      required
                    />
                    <text
                      id="confirm_pw_error"
                      style={{ color: "red", display: "inline-block" }}
                    >
                      {signup_error}
                    </text>
                    <label class="label"></label>
                    <label class="label">
                      <span id="payment_method" class="label-text">
                        Payment Method - VISA/MASTERCARD/PayPAL
                      </span>
                    </label>
                    <input
                      id="payment_method_input"
                      type="text"
                      placeholder="Enter your payment method"
                      class="input input-bordered w-full max-w-xs"
                      required
                    />
                    <label class="label"></label>
                  </div>
                  <button
                    onClick={handleSignup}
                    class="btn btn-ghost rounded-btn"
                  >
                    Signup
                  </button>
                </div>
              </dialog>
              <div class="dropdown dropdown-end">
                {isLoggedIn ? (
                  <label tabindex="0" class="btn btn-ghost rounded-btn">
                    <a href="/Checkout">Checkout</a>
                  </label>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
