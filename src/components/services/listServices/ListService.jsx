import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import RegisterService from "../registerService/RegisterService";
import useGetData from "../../../customHooks/useGetData";
import useConfigDataTable from "../../../customHooks/useConfigDataTable";
import GetConfig from "../../../utils/GetConfig.util";

const ListService = () => {
  const [services, setServices] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const { url } = useGetData();
  const { datatable } = useConfigDataTable();

  const getAllServices = () => {
    axios
      .get(`${url}/api/v1/service`, GetConfig())
      .then((res) => {
        setServices(res.data.data.services);
      })
      .catch((err) => console.log(err.response.data));
  };

  const statusForm = (service) => {
    reset(service);
    setIsUpdate(service);
  };
  const statusService = (id) => {
    axios
      .delete(`${url}/api/v1/service/${id}`, GetConfig())
      .then((res) => getAllServices())
      .catch((err) => console.log(err));
  };
  const close = () => {
    form.reset();
    setIsUpdate(false)
  };
  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <>
      <div className="container containerList">
        <div className="row">
          <div className="col-12 ">
            <div className="HeaderList">
              {" "}
              <h1>
                Lista de <span>Servicios</span>
              </h1>
              <i
                className="fas fa-user-plus"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={close}
              >
                {" "}
              </i>
            </div>

            <table
              id="table"
              className="table table-bordered table-hover w-100 datatable"
            >
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Estado</th>
                  <th>opciones</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.description}</td>
                    <td>{service.status ? "activo" : "desactivado"}</td>
                    <td>
                      {" "}
                      <i
                        className="fas fa-user-edit m-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => statusForm(service)}
                      ></i>
                      {service.status ? (
                        <i
                          className="fas fa-user-check"
                          onClick={() => statusService(service.id)}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-user-slash"
                          onClick={() => statusService(service.id)}
                        ></i>
                      )}
                    </td>
                    {service.id == services[services.length - 1].id &&
                      datatable()}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
             
        </div>
      </div>

      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Servicios
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
              <RegisterService
                getAllServices={getAllServices}
                register={register}
                handleSubmit={handleSubmit}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListService;
