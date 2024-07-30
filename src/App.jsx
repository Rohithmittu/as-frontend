import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    axios.get('https://assignment-flax-sigma.vercel.app/api/header')
      .then(response => setText(response.data.text))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://assignment-flax-sigma.vercel.app/api/header', { text: newText })
      .then(() => setText(newText))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>{text}</h1>
      <div className="admin-panel">
        <h2>Admin Panel</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter new H1 text"
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default App;
