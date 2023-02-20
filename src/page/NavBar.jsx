import React from "react";

import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  let isValue = false;

  if (user) {
    isValue = user.userRoleId != 1;
  }
  const finishSession = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light "
      id="containerNavBar"
    >
      <h1 id="h1">
        Service<span id="span">Lead</span>
      </h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {console.log()}
          <li className="nav-item">
            <Link className="nav-link  " to="/ListaLead">
              Leads
            </Link>
          </li>
          <li className={`${isValue && "d-none"} nav-item`}>
            <Link className="nav-link" to="/ListaServicios">
              Servicios
            </Link>
          </li>
          <li className={`${isValue && "d-none"} nav-item`}>
            <Link className="nav-link" to="/Graficas">
              Graficas
            </Link>
          </li>
          <li className={`${isValue && "d-none"} nav-item`}>
            <Link className="nav-link" to="/ListaUsuarios">
              Usuarios
            </Link>
          </li>
          <li className=" nav-item" onClick={finishSession}>
            <Link className="nav-link">Cerrar Sesion</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
