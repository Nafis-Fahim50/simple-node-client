import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }
    ,[])

  const handleCreateUser = (event) =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
    })
    .catch(err => console.error(err))
    form.reset();
  }

  return (
    <div className="App mt-5">
      <Form onSubmit={handleCreateUser}>
        <input type="text" name='name' placeholder='name' /> 
        <br />
        <input type="email" name="email" id="" placeholder='email' />
        <br />
        <br />
        <button type="submit">Add user</button>
      </Form>
      <h2>Total user: {users.length}</h2>
      {
        users.map(user=> <p key={user._id}>
          {user.name} {user.email}
        </p>)
      }
    </div>
  );
}

export default App;
