import React, { Fragment, useState } from "react";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function InputTodo() {
  const [description, setDescription] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/todos", {
        description,
      });
      setState({ open: true, vertical: 'top', horizontal: 'center'  })

       window.location = "/";
    } catch (error) {}
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5"> PERN todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default InputTodo;
