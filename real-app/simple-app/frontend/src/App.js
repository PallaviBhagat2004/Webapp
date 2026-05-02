import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Use relative URLs - nginx will proxy /api/* to backend
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Backend not connected'));

    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: '40px', textAlign: 'center' }}>
      <h1>Simple React + Node App</h1>
      <h2>Backend says: {message}</h2>
      <h3>Users from API:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
