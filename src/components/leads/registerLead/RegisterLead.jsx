import Swal from "sweetalert2";
import React, { useEffect } from "react";
import axios from "axios";
import useGetData from "../../../customHooks/useGetData";
import GetConfig from "../../../utils/GetConfig.util";
var myModal;

const RegisterLead = ({
  getAllLeads,
  register,
  handleSubmit,
  isUpdate,
  setIsUpdate,
}) => {
  const { types, generateTypes, generateService, services } = useGetData();
  const { url } = useGetData();
  

  const createLead = (data) => {
    if (!isUpdate.name) {
      axios
        .post(`${url}/api/v1/lead`, data, GetConfig())
        .then((res) => {
          Swal.fire({
            title: "Registrado",
            icon: "success",
            confirmButtonText: "¡Listo!",
          });
          getAllLeads();
          
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
        .patch(`${url}/api/v1/lead/${isUpdate.id}`, data, GetConfig())
        .then((res) => {
          Swal.fire({
            title: "Modificado",
            icon: "success",
            confirmButtonText: "¡Listo!",
          });
          getAllLeads();
          setIsUpdate({});
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
    }
  };
  useEffect(() => {
    generateTypes();
    generateService();
    myModal = document.getElementById("btn-close");
  }, []);

  return (
    <form
      className=" register text-center "
      onSubmit={handleSubmit(createLead)}
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

      <div className="row">
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
        <div className="col">
          <label htmlFor="status">Estatus</label>
          <select
            name=""
            id="status"
            {...register("negotationStatus")}
            className="form-select"
            required
          >
            <option value="">Estatus</option>

            <option value={true}>concretado</option>
            <option value={false}>sin concretar</option>
          </select>
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
          <label htmlFor="dni">Numero</label>
          <input
            type="number"
            className="form-control"
            placeholder="DNI"
            id="dni"
            {...register("dni")}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="serviceId">Servicio</label>
          <select
            name=""
            id="serviceId"
            {...register("serviceId")}
            className="form-select"
            required
          >
            <option value="">Tipo</option>
            {services.map((service) => (
              <option value={service.id} key={service.id}>
                {service.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {isUpdate ? "Modificar" : "Registrar"  }
      </button>
    </form>
  );
};

export default RegisterLead;
