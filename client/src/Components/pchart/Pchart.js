import React from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

function Pchart() {
  const [pCount, setData1] = useState(0);
  const [cCount, setData2] = useState(0);
  const [cnCount, setData3] = useState(0);

  useEffect(() => {
    axios.get("/api/kitchen/pending/count").then((response) => {
      setData1(response.data);
    });

    axios.get("/api/kitchen/complete/count").then((response) => {
      setData2(response.data);
    });

    axios.get("/api/kitchen/cancel/count").then((response) => {
      setData3(response.data);
    });
  }, []);

  const data = [
    { name: "Pending Orders", value: pCount },
    { name: "Complete Orders", value: cCount },
    { name: "Cancel Orders", value: cnCount },
  ];

  const COLORS = ["#ffc000", //yellow color-pending orders
  "#4472c4", //green color-complete orders
   "#ed7d31" //red color-cancel orders
  ];

  return (
    <div className="pchrt">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={0}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Pchart;
