import React from "react";
import "./Login.css";
import { login } from "../../config/Firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = async () => {
    await login({ email, password });
    navigate("/");
  };

  return (
    <div className="Login">
      <div className="bg-img">
        <div className="login-content">
          <header>Login Form</header>
          <form action="#">
            <div className="field">
              <span className="fa fa-user"></span>
              <input
                type="text"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input
                type="password"
                className="pass-key"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="show">SHOW</span>
            </div>
            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="field">
              <button type="button" value="LOGIN" onClick={signIn}>
                login
              </button>
            </div>
          </form>
          <div className="login">Or login with</div>
          <div className="links">
            <div className="facebook">
              <i className="fab fa-facebook-f">
                <span>Facebook</span>
              </i>
            </div>
            <div className="instagram">
              <i className="fab fa-instagram">
                <span>Instagram</span>
              </i>
            </div>
          </div>
          <div className="signup">
            Don't have account?
            <a onClick={() => navigate("/register")}> Signup Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
