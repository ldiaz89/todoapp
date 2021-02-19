import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import EditTodo from "./EditTodo";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      const jsonData = await response.data;
      setTodos(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getTodos();
  }, []);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }


  };
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/${id}`);
      alert("delete succes");

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {}
  };

  return (
    <Fragment>
      <h1>list todos</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            if (todo.description)
              return (
                <tr key={todo.todo_id}>
                  <td>{todo.todo_id}</td>
                  <td>{todo.description}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      DELETE
                    </button>
                  </td>
                  <td>
                    
                    <EditTodo todo={todo}/>
                  </td>
                </tr>
              );
          })}
          {/* <tr>
      <td scope="row">1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListTodos;
