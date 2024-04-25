import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await axios.post(
        "http://localhost:5000/api/food/loginUser",
        user
      );

      console.log(response);
      const data = response.data;
      console.log(data);

      if (!data) {
        alert("Please enter valid credentials");
      }

      if (data) {
        localStorage.setItem("userEmail", data.data.email);
        localStorage.setItem("token", data.token);
        navigate("/"); //navigate to home page
      }

      if (response) {
        return alert(response.data.message);
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-5">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
            />
            <div id="emailHelp" className="form-text">
              Well never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="mt-3">
          If not have an account? <Link to="/register">click here</Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
