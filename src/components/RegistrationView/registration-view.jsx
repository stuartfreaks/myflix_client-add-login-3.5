import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './registration-view.scss';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="FormName">
        <Form.Label>
          Name:
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength="3"
            placeholder="Enter Name"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="FormSurname">
        <Form.Label>
          Surname:
          <Form.Control
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            minLength="3"
            placeholder="Enter Username"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="FormUsername">
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Enter Username"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="Email">
        <Form.Label>
          Email:
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="FormPassword">
        <Form.Label>
          Password:
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            placeholder="Set Password"
          />
        </Form.Label>
      </Form.Group>

      <Button type="submit" className="registerButton">
        Register
      </Button>
    </Form>
  );
}
