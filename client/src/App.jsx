import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addUser, deleteUser, setSelectedUser, initialLoad } from "./userSlice.jsx"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"

function App() {

  const dispatch = useDispatch();

  const users = useSelector(
    state => state.users.users
  );

  const selectedUser = useSelector(
    state => state.users.selectedUser
  );

  const mockUsers = [
    { id: 1, name: "Harsh", role: "Admin", active: true },
    { id: 2, name: "Amit", role: "User", active: false },
    { id: 3, name: "Sneha", role: "User", active: true },
  ];

  // useEffect(() => {
  //   dispatch(addUsers(mockUsers));
  // }, []);

  const [value, setValue] = useState("");
  //const [selectedUser, setSelectedUser] = useState(undefined);

  const handleDelete = async () => {
    try {

      await axios.delete(`http://localhost:3000/users/${selectedUser?.id}`);
      dispatch(deleteUser(selectedUser));
      //handleAdd();
      //refreshUsers(); // re-fetch users after delete
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAdd = async () => {
    try {
      var res = await axios.get(`http://localhost:3000/users`);
      if(res.status == 200){
        dispatch(initialLoad(res.data));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handlePost = async () => {
    try{
      var res = await axios.post(`http://localhost:3000/users`, {
        name: value,
        age: 12
      });
      
      dispatch(addUser(res.data.user));
      setValue("");
    }catch(err) {

    }
  };


  useEffect(() => {
    handleAdd();
  }, []);

  const onAddUserClick = () => {


    if (value.trim()) {
      dispatch(addUser(value));
    }

    setValue("");
  };

  const onDeleteUserClick = (prop) => {
    dispatch(deleteUser(selectedUser));
  }

  const onSelection = (prop) => {
    //setSelectedUser(prop?.currentTarget?.innerText);
    dispatch(setSelectedUser(prop?.currentTarget?.innerText));
  }

  return (

    <div className="wrapper">
      <div className='header'>
        <h4>User Management Dashboard using Redux toolkit</h4>
      </div>
      <div className='content'>
        {/* <h5>Users List</h5> */}
        <div className='userInput'>
          <input className='userInputField' value={value} onChange={e => setValue(e.target.value)}></input>
          <button className='addUserBtn' onClick={handlePost}>Add User</button>
          <button className='deleteUserBtn' onClick={handleDelete}>Delete User</button>
        </div>
        <div className='tableContainer'>
          {users.map(user => (<div
            key={user.id}
            className= {`card ${ selectedUser?.id === user.id ? "selected" : ""}`}
            onClick={onSelection}
          > {user.text}
            {/* <h4>{user.name}</h4>
              <p>{user.role}</p> */}
            {/* <span className={user.active ? "active" : "inactive"}>
                {user.active ? "Active" : "Inactive"}
              </span> */}
          </div>))}
        </div>
      </div>
      <div className='footer'>
        <h4>Made with love by Harsh</h4>
      </div>
    </div>

  )
}

export default App
