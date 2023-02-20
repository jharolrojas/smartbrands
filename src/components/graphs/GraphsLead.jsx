import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import useGetData from "../../customHooks/useGetData";

const GraphsLead = () => {
  const [leads, setLeads] = useState([]);
  const {url} = useGetData()

  const getAllLeads = () => {
    axios
      .get(`${url}/api/v1/lead`)
      .then((res) => setLeads(res.data.data.leads))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllLeads();
  }, []);
  const concretized = leads?.filter((lead) => lead.negotationStatus === true);
  const notConcretized = leads.length - concretized.length;
  const data = [
    {
      title: "Leads Estatus",
      Concretados: concretized.length,
      "No Concretados": notConcretized,
    },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" aspect={1}>
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Concretados" fill="#76ff03" />
          <Bar dataKey="No Concretados" fill="#ffc107" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphsLead;
