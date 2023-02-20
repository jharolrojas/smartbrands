import axios from "axios";
import React, { useState } from "react";
import GetConfig from "../utils/GetConfig.util";

const useGetData = () => {
  const url = "https://leads-production.up.railway.app";
  const [types, setTypes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(false);

  const generateTypes = () => {
    axios
      .get(`${url}/api/v1/userTypes/`)
      .then((res) => setTypes(res.data.data.types))
      .catch((err) => console.log(err));
  };

  const generateRoles = () => {
    axios
      .get(`${url}/api/v1/userRoles`)
      .then((res) => setRoles(res.data.data.roles))
      .catch((err) => console.log(err));
  };
  const generateService = () => {
    axios
      .get(`${url}/api/v1/service`, GetConfig())
      .then((res) => setServices(res.data.data.services))
      .catch((err) => console.log(err));
  };

  return {
    types,
    generateTypes,
    roles,
    generateRoles,
    generateService,
    services,
    url,
    user,
    setUser,
  };
};

export default useGetData;
