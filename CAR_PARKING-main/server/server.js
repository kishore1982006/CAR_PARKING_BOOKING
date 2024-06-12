const mongoose = require('mongoose');
const User = require("./userSchema");
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

async function connecttodb(){
    try{
        const url = ('mongodb+srv://Kishore:1234@cluster0.s7j1eea.mongodb.net/CarParkingDB?retryWrites=true&w=majority&appName=Cluster0')
        await mongoose.connect(url)
        console.log('connected to database successfully');
        const port = process.env.PORT || 3000;
        app.listen(port,function(){
            console.log('server started at 3000....');
        })
    }
    catch(error){
        console.log("cannot connect to database");
        console.log(error)
    }
}
connecttodb();


//USER
app.get('/getuser',async function(req,res){
    try{
      const userdata=await User.find();
      res.status(200).json(userdata);
    }
    catch(error){
      res.status(500).json({
      "status":"failure",
      "message":"couldn't fetch",
      "error": error
  })
      }
  })


//Create-Account
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).send({ message: 'All fields are required' })
    }
    User.findOne({ $or: [{ name: username }, { email: email }] })
      .then((existingUser) => {
        if (existingUser) {
          if (existingUser.email === email) {
            res.status(400).json({ message: 'Email already exists' })
          } else {
            res.status(400).json({ message: 'Username already exists' })
          }
        } else {
          User.create({ username, email, password })
            .then((user) => {
              res
                .status(201)
                .json({ message: 'User created successfully', userId: user._id })
            })
            .catch((err) => res.status(500).json({ message: err.message }))
        }
      })
      .catch((err) => res.status(500).json({ message: err.message }))
  })
  


// login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email, password })
      if (user) {
        res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email,
          message: 'User logged in successfully'
        })
      } else {
        res.status(401).json({
          message: 'Incorrect username or password'
        })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })