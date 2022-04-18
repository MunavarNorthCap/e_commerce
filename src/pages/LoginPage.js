import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('currentUser')) {
      // <Navigate to='/register' />
      navigate('/')
    }
  }, )

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result);
      localStorage.setItem("currentUser", JSON.stringify(result));
      toast.success("Login Success");
      setEmail('')
      setPassword('')
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if(localStorage.getItem('currentUser')) {
  //     return <Navigate to='/' />
  //   }
  // }, [])

  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="login-bottom"></div>
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>
            <hr />
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="my-3" onClick={login}>
              LOGIN
            </button>
            <hr />
            <Link to="/register">Click here to Register</Link>
          </div>
        </div>
        <div className="col-md-5">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_wdgehveh.json"
            background="transparent"
            speed="1"
            // style={{width: "300px", height: "300px"}}
            loop
            controls
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
