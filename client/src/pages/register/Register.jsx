import { useState } from "react";
import { axiosInstance } from "../../config";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/user/register", {
        email,
        username,
        password,
        referral,
      });
      setLoading(false);
      window.location.replace("/login");
      return alert("Registration successful! proceed to login");
    } catch (err) {
      setLoading(false);
      return alert(err.response.data.message);
    }
  };
  return (
    <div className="register">
      <div className="container">
        <h3>Register</h3>
        <form className="row g-3 registrationForm" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <input
              type="email"
              placeholder="Email"
              className="form-control shadow-none"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="form-control shadow-none"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Referral username if available"
              name="referral"
              className="form-control shadow-none"
              onChange={(e) => setReferral(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control shadow-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" type="submit">
              {loading ? "Please wait..." : "Register"}
            </button>
          </div>
        </form>
        <div className="member">
          Already a member? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
