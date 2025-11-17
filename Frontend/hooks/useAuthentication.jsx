import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from "../utils/TokenUtilities";
import { useEffect } from "react";
import { login } from "../services/AuthService";

const useAuthentication = (checkOnload = false) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("usernameMovie") || "";
  const validateLogin = () => {
    const token = getAccessToken();
    if (!token) {
      navigate("/login");
      return;
    }
  };
  const doLogin = (loginData) => {
    login(loginData)
      .then((response) => {
        console.log("Response del login:", response);
        saveAccessToken(response.access_token);
        localStorage.setItem("usernameMovie", loginData.username);
        navigate("/");
      })
      .catch(() => {
        alert("Error al iniciar sesión");
      });
  };
  const doLogout = () => {
    removeAccessToken();
    navigate("/login");
  };
  useEffect(() => {
    if (!checkOnload) {
      return;
    }
    validateLogin();
    // eslint-disable-next-line
  }, [navigate]);

  return { doLogout, doLogin, username };
};

export default useAuthentication;
