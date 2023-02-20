import React, { useState } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RegisterUser from "../users/registerUser/RegisterUser";
import useGetData from "../../customHooks/useGetData";
import GetConfig from "../../utils/GetConfig.util";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();
  const { url, setUser } = useGetData();

  const generateToken = (data) => {
    axios
      .post(`${url}/api/v1/users/login`, data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.data));
        loginUser();
        navigate("/ListaLead");
      })
      .catch((err) => {
        setErrorPassword(true);
      });
  };

  const loginUser = () => {
    axios
      .get(`${url}/api/v1/users/user`, GetConfig())
      .then((res) => {
        window.localStorage.setItem(
          "user",
          JSON.stringify(res.data.data.sessionUser)
        );
        setUser(JSON.parse(window.localStorage.getItem("user")));
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const close = () => {
    form.reset();
  };
  return (
    <>
      <div className="container login">
        <div>
          <form className="login" onSubmit={handleSubmit(generateToken)}>
            <h1 id="h1" className="m-4">
              Service<span id="span">Lead</span>
            </h1>
            <div className="mb-3 container-input">
              <label htmlFor="identification" className="form-label">
                Identificacion
              </label>
              <input
                type="number"
                className="form-control"
                id="identification"
                placeholder="25248758"
                {...register("identificationNumber")}
              />
            </div>
            <div className="mb-3 container-input">
              <label htmlFor="password1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password1"
                rows="3"
                placeholder="******"
                {...register("password")}
              />
            </div>

            <div className=" container-link">
              <p
                data-bs-toggle="modal"
                id="rigisteUser"
                data-bs-target="#exampleModal"
              >
                Registrarse
              </p>
            </div>
            {errorPassword && (
              <p className="errorCredential">Credenciales Incorrectas</p>
            )}
            <button type="submit" className="btn btn-success">
              Iniciar Session
            </button>
          </form>
        </div>
        <div id="img-login-hidden" className="img-login"></div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crear <span>Usuario</span>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btn-close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body">
              <RegisterUser />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
