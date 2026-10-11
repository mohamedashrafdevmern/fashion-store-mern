import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5001/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

  if (!response.ok) {
  alert(data.message);
  return;
}

    console.log(data);

    navigate("/login");
  } catch (error) {
    console.error("Register error:", error);
  }
};

  return (
    <main className="register-page">
      <div className="register-container">
        <h1>Create Account</h1>

        <p className="register-subtitle">
          Create a new account
        </p>

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;