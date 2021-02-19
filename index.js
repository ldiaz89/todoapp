const express = require('express');
const cors = require('cors');
const pool = require('./db')
const app = express();

//middleware

app.use(cors())
app.use(express.json())

//ROUTES
const PORT = process.env.PORT || 3001;
//create todo
app.post('/todos', async (req,res) =>{
    try {
        console.log(req.body)
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(err.message)
        
    }
})

//get all todo

app.get('/', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        
    }
})

//update a todo

app.put('/:id', async (req, res) =>{
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

app.delete('/:id', async(req,res) =>{
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