const { UserSchema } = require("../schemas");
const moment = require("moment");
const mongoose = require("mongoose");

async function registerUser(item) {
  var user = new UserSchema();

  user.name = item.name;
  user.email = item.email;
  user.role = item.role;

  user.setPassword(item.password);
  try {
    await user.save();
    return user.generateJwt();
  } catch (err) {
    console.log("error code : ", err.code);
    throw new Error("Email Id already exists");
  }
}


async function getUserProfile(req) {
  return  UserSchema
      .findById(req.payload._id)
    
}

module.exports = {
  registerUser,
  getUserProfile
};
