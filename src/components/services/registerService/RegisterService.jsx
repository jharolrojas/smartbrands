import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import GetConfig from "../../../utils/GetConfig.util";
let myModal;

const RegisterService = ({
  getAllServices,
  register,
  handleSubmit,
  isUpdate,
  setIsUpdate,
}) => {
  const createService = (data) => {
    if (!isUpdate?.description) {
      axios
        .post(
          "https://leads-production.up.railway.app/api/v1/service",
          data,
          GetConfig()
        )
        .then((res) => {
          Swal.fire({
            title: "Registrado",
            icon: "success",
            confirmButtonText: "¡Listo!",
          });
          getAllServices();
          form.reset();
          myModal.click();
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: "Lead ya registrado o datos incorrectos",
            icon: "error",
            confirmButtonText: "Verificar",
          });
        });
    } else {
      axios
        .patch(
          `https://leads-production.up.railway.app/api/v1/service/${isUpdate.id}`,
          data,
          GetConfig()
        )
        .then((res) => {
          Swal.fire({
            title: "Modificado",
            icon: "success",
            confirmButtonText: "¡Listo!",
          });
          getAllServices();
          setIsUpdate({});
          form.reset();
          myModal.click();
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: "Service ya registrado o datos incorrectos",
            icon: "error",
            confirmButtonText: "Verificar",
          });
        });
    }
  };

  useEffect(() => {
    myModal = document.getElementById("btn-close");
  }, []);

  return (
    <form
      className="register text-center"
      onSubmit={handleSubmit(createService)}
      id="form"
    >
      <div className="row">
        <div className="col">
          <label htmlFor="description">Descripcion</label>
          <input
            className="form-control"
            type="text"
            id="description"
            {...register("description")}
            placeholder="Descripcion"
            required
          />
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
      </div>

      <button type="submit" className="btn btn-primary">
        {isUpdate ? "Modificar" : "Registrar"}
      </button>
    </form>
  );
};

export default RegisterService;
