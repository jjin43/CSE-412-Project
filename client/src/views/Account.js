import { React, useState, useEffect } from "react";
import { getCookie } from "../components/getCookie";

function Account() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = getCookie();
  const [userInfo, setUserInfo] = useState(["","","",""])

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
    };
    
    fetch("http://localhost:3030/getUser/"+userId, requestOptions)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => console.log("ERROR: ", error))
      .finally(() => setLoading(false));

    console.log(user)
    if(user.userInfo)
      setUserInfo([user.userInfo.c_customer_id,user.userInfo.c_email,user.userInfo.c_name,user.userInfo.c_payment_method])
    else
      console.log("Not found")

  }, []);

  const updateInfo =  () => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
    };
    fetch("http://localhost:3030/getUser/"+userId, requestOptions)
    .then((response) => response.json())
    .then((user) => setUser(user))
    .catch((error) => console.log("ERROR: ", error))
    .finally(() => setLoading(false));
  setUserInfo([user.userInfo.c_customer_id,user.userInfo.c_email,user.userInfo.c_name,user.userInfo.c_payment_method])
  }

  console.log(user);
  console.log(userId);

    return (
      <div className="Account">
        <header className="App-header">
          <h1 className="">Account Info</h1>
          <br></br>
          <div className="grid grid-cols-2 gap-16" onLoad={updateInfo}>
            
            <label>{"[Customer ID#]:" + userInfo[0]}</label>
            <label>{"[Email]: " + userInfo[1]}</label>
            <label>{"[Name]:  " + userInfo[2]}</label>
            <label>{"[Payment Method]:  " + userInfo[3]}</label>
          </div>
          <span className="flex-shrink mx-4 text-gray-400">-----------------------------------------------------------------------------------</span>
          <br></br>
          <h1> Orders </h1>
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
