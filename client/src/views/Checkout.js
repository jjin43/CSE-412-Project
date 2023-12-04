import "./Checkout.css";
import { React, useState, useEffect, useContext } from "react";
import { basket } from "../components/itemMaps";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/getCookie";

function Checkout() {
  const navigate = useNavigate();

  // State to store items from bike and misc maps
  const [bikeItems, setBikeItems] = useState([]);
  const [miscItems, setMiscItems] = useState([]);

  // useEffect to load items from localStorage on component mount
  useEffect(() => {
    if (getCookie() == null) {
      navigate("/");
    }
    // Assuming you have a method to extract items from maps, let's call it extractItems
    // You can replace the comment below with your own logic
    const extractItems = (map) => {
      return Array.from(map.entries()).map(([key, value]) => ({
        key, // Assuming your items have a key property
        value,
        isVisible: true,
      }));
    };

    const bikeMap = basket.getBikeMap();
    const miscMap = basket.getMiscMap();

    const extractedBikeItems = extractItems(bikeMap);
    const extractedMiscItems = extractItems(miscMap);

    setBikeItems(extractedBikeItems);
    setMiscItems(extractedMiscItems);
  }, []);

  const handleRemoveBikeItem = (itemKey) => {
    // Set the corresponding item's visibility to false
    setBikeItems((prevItems) =>
      prevItems.map((item) =>
        item.key === itemKey ? { ...item, isVisible: false } : item
      )
    );

    // Remove the item from the map
    basket.removeMapEntry(basket.bikeMap, itemKey);
  };

  const handleRemoveMiscItem = (itemKey) => {
    // Set the corresponding item's visibility to false
    setMiscItems((prevItems) =>
      prevItems.map((item) =>
        item.key === itemKey ? { ...item, isVisible: false } : item
      )
    );

    // Remove the item from the map
    basket.removeMapEntry(basket.miscMap, itemKey);
  };

  return (
    <div class="flex flex-col space-y-10 h-screen items-center">
      <h1 style={{ marginTop: 50 }}>Enter your information</h1>
      <input
        type="text"
        placeholder="Enter first name"
        class="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Enter last name"
        class="input input-bordered w-full max-w-xs"
      />
      <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Select Payment Method
        </option>
        <option>VISA</option>
        <option>MASTERCARD</option>
        <option>PAYPAL</option>
        <option>BITCOIN</option>
      </select>
      <div class="flex flex-col space-y-10 h-screen items-center">
        <h1>Current Basket</h1>
        <div>
          <div>
            <ul>
              {bikeItems.map((item) =>
                item.isVisible ? (
                  <div className="flex flex-row items-center" key={item.key}>
                    <li style={{ marginRight: 15 }}>
                      {item.key.b_model} : ${item.key.b_price}
                    </li>
                    <button
                      className="btn btn-error"
                      onClick={() => handleRemoveBikeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                ) : null
              )}
            </ul>
          </div>

          <ul>
            {miscItems.map((item) =>
              item.isVisible ? (
                <div className="flex flex-row items-center" key={item.key}>
                  <li style={{ marginRight: 15 }}>
                    {item.key.mi_item_name} : ${item.key.mi_item_price}
                  </li>
                  <button
                    className="btn btn-error"
                    onClick={() => handleRemoveMiscItem(item.key)}
                  >
                    Remove
                  </button>
                </div>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
