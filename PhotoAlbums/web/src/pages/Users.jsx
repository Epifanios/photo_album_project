
import React, { useState, useEffect } from 'react';

function Users() {
  //save data on the state
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div class="container text-center">
      <div class="row">
          <h1>Users Page</h1>
      </div> 
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {data.map(user => (
            <div class="col">
              <div class="p-3 border bg-light" key={user.id}>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
          ))}
      </div>   
    </div>
  );
}

export default Users;
