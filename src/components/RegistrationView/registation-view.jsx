import { useState } from 'react';
import axios from 'axios';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Name: name,
      Surname: surname,
      Username: username,
      Password: password,
      Email: email,
    };

    fetch('https://fellini-api.onrender.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful');
          window.location.reload();
        } else {
          alert('Signup failed');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="3"
          placeholder="Enter Username"
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          minLength="3"
          placeholder="Enter Username"
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
          placeholder="Enter Username"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter Email"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="Set Password"
        />
      </label>

      <button type="submit" className="registerButton">
        Register
      </button>
    </form>
  );
}
