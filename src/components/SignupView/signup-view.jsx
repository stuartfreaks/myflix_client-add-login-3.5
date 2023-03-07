import{ useState } from "react";

export function RegistrationView (props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://fellini-api.onrender.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: Birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // '_self' is necessary to open page in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="registerButton">Register</button>
    </form>
  );
}};