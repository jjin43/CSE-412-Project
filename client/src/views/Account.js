import { React, useState, useEffect } from "react";
import { getCookie } from "../components/getCookie";

function Account() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getCookie();
  const [userInfo, setUserInfo] = useState(["", "", "", ""]);
  const [orders, setOrders] = useState([]);

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
        <h1 className="" style={{ position: "absolute", top: 100 }}>
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
              -----------------------------------------------------------------------------------
            </span>
            <br />
            <h1> Orders </h1>

            <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div className="overflow-x-auto w-full">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Store</th>
                      <th>Status</th>
                      <th>Payment Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(orders).map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order.store_id}</td>
                        <td>{order.status}</td>
                        <td>{order.payment_info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {Object.keys(orders).length === 0 && <p>No orders found.</p>}
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default Account;
