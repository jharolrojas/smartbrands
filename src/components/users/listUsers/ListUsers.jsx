import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import RegisterUser from "../registerUser/RegisterUser";
import UpdateUser from "../registerUser/UpdateUser";
import useGetData from "../../../customHooks/useGetData";
import useConfigDataTable from "../../../customHooks/useConfigDataTable";
import GetConfig from "../../../utils/GetConfig.util";

const listUsers = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [formUserValue, setFormUserValue] = useState(false);
  const { generateTypes, types, url } = useGetData();
  const { datatable } = useConfigDataTable();

  const getAllUsers = () => {
    axios
      .get(`${url}/api/v1/users`, GetConfig())
      .then((res) => {
        setUsers(res.data.data.users);
      })
      .catch((err) => console.log(err.response.data));
  };

  const usersVendedor = users.filter((user) => user.userRoleId != 1);
  let newArrayUsers = [];
  for (let i = 0; i < usersVendedor.length; i++) {
    for (let j = 0; j < types.length; j++) {
      if (types[j].id === usersVendedor[i].identificationTypeId) {
        usersVendedor[i].type = types[j].name;
        usersVendedor[i].birthDate = String(usersVendedor[i].birthDate).split(
          "T"
        )[0];
        newArrayUsers.push(usersVendedor[i]);
      }
    }
  }

  const statusForm = (userVendedor) => {
    setFormUserValue(true);
    reset(userVendedor);
    setIsUpdate(userVendedor);
  };
  const deleteUser = (id) => {
    axios
      .delete(`${url}/api/v1/users/${id}`, GetConfig())
      .then((res) => getAllUsers())
      .catch((err) => console.log(err));
  };
  const close = () => {
    form.reset();
    setIsUpdate(false);
  };
  useEffect(() => {
    getAllUsers();
    generateTypes();
  }, []);
  return (
    <>
      <div className="container containerList">
        <div className="row">
          <div className="col-12 ">
            <div className="HeaderList">
              {" "}
              <h1>
                Lista de<span> Usuarios</span>
              </h1>
              <i
                className="fas fa-user-plus"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setFormUserValue(false)}
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
                  <th>opciones</th>

                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>F. Nacimiento</th>
                  <th>T.Documento</th>
                  <th>DNI</th>
                  <th>Estado</th>
                  <th>Genero</th>
                </tr>
              </thead>
              <tbody>
                {newArrayUsers.map((newArrayUser) => (
                  <tr key={newArrayUser.id}>
                      <td>
                      {" "}
                      <i
                        className="fas fa-user-edit m-2 edit"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => statusForm(newArrayUser)}
                      ></i>
                      {newArrayUser.status ? (
                        <i
                          className="fas fa-user-check on"
                          onClick={() => deleteUser(newArrayUser.id)}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-user-slash off"
                          onClick={() => deleteUser(newArrayUser.id)}
                        ></i>
                      )}
                    </td>
                    <td>{newArrayUser.name}</td>
                    <td>{newArrayUser.lastName}</td>
                    <td>{newArrayUser.birthDate}</td>
                    <td>{newArrayUser.type}</td>
                    <td>{newArrayUser.identificationNumber}</td>
                    <td>{newArrayUser.status ? "activo" : "deshabilitado"}</td>
                    <td>{newArrayUser.gender ? "femenino" : "masculino"}</td>
                  
                    {newArrayUser.id ==
                      usersVendedor[usersVendedor.length - 1].id && datatable()}
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
                Usuario
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
              {formUserValue ? (
                <UpdateUser
                  getAllUsers={getAllUsers}
                  register={register}
                  handleSubmit={handleSubmit}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />
              ) : (
                <RegisterUser getAllUsers={getAllUsers} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default listUsers;
