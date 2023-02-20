import React from "react";
import GraphsLead from "./GraphsLead";
import "./graphsLead.css";

const ContainerGraphsLead = () => {
  return (
    <div className="containerGraps">
      <h1 id="h1">Grafica <span id="span">Leads</span></h1>
      <div className="graphs">
        {" "}
        <GraphsLead />
      </div>
    </div>
  );
};

export default ContainerGraphsLead;
