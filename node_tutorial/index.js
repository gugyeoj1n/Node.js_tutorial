const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected. . ."))
  .catch(err => console.log("Something went wrong. . ."))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is Node.js Server with Express includes MongoDB :D')
})

app.post('/register', (req, res) => {
  // 회원가입 시 입력되는 정보를 DB에 저장

  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})