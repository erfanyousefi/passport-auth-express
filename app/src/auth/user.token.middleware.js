
const UserModel = require("app/src/auth/user.model");
const autoBind = require("auto-bind");
class rememberLogin {
    constructor(){
        autoBind(this)
    }
    login(req, res, next) {
        if (!req.isAuthenticated()) {
            const token = req.signedCookies['user-token'];
            if (token) {
                return this.autoLogin(token, req, next);
            }
        }
        next();
    }
    autoLogin(token, req, next) {
        UserModel.findOne({
            token
        }, (err, user) => {
            if (err) {
                console.log("Err : ", err);
            }
            if (user) {
                req.login(user, err => {
                    if (err){
                        console.log(err);
                        next(err);
                    }
                    next()
                })
            }else{
                next();
            }
        })
    }
    
}
module.exports = new rememberLogin();