const express = require('express');
const { createTodoSchema, updateTodoSchema } = require('./types');
const { todo } = require('./db');
require('dotenv').config();
// The line require('dotenv').config(); is used to load environment variables from a .env file into process.env in a Node.js application
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.post("/todo", async (req,res) => {
    const createPayload = req.body;
    const parsedPayload = createTodoSchema.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent wrong inputs"
        })
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
    })
    // put it in db

    res.json({
        msg: "Todo Created"
    })

})

app.get("/todos", async (req,res) => {
    const todos = await todo.find()
    res.json({
        todos,
    })
})

app.put("/completed", async (req,res) => {
    const createPayload = req.body;
    const parsedPayload = updateTodoSchema.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent wrong inputs"
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "TODO is marked as completed"
    })
})


app.listen(port, () => {
    console.log(`App listening to port ${port}`);
    console.log(`Visit URL http://localhost:${port}`);
})
