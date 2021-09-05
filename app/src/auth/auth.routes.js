const router = require('express').Router()
const AuthController = require('app/src/auth/auth.controller');
const AuthValidator = require("app/src/auth/auth.validator")
router.post('/register', AuthValidator.register(), AuthController.register)
router.post('/login', AuthValidator.login(), AuthController.login)
module.exports = router