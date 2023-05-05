import React, { useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    / Send a request to the server for authentication /;
    axios
      .post('https://fellini-api.onrender.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        console.log(response);
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="FormUsername">
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </Form.Label>
      </Form.Group>

      <Button type="submit" onClick={handleSubmit}>
        Login
      </Button>
    </Form>
  );
}
