const router = require('express').Router()
const AuthRoutes = require("app/src/auth/auth.routes")
const DashboardRoutes = require("app/src/dashboard/index")
const RedirectWithAuth = require("app/src/RedirectWithAuth")
router.use('/auth', RedirectWithAuth.GoToIndexIfIsAuth, AuthRoutes)
router.use('/dahsboard', RedirectWithAuth.GoToAuthIfNotAuth, DashboardRoutes)
module.exports = router