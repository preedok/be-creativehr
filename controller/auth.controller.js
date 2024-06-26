const db = require("../connection");
const model = require("../models/profile.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  try {
    const {
      body: { email, password },
    } = req;

    if (!(email && password)) {
      res.status(400).json({
        status: false,
        message: "Bad input",
      });
      return;
    }

    const checkEmail = await model.getProfileByEmail(email);
    if (!checkEmail?.length) {
      res.status(400).json({
        status: false,
        message: "Email Salah",
      });
      return;
    }

    // Load hash from your password DB.
    bcrypt.compare(password, checkEmail[0]?.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { ...checkEmail[0], password: null },
          process.env.PRIVATE_KEY
        );

        res.json({
          status: true,
          message: "Get data success",
          data: checkEmail,
          token,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Password Salah",
        });
        return;
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error not found",
    });
  }
}

async function insertUsers(req, res) {
  try {
    const { email, password, fullname, nohp, username, alamat, photo, role } = req.body;

    // Pastikan minimal email, password, dan fullname terisi
    if (!(email && username && password && fullname)) {
      throw new Error("Email, password, and fullname are required");
    }

    // Hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    // Persiapkan payload untuk addUser
    const payload = {
      email,
      password: hash,
      fullname,
      nohp,
      username,
      alamat,
      photo,
      role
    };

    // Tambahkan pengguna ke database
    const query = await model.addUser(payload);

    // Kirim respons berhasil
    res.json({
      status: true,
      message: "Success insert data",
      data: payload,
    });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(400).json({
      status: false,
      message: error.message, // Kirim pesan error ke client
    });
  }
}


module.exports = {
  loginUser,
  insertUsers
};
