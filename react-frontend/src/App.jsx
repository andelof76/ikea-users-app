import { useEffect, useState } from 'react'
import './App.css'
import background from "./background1.jpg";


function App() {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const hostUrl = import.meta.env.PROD ? window.location.href : "http://localhost:8080/";
  
  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson)
    setUsers(usersToJson);
    };

    const fetchManagers = async () => {
      const response = await fetch(`${hostUrl}api/managers`);
      const managersToJson = await response.json();
      console.log(managersToJson)
      setManagers(managersToJson);
      };
    

    const createUser = async (e) => {
      e.preventDefault()
      const response = await fetch (`${hostUrl}api/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: e.target.name.value, favourite_beer: e.target.favourite_beer.value, isAdmin: e.target.isAdmin.checked }),
      });
      const newUser = await response.json();
      setUsers([...users, newUser]);
    }

    const createManager = async (e) => {
      e.preventDefault()
      const response = await fetch (`${hostUrl}api/managers`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: e.target.name.value, favourite_employee: e.target.favourite_employee.value, isAdmin: e.target.isAdmin.checked }),
      });
      const newManager = await response.json();
      setManagers([...managers, newManager]);
    }
    
    const deleteUser = async (e) => {
      await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json",
      },
      });
      await fetchUsers();
  }
  const updateUser = async (e) => {
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
    method: "PUT",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({ isAdmin: e.target.checked }),
    });
    await response.json();
    await fetchUsers();
};

const updateManager = async (e) => {
  const response = await fetch(`${hostUrl}api/managers/${e.target.dataset.id}`, {
  method: "PUT",
  headers: {
      "Content-type": "application/json",
  },
  body: JSON.stringify({ isAdmin: e.target.checked }),
  });
  await response.json();
  await fetchManagers();
};
  
const deleteManager = async (e) => {
  await fetch(`${hostUrl}api/manager/${e.target.dataset.id}`, {
  method: "DELETE",
  headers: {
      "Content-type": "application/json",
  },
  });
  await fetchManagers();
}
   

    useEffect(() => {
      fetchUsers();
    }, []);
    useEffect(() => {
      fetchManagers();
    }, []);
  
    //<input type="submit" />
  
  return (
    <>
    <div style={{ backgroundImage: `url(${background})` }}>
     <h1>Create New User</h1>
<form onSubmit={createUser}>
    <label htmlFor="name">Name</label>
    <input type="text" name="name" id="name" />
    <label htmlFor="Favourite beer">Favourite beer</label>
    <input type="text" name="Favourite beer" id="favourite_beer" />
    <label htmlFor="isAdmin">Is Admin</label>
    <input type="checkbox" name="isAdmin"/>
    <button type="submit">Submit form</button>
    <button type="reset">Reset form</button>
    
</form>

    <h1>Users</h1>
    <table>
      <thead>
        <tr>
        <th>Name</th>
            <th>Is Admin</th>
            <th>Favourite beer</th>
            <th>Delete</th>
            <th></th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <p>{user.name}</p>
                </td>
                <td>
                <input
                data-id={user.id}
                type="checkbox"
                checked={user.isAdmin}
                onChange={updateUser}
              />
              </td>
              <td>
                <p>{user.favourite_beer}</p>
                </td>
              <td>
              <button data-id={user.id} onClick={deleteUser}>Delete</button>
              </td>
              <td>
              <button data-id={user.id} onClick={updateUser}>Update</button>
              </td>
              
            </tr>
          ))}
        </tbody>
    </table>
    <h1>Create New Manager</h1>
<form onSubmit={createManager}>
    <label htmlFor="name">Name</label>
    <input type="text" name="name" id="name" />
    <label htmlFor="Favourite Employee">Favourite Employee</label>
    <input type="text" name="Favourite Employee" id="favourite_employee" />
    <label htmlFor="isAdmin">Is Admin</label>
    <input type="checkbox" name="isAdmin"/>
    <button type="submit">Submit form</button>
    <button type="reset">Reset form</button>
    
</form>
<h1>Managers</h1>
    <table>
      <thead>
        <tr>
        <th>Name</th>
            <th>Is Manager</th>
            <th>Favourite Employee</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id}>
              <td>
                <p>{manager.name}</p>
                </td>
                <td>
                <input
                data-id={manager.id}
                type="checkbox"
                checked={manager.isAdmin}
                onChange={updateManager}
              />
              </td>
              <td>
                <p>{manager.favourite_employee}</p>
                </td>
              <td>
              <button data-id={manager.id} onClick={deleteManager}>Delete</button>
              <button data-id={manager.id} onClick={updateManager}>Update</button>
              </td>
              
            </tr>
          ))}
        </tbody>
    </table>
    </div>
    </>
    
  );
  
}

export default App
