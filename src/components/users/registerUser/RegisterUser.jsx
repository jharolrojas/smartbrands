import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import useGetData from "../../../customHooks/useGetData";
var myModal;

const RegisterUser = ({ getAllUsers }) => {
  const { types, generateTypes, roles, generateRoles, url } = useGetData();
  const { register, handleSubmit } = useForm();

  const createUser = (data) => {
    axios
      .post(`${url}/api/v1/users`, data)
      .then((res) => {
        Swal.fire({
          title: "Registrado",
          icon: "success",
          confirmButtonText: "¡Listo!",
        });
        getAllUsers && getAllUsers();
        form.reset();
        myModal.click();
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Usuario ya registrado o datos incorrectos",
          icon: "error",
          confirmButtonText: "Verificar",
        });
      });
  };

  useEffect(() => {
    generateTypes();
    generateRoles();
    myModal = document.getElementById("btn-close");
  }, []);

  return (
    <form
      className="register text-center"
      onSubmit={handleSubmit(createUser)}
      id="form"
    >
      <div className="row">
        <div className="col">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            id="name"
            {...register("name")}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="last-name">Apellido</label>
          <input
            type="text"
            className="form-control"
            placeholder="Apellido"
            id="last-name"
            {...register("lastName")}
            required
          />
        </div>
      </div>
      <div className="row ">
        
          <div className="col">
            <label htmlFor="identificationTypeId">T.Identificación</label>
            <select
              name=""
              id="identificationTypeId"
              {...register("identificationTypeId")}
              className="form-select"
              required
            >
              <option value="">Tipo</option>
              {types.map((type) => (
                <option value={type.id} key={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
         
        </div>
        <div className="col">
          <label htmlFor="identification-number">Numero</label>
          <input
            type="number"
            className="form-control"
            placeholder="DNI"
            id="identification-number"
            {...register("identificationNumber")}
            pattern="{1,3}"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="birth-date">F. Nacimiento</label>
          <input
            type="date"
            id="birth-date"
            {...register("birthDate")}
            max="2004-01-01"
            required
          />
        </div>

        <div className="col">
          <label htmlFor="gender">Genero</label>
          <select
            name=""
            id="gender"
            {...register("gender")}
            className="form-select"
            required
          >
            <option value="">Genero</option>

            <option value={true}>Femenino</option>
            <option value={false}>Masculino</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="status">Estatus</label>
          <select
            name=""
            id="status"
            {...register("status")}
            className="form-select"
            required
          >
            <option value="">Estatus</option>

            <option value={true}>Activo</option>
            <option value={false}>Desactivado</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="role">Rol</label>
          <select
            name=""
            id="role"
            {...register("userRoleId")}
            className="form-select"
            required
          >
            <option value="">Rol</option>
            {roles.map((role) => (
              <option value={role.id} key={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            id="password"
            {...register("password")}
            min="10"
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Registrar
      </button>
    </form>
  );
};

export default RegisterUser;
