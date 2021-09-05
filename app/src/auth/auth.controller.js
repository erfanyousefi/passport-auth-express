
const AppController = require('app/src/app.controller')
const AuthService = require('app/src/auth/auth.service')
const {validationResult} = require("express-validator")
const authService = new AuthService();
let errorList = {}
class AuthController extends AppController {
    login(req, res, next) {
        errorList = {}
        const result = validationResult(req)
        if (result.isEmpty()) {
            authService.login(req, res, next)
        } else {
            this.errorHandler(result.errors, errorList)
            res.status(401).json({
                status: 401,
                success: false,
                messages: errorList
            })
        }
    }
    register(req, res, next) {
        errorList = {}
        const result = validationResult(req)
        if (result.isEmpty()) {
            authService.register(req, res, next)
        } else {
            this.errorHandler(result.errors, errorList)
            res.status(401).json({
                status: 401,
                success: false,
                messages: errorList
            })
        }
    }
}
module.exports = new AuthController()