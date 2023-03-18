const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

const AdminSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  shopname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  drop: {
    type: String,
    required: true,
  },
  dateoforder: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    default: "Pending"
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
