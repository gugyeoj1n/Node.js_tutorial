const express = require('../node_modules/express')
const app = express()
const port = 5000
const bodyParser = require('../node_modules/body-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const cookieParser = require('../node_modules/cookie-parser')
const { auth } = require('./middleware/auth')

const mongoose = require('../node_modules/mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected. . ."))
  .catch(err => console.log("Something went wrong. . ."))
  // IP 바뀔 때마다 몽고DB 가서 바꾸는 거 잊지 말기


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('This is Node.js Server with Express includes MongoDB :D')
})

/// #################### user route ####################

app.post('/api/users/register', (req, res) => { // 회원가입
  const user = new User(req.body)
  user.save(( err, userInfo ) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.post('/api/users/login', (req, res) => { // 로그인
  User.findOne({ email: req.body.email }, ( err, user ) => {
    if ( !user ) {
      return res.json({
        loginSuccess: false,
        message: "No user matches this email."
      })
    }
    user.comparePassword(req.body.password, ( err, isMatch ) => {
      if ( !isMatch ) return res.json({ loginSuccess: false, message: "Wrong password."})
      user.gerToken(( err, user ) => {
        if (err) return res.status(400).send(err)
        res.cookie("login_token", user.token).status(200).json({ loginSuccess: true, userId: user._id})
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, ( err, user ) => {
    if ( err ) return res.json({ success: false, err })
    return res.status(200).send({ success: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/hello', (req, res) => {
  res.send("HELLO")
})