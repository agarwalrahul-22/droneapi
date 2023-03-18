const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// import cors from "cors";
// import mongoose from "mongoose";
// import Users from "./models/Users.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);
const User = require("./models/Users")
const Admin = require("./models/Admin")

app.get("/admin", async (req,res) =>{
  const adminData = await Admin.find();
    res.send(adminData);
})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, phone, shopname, address, pincode, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        shopname,
        address,
        pincode,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});
app.post("/user/request", async (req, res) => {
  const { id, pickup, drop, name, email, phone, shopname, address, pincode } =
    req.body;
    const ad = await Admin.find();
    const size = ad.length + 1;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      // res.send({ message: "User already registerd" }); 
      console.log(user);
      const order = {
        pickup: pickup,
        drop: drop,
      }
      user?.Orders.push(order);
      user.save();
      
      const newRequest = new Admin({
        orderId: size,
        email: email,
        name: name,
        phone: phone,
        shopname: shopname,
        address: address,
        pincode: pincode,
        pickup: pickup,
        drop: drop,
      });
      newRequest.save();

    } else {
    }
  });
});
app.get("/user/packagehistory", (req, res) => {
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send(user.Orders);
    } else {
    }
  });
});
app.post("/user/accept", (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      user?.status = "Accepted"
    } else {
    }
  });
});
app.post("/user/deny", (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      user?.status = "Denied"
    } else {
    }
  });
});


app.listen(9002, () => {
  console.log("BE started at port 9002");
});
