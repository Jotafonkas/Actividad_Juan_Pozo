import React, { Fragment, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiPlusCircle, BiTrash } from "react-icons/bi";

/* Generar id unicas */
import uuid4 from "uuid4";

/* Importar TodoItem */
import { TodoItem } from "./TodoItem";

/* Exportar TodoList */
export function TodoList() {
  const [todos, setTodos] = useState([]);

  const taskRef = useRef();

  const addTask = () => {
    const tarea = taskRef.current.value.trim();

    if (tarea === "") return;

    taskRef.current.value = null;

    setTodos((prevTodos) => {
      const newTask = {
        id: uuid4(),
        task: tarea,
        completed: false,
      };
      return [...prevTodos, newTask]; //Investigar
    });
  };

  const cambiarEstadoTarea = (id) => {
    /* Tomamos todos los elementos actuales del array */
    const newTodos = [...todos];
    //Buscar el elemento con el id dentro del array
    const todo = newTodos.find((todo) => todo.id === id);
    //Cambiar el estado dentro del array
    todo.completed = !todo.completed;
    //Se actualiza el array con los cambios hechos
    setTodos(newTodos);
  };

  
  /* Contamos las tareas que se han realizado */
  const contadorTareas = () => {
    return todos.filter((todo) => !todo.completed).length;
  };

  const eliminarCompletados = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  /* Mostrar un mensaje según la cantidad de tareas pendientes */
  const ResumenTareas = () => {
    const cant = contadorTareas();

    if (cant === 0) {
      return (
        <div className="text-center alert alert-success bg-dark text-light mt-3 col-5 rounded-3">
          Felicidades, no tienes tareas pendientes🫡
        </div>
      );
    }

    if (cant === 1) {
      return (
        <div className="text-center alert alert-warning bg-dark text-light mt-3 col-5 rounded-3">
          Te queda solamente 1 tarea😳
        </div>
      );
    }

    return (
      <div className="text-center alert alert-danger bg-dark text-light mt-3 col-5 rounded-3">
        Te quedan {cant} tareas pendientes🥺
      </div>
    );
  };

  return (
    <Fragment>
      <font color="yellow">
        <h1 className="text-center border border-dark rounded-4 p-1 bg-dark col-5 ">
          <b>Lista de Tareas</b>
        </h1>
      </font>

      <div className="border border-dark rounded-4 p-4 bg-dark col-5">
        <div className="input-group mb-3">
          <div className="ms-4">
            <input
              className="form-control" // clase "form-control"  para formulario
              placeholder="Ingrese una tarea" // texto dentro del input
              ref={taskRef}
            ></input>
          </div>

          {/* boton verde con margen de 4 en bootstrap */}
          <div className="">
            <button className="btn btn-success ms-4" onClick={addTask}>
              <BiPlusCircle size={20} />
            </button>
          </div>

          <div className="col-sm-0">
            <button className="btn btn-danger ms-4" onClick={eliminarCompletados}>
              <BiTrash size={20}/>
            </button>
          </div>
        </div>
        {/* Lista de tareas */}
        <ul className="list-group col-10 ms-4">
          {/* recorrer la lista */}
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              cambiarEstado={cambiarEstadoTarea}
            />
          ))}
        </ul>
      </div>

      <ResumenTareas />
    </Fragment>
  );
}
