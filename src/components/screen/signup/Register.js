import React from 'react'
import { useState  } from 'react';
import "./Register.css"
import { register } from '../../config/Firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
   const navigate = useNavigate ();
   const [fullname, setFullname] = useState();
   const [age, setAge] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();

   const  signup = async () => {
    await  register({ email, password, age, fullname })
      navigate('/login')
   }

   {console.log(email)}
   {console.log(password)}

  return (
    <div className="Register">
      <div className="bg-img">
        <div className="register-content">
          <header>Register Form</header>
          <form action="#">
            <div className="field">
              <span className="fa fa-user"></span>
              <input type="text"  placeholder="Full Name" onChange={(e) => setFullname (e.target.value)} />
            </div>
            <div className="field mt-3">
              <span className="fa fa-user"></span>
              <input type="text"  placeholder="Age" onChange={(e) => setAge (e.target.value)} />
            </div>
            <div className="field  mt-3">
              <span className="fa fa-user"></span>
              <input type="text"  placeholder="Email" onChange={(e) => setEmail (e.target.value)} />
            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input
                type="password"
                className="pass-key"  
                placeholder="Password"
                onChange={(e) => setPassword (e.target.value)}
              />
              <span className="show">SHOW</span>
            </div>
            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="field">
              {/* <button onClick={signup}>Register</button> */}
              <input type='button' value="Register" onClick={signup} />
            </div>
          </form>
          <div className="login">Or Register with</div>
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
            Already have an account. 
            <a onClick={() => navigate ("/login")}> login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
