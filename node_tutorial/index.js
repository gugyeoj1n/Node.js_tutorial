const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://gugyeoj1n:woojin9821@nodetest.0xrb2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB Connected. . ."))
  .catch(err => console.log("Something went wrong. . ."))


app.get('/', (req, res) => {
  res.send('This is Node.js Server with Express includes MongoDB.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})