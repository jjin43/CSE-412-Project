import { React, useState, useEffect } from "react";
import "../components/cookie";

function Account() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userId = global.cookie.userID;
    const requestOptions = {
      method: "GET",
    };

    console.log(userId);

    fetch("http://localhost:3030/getUser/2", requestOptions)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => console.log("ERROR: ", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="Account">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  {!loading ? (
                    <>
                      <h1 className="text-4xl font-bold">
                        Greetings {user.userInfo.c_name}!
                      </h1>
                      <p className="py-3"></p>
                    </>
                  ) : (
                    <div className="skeleton w-64 h-32"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Store</th>
                    <th>Status</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders.map((order) => {
                    return (
                      <tr>
                        <th>{order.o_order_id}</th>
                        <td>{order.o_store_id}</td>
                        <td>{order.o_status}</td>
                        <td>item</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Account;
