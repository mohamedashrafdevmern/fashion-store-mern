
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../Context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleSubmit = async(event) => {
  event.preventDefault();

  const newErrors = {};
  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);

 if (Object.keys(newErrors).length === 0) {
  try {
    const response = await fetch(
      "http://localhost:5001/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setErrors({
        login: data.message || "Login failed",
      });
      return;
    }

    login(data.user, data.token);

    setLoginSuccess(true);

    navigate("/");
    } catch (error) {
    console.error("Login error:", error);

    setErrors({
      login: "Unable to connect to server",
    });
  }
}
};

  return (
    <main className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && (
            <p className="form-error">{errors.email}</p>
              )}
          </div>

         <div className="form-group">
  <label htmlFor="password">Password</label>

  <div className="password-input-wrapper">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>

  {errors.password && (
    <p className="form-error">{errors.password}</p>
  )}
</div>
          
          {errors.login && (
           <p className="form-error">{errors.login}</p>
           )} 
          <button type="submit" className="login-button">
            Login
          </button>
          {loginSuccess && (
            <p className="login-success">Login successful!</p>
          )}
        </form>
      </div>
    </main>
  );
}

export default Login;