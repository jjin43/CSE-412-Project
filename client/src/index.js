import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasketProvider } from "./components/basketContext";
import "./index.css";
import App from "./views/App";
import Home from "./views/Home";
import Bikes from "./views/Bikes";
import Misc from "./views/Misc";
import Account from "./views/Account";
import Navbar from "./components/navbar";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BasketProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/App" element={<App />} />
          <Route path="/Bikes" element={<Bikes />} />
          <Route path="/Misc" element={<Misc />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </BasketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
