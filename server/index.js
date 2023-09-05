const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const nodemailer = require('nodemailer'); 

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.json("User not found");
      } else if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/reset-password", async (req, res) => {
  const { email } = req.body;


  const user = await EmployeeModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }


  const resetLink = `http://your-website.com/reset-password/${user._id}`;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Email could not be sent" });
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ message: "Reset link sent successfully" });
    }
  });
});

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body) 
    .then(employee => res.json(employee))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
