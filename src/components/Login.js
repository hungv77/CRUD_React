import { useContext, useEffect, useState } from "react";
import { login, loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate])

  const handleLogin = async() => {
    if(!email || !password) {
      toast.error("Missing Email/Password");
      return;
    }

    setLoadingAPI(true);
    let res = await loginApi(email.trim(), password);
    console.log(">>> check res: ", res)
    if(res && res.token) {
      loginContext(email, res.token);
      navigate("/");
    } else {
      //error
      if(res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingAPI(false);
  }

  const handleGoBack = () => {
    navigate("/");
  }

  const handlePressEnter = (event) => {
    if(event && event.key=== 'Enter'){
      handleLogin();
    }
  }

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log In</div>
        <div className="text">Email or Username (eve.holt@reqres.in)</div>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          <input
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event)=> handlePressEnter(event)}
          />
          <i 
            className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick = {() => setIsShowPassword(!isShowPassword)}
            ></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={(email && password) ? false : true}
          onClick={() => handleLogin()}
        >
          {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>} 
          &nbsp;Login
        </button>
        <div className="back">
          <i className="fa-solid fa-angle-left"></i> 
          <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
