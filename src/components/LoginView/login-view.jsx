
import React, { useState } from 'react';





export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
};
  const data = {
    acess: username,
    secret: password
  };

  fetch('https://openlibrary.org/account/login.json', {
    method: "POST", 
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) {
      onLoggedIn(username);
    } else {
      alert("Login Failed");
    }
  });

  
  

  

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      
      <button type="submit" onClick={handleSubmit}>Submit</button>

      
    
    </form>
 

  );
}