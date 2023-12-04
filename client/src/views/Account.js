import { React, useState, useEffect } from "react";
import { getCookie } from "../components/getCookie";

function Account() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getCookie();
  const [userInfo, setUserInfo] = useState(["", "", "", ""]);
  const [orders, setOrders] = useState([]);
  const [orderIds, setOrderIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET",
        };

        const response = await fetch(
          "http://localhost:3030/getUser/" + userId,
          requestOptions
        );
        const data = await response.json();
        setUser(data);

        if (data.userInfo) {
          setUserInfo([
            data.userInfo.c_customer_id,
            data.userInfo.c_email,
            data.userInfo.c_name,
            data.userInfo.c_payment_method,
          ]);
        } else {
          console.log("Not found");
        }

        if (data.orders) {
          setOrderIds(Object.keys(data.orders));
          setOrders(data.orders);
        }
      } catch (error) {
        console.log("ERROR: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  console.log(user);
  //console.log(userId);

  return (
    <div className="Account">
      <header className="App-header">
        <br></br>
        <br></br>
        <h1 className="text-2xl font-bold tex-center">
          Account Info
        </h1>
        <br></br>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-16">
              <label>{"[Customer ID#]:" + userInfo[0]}</label>
              <label>{"[Email]: " + userInfo[1]}</label>
              <label>{"[Name]:  " + userInfo[2]}</label>
              <label>{"[Payment Method]:  " + userInfo[3]}</label>
            </div>
            <span className="flex-shrink mx-4 text-gray-400">
              ----------------------------------------------------------------------------- 
            </span>
            <br />
            <h1 className="text-2xl font-bold"> Orders </h1>

            <div class="container mx-auto px-5 py-3 lg:px-32 lg:pt-12">
              <div className="overflow-x-auto w-full">
                <table className="table table divide-y-2">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="text-lg">OrderID</th>
                      <th className="text-lg">StoreID</th>
                      <th className="text-lg">Items / Quantity / Price</th>
                      <th className="text-lg">Status</th>
                      <th className="text-lg">Payment Info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2">
                    {Object.values(orders).map((order, index) => (
                      
                      <tr key={orderIds}>
                        <td>{orderIds[index]}</td>
                        <td>{order.store_id}</td>
                        <tbody>
                        {Object.values(order.item).map((item, i) => (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                        </tbody>
                        <td>{order.status}</td>
                        <td>{order.payment_info}</td>
                      </tr>
                      )
                    )}
                  </tbody>
                </table>
                {Object.keys(orders).length === 0 && <h1 className="text-center text-sm italic" style={{marginTop:'36px'}}>-- No orders found --</h1>}
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default Account;
