import "./Checkout.css";
import { React, useState, useEffect, useContext } from "react";
import { basket } from "../components/itemMaps";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/getCookie";

function Checkout() {
  const navigate = useNavigate();
  const initialPayment = () => {
    const value = "VISA";
    return value;
  };
  const [payment, setPayment] = useState(initialPayment)
  const [checkedOrderText, setCheckedOrderText] = useState('');
  const [checkedOrderId, setCheckedOrderID] = useState('');

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

  const handleCheckout = async () => {
    let data = {customerID:getCookie(), payment_method:payment, bike:[], misc:[]}

    for (let [key, value] of basket.bikeMap) {
      data.bike.push({item_id: key.b_bike_serial_num, quantity: value})
    }
    for (let [key, value] of basket.miscMap) {
      data.misc.push({item_id: key.mi_item_id, quantity: value})
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
    };

    console.log(JSON.stringify(data));
    const response = await fetch(`http://localhost:3030/createorder`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.state=1){
        setCheckedOrderText('Success');
        setCheckedOrderID('New Order Created! OrderID-'+data.order_id);
        basket.clearBikeMap(); basket.clearMiscMap();
        document.getElementById('checkout_return').showModal();
        navigate('/');
      }
      else{
        setCheckedOrderText('Failed');
        setCheckedOrderText('Failed Creating new Order! Try again Later!');
        document.getElementById('checkout_return').showModal();
      }

    })
    .catch();
    
  }

  const changePayment = (e) => {
    setPayment(e.target.value);
  }



  return (
    <div class="flex flex-col space-y-10 h-screen items-center">
      <dialog id="checkout_return" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="font-bold text-lg">{checkedOrderText}</h3>
          <p class="py-4">{checkedOrderId}</p>
        </div>
      </dialog>
      <h1 className="text-xl font-bold" style={{ marginTop: 50 }}>Enter your information</h1>
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
      <select class="select select-bordered w-full max-w-xs" value={payment} onChange={changePayment}>

        <option value="VISA">VISA</option>
        <option value="MASTERCARD">MASTERCARD</option>
        <option value="PAYPAL">PAYPAL</option>
        <option value="BITCOIN">BITCOIN</option>
      </select>
      <span>-----------------------------------------------------------------------------</span>
      <div class="flex flex-col space-y-10 h-screen items-center">
        <h1 class='text-2xl font-bold'>Current Basket</h1>
        <div>
          <div>
            <ul>
              {bikeItems.map((item) =>
                item.isVisible ? (
                  <div className="container mx-auto" key={item.key}>
                    <li style={{ marginRight: 15 }}>
                      {item.key.b_model} : ${item.key.b_price}
                    </li>
                    <button
                      className="btn btn-error btn-sm"
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
                <div className="container mx-auto" key={item.key}>
                  <li style={{ marginRight: 15 }}>
                    {item.key.mi_item_name} : ${item.key.mi_item_price}
                  </li>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleRemoveMiscItem(item.key)}
                  >
                    Remove
                  </button>
                </div>
              ) : null
            )}
          </ul>
        </div>
        <button
          className="btn btn-success btn-lg"
          onClick={handleCheckout}
        > Place Order </button>
      </div>
    </div>
  );
}

export default Checkout;
