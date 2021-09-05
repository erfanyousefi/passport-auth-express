const AppController = require("app/src/app.controller");
const passport = require("passport");
module.exports = class AuthService extends AppController {
    login(req, res, next) {
        passport.authenticate("local.login", {
            passReqToCallback: true
        }, (err, user) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: err || "ورود به حساب کاربری انجام نشد، دوباره سعی کنید"
                });
            }
            if (user) {
                req.login(user, err => {
                    if (err) {
                        //error handler
                        return res.status(400).json({
                            status: 400,
                            success: false,
                            message: err || "ورود به حساب کاربری انجام نشد، دوباره سعی کنید"
                        });
                    }
                    if (user) {
                        //login process ....
                        const token = this.jwtGenerator(user._id, user.email);
                        this.setCookie(res, token)
                        user.token = token;
                        user.save();
                        return res.status(200).json({
                            status: 200,
                            success: true,
                            token
                        })
                    }
                })
            }
        })(req, res, next)
    }
    register(req, res, next) {
        passport.authenticate("local.register", (err, user) => {
            console.log(err);
            if (err) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: err || "ثبت نام انجام نشد لطفا دوباره سعی کنید"
                })
            }
            if (user) {
                //signup process ....
                const token = this.jwtGenerator(user._id, user.email);
                this.setCookie(res, token)
                user.token = token;
                user.save();
                return res.status(200).json({
                    status: 201,
                    success: true,
                    token
                })
            }
        })(req, res, next)
    }
}