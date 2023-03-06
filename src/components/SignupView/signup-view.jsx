import{ useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data =  {
      username: username, 
      Email: email,
      password: password,
      Birthday: birthday
    }

   fetch("https://https://fellini-api.onrender.com/users", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response)=>{
            if(response.ok){
                console.log("success");
                alert("signup successful");
                window.location.reload();
                // onLoggedIn(username);
            }else{
                alert("singnup failed")
                console.log("signup fail")
                // onLoggedIn(username);
            }
        })
        ;
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
};