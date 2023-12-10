import React from "react";
import "./Korderbox.css";

import axios from "axios";
import Swal from "sweetalert2";

function Korderbox(props) {
  const completedAction = async (id) => {
    Swal.fire({
      title: "Confirm completing this action?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, complete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch("/api/kitchen/action/complete", id)
          .then((res) => {
            Swal.fire(
              "Completed!",
              "The action has been completed.",
              "success"
            ).then((result) => {
              window.location.reload();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const cancelAction = async (id) => {
    Swal.fire({
      title: "Confirm canceling this action?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch("/api/kitchen/action/cancel", id)
          .then((res) => {
            Swal.fire(
              "Canceled!",
              "The action has been canceled.",
              "success"
            ).then((result) => {
              window.location.reload();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <tr className="korderbox b-dark ">
      <td>{props.name}</td>
      <td>{props.customername}</td>
      <td className="btngroup">
        <button
          onClick={() => completedAction({ id: props.id })}
          type="button"
          class="btn btn-success btn-sm "
        >
          completed
        </button>
        <button
          onClick={() => cancelAction({ id: props.id })}
          type="button"
          class="btn btn-danger btn-sm "
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default Korderbox;
