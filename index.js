const express = require('express');
const cors = require('cors');
const pool = require('./db')
const app = express();
const path = require("path");
// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); => for demonstration

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }

//middleware

app.use(cors())
app.use(express.json())

//ROUTES
const PORT = process.env.PORT || 5000;
//create todo
app.post('/todos', async (req,res) =>{
    try {
        console.log(req.body)
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
        
    }
})

//get all todo

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        
    }
})

//update a todo

app.put('/todos/:id', async (req, res) =>{
    console.log(req.params)
    try {
        const {id} = req.params;
        const {description} = req.body;
        const update = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2',[description,id])

        res.json('Update success')
    } catch (error) {
        
    }
})

app.get("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])

        res.json(todo.rows[0])
    } catch (error) {
        
    }
})

//delete a todo

app.delete('/todos/:id', async(req,res) =>{
    console.log(req.params)
    try {
        const {id} = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1',[id])
        
        res.json('Delete Success')
    } catch (error) {
        
    }
})

app.listen(PORT, () =>{
    console.log(`SERVER RUNNING ON PORT ${PORT} `)
})