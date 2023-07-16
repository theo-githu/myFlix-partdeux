import { useState } from "react";
import { Form, Button } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
      // this prevents the default behavior of the form which is to reload the entire page
      event.preventDefault();
  
      const data = {
        Username: username,
        Password: password
      };
  
      fetch("https://movieflix-899d9c6c8969.herokuapp.com/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user found");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} className="my-3 text-white">
      <Form.Group controlId='formUsername' className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          pattern="[0-9a-zA-Z]{5,}"
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group controlId='formPassword' className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </Form.Group>
      <Button variant='primary' type='submit' className='mt-1'>Log In</Button>
    </Form>
    </>
  );
};