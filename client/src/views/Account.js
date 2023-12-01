import { React, useState, useEffect } from "react";
import { getCookie } from "../components/getCookie";

function Account() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = getCookie();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3030/getUser/2", requestOptions)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => console.log("ERROR: ", error))
      .finally(() => setLoading(false));
  }, []);

  console.log(user);
  console.log(userId);

  return (
    <div className="Account">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content text-center">
                <div className="max-w-md"></div>
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
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Account;