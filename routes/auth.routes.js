const router = require('express').Router()

const authController = require('../controller/auth.controller')

router.post('/auth/login', authController.loginUserByUsername)
router.post("/auth/register", authController.registerUsers);

module.exports = router