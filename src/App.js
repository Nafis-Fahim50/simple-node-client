import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res => res.json())
    .then(data => setUsers(data))
  }
    ,[])
  return (
    <div className="App">
      <h2>Total user: {users.length}</h2>
      {
        users.map(user=> <p key={user.id}>
          {user.name} {user.email}
        </p>)
      }
    </div>
  );
}

export default App;
