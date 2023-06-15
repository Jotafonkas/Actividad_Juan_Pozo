import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/* Importar TodoList */
import { TodoList } from "./components/TodoList";

/* Exportar App */
export function App() {
  return (
    <Fragment>
      <TodoList />
    </Fragment>
  );
}
