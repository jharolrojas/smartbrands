import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterLead from "../registerLead/RegisterLead";
import { useForm } from "react-hook-form";
import useGetData from "../../../customHooks/useGetData";
import useConfigDataTable from "../../../customHooks/useConfigDataTable";
import GetConfig from "../../../utils/GetConfig.util";

const ListLead = () => {
  const { register, handleSubmit, reset } = useForm();
  const [leads, setLeads] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { generateService, services, url } = useGetData();
  const { datatable } = useConfigDataTable();

  const getAllLeads = () => {
    axios
      .get(`${url}/api/v1/lead`, GetConfig())
      .then((res) => {
        setLeads(res.data.data.leads);
      })
      .catch((err) => console.log(err));
  };

  const statusForm = (lead) => {
    reset(lead);
    setIsUpdate(lead);
  };
  const statusLead = (id) => {
    axios
      .delete(`${url}/api/v1/lead/status/${id}`, GetConfig())
      .then((res) => getAllLeads())
      .catch((err) => console.log(err));
  };

  let newArrayLeads = [];
  for (let i = 0; i < leads.length; i++) {
    for (let j = 0; j < services.length; j++) {
      if (services[j].id === leads[i].serviceId) {
        leads[i].service = services[j].description;
        newArrayLeads.push(leads[i]);
      }
    }
  }
  const close = () => {
    form.reset();
    setIsUpdate(false)
  };

  useEffect(() => {
    getAllLeads();
    generateService();
  }, []);
  return (
    <>
      <div className="container containerList">
        <div className="row">
          <div className="col-12 ">
            <div className="HeaderList">
              {" "}
              <h1>
                Lista <span>Leads</span>
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
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Servicio</th>
                  <th>Estado</th>
                  <th>Genero</th>
                  <th>opciones</th>
                </tr>
              </thead>
              <tbody>
                {newArrayLeads.map((newArrayLead) => (
                  <tr key={newArrayLead.id}>
                    <td>{newArrayLead.name}</td>
                    <td>{newArrayLead.lastName}</td>
                    <td>{newArrayLead.dni}</td>
                    <td>{newArrayLead.service}</td>

                    <td>
                      {newArrayLead.negotationStatus
                        ? "concretado"
                        : "sin concretado"}
                    </td>
                    <td>{newArrayLead.gender ? "femenino" : "masculino"}</td>
                    <td>
                      <i
                        className="fas fa-user-edit m-2 edit"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => statusForm(newArrayLead)}
                      ></i>
                      {newArrayLead.negotationStatus ? (
                        <i
                          className="fas fa-user-check on"
                          onClick={() => statusLead(newArrayLead.id)}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-user-slash off"
                          onClick={() => statusLead(newArrayLead.id)}
                        ></i>
                      )}
                    </td>
                    {newArrayLead.id == newArrayLeads[leads.length - 1].id &&
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
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Lead
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
              <RegisterLead
                getAllLeads={getAllLeads}
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

export default ListLead;
