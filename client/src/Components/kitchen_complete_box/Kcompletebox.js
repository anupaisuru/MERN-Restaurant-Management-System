import React from "react";

function Kcompletebox(props) {
  return (
    <tr className="korderbox b-dark ">
      <td>{props.name}</td>
      <td>{props.customername}</td>
    </tr>
  );
}

export default Kcompletebox;
