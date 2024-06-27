const models = require("../models/auth.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");


async function loginUsersByUsername(req, res) {
  try {
    const {
      body: { username, password },
    } = req;
    if (!(username && password)) {
      res.status(400).json({
        status: false,
        message: "Bad input",
      });
      return;
    }
    const checkUser = await models.getUsersByUsername(username);
    if (!checkUser?.length) {
      res.status(400).json({
        status: false,
        message: "Username not found",
      });
      return;
    }
    bcrypt.compare(password, checkUser[0]?.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { ...checkUser[0], password: null },
          process.env.PRIVATE_KEY
        );

        res.json({
          status: true,
          message: "Login successful",
          data: checkUser,
          token,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Incorrect password",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error occurred",
    });
  }
}

async function registerUsers(req, res) {
  try {
    const { password, fullname, username } = req.body;
    if (!(username && password && fullname)) {
      throw new Error("Username, password, and fullname are required");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const payload = {
      password: hash,
      fullname,
      username
    };
    const query = await models.register(payload);
    res.json({
      status: true,
      message: "Success insert data",
      data: payload,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
}


module.exports = {
  loginUsersByUsername,
  registerUsers
};
