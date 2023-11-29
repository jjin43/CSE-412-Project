import './Misc.css';
import { React, useState, useEffect } from "react";

function Misc() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3030/getMisc")
      .then((response) => response.json())
      .then((item) => setItem(item))
      .finally(() => setLoading(false));
      
  }, []);

  // Need to implement filters still

  return (
    <div className="Misc">
      <header className="App-header">
        <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div class="-m-1 flex flex-wrap md:-m-2">
            {item.map((dataObj, index) => {
              return (
                    <div class="flex w-1/3 flex-wrap">
                      <div class="w-full p-1 md:p-2">
                        <text alt="gallery" class="block h-full w-full rounded-lg object-cover object-center">{dataObj.mi_item_name}</text>
                      </div>
                    </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Misc;