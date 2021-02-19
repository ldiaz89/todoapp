import React, { useState } from "react";
import axios from "axios";

function EditTodo({ todo }) {
  const [description, setDescription] = useState(todo.description);

  const updateTodo = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `http://localhost:3001/${todo.todo_id}`,
        { description }
      );
      window.location = '/'
    } catch (error) {}
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        UPDATE
      </button>

      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"
              onClick={(e) => updateTodo(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
