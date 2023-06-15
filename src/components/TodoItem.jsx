import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export function TodoItem({ todo, cambiarEstado }) {
  const { id, task, completed } = todo;
  const fnCambiarEstado = () => {
    cambiarEstado(id);
  };

  return (
    <li
      className="list-group-item"
      key={id}
      onClick={fnCambiarEstado}
      style={{ backgroundColor: completed ? "lightblue" : "red" }}
    >
      <input
        type="checkbox"
        className="form-checked-input me-2"
        onClick={id.checked }
        style={{ backgroundColor: completed ? "lightblue" : "red" }}
        checked={completed}
      />
      {task}
    </li>
  );
}

