const Strategy = require("passport-local").Strategy;
const UserModel = require("app/src/auth/user.model");
const bcrypt = require("bcrypt")
const passport = require("passport");
const UserRole = require("app/src/auth/user.role")
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use("local.login", new Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    UserModel.findOne({ email }, (err, user) => {
        console.log(err);
        if (err) {
            return done('کابری یافت نشد', null);
        }
        if (user) {

            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done("نام کاربری یا رمز عبور اشتباه میباشد", null);
            }
        } else {
            return done("کاربری یافت نشد", null);
        }
    });
}))

passport.use("local.register", new Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req, email, password, done) => {
    UserModel.findOne({
        email
    }, async(err, user) => {
        if (err) {
            done("ثبت نام انجام نشد، دوباره تلاش کنید", null);
        }
        if (user) {
            done("اکانتی با این ایمیل یافت شد لطفا ایمیل دیگری را وارد کنید", null);
        } else {
            if (password === req.body.confirmpassword) {
                let salt = bcrypt.genSaltSync(15);
                let hash = bcrypt.hashSync(password, salt);
                UserModel.create({
                    name: req.body.name,
                    email,
                    password: hash,
                    role : UserRole.USER
                }, (err, user) => {
                    if (err) {
                        done("ثبت نام انجام نشد لطفا دوباره سعی کنید", null);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        done("ثبت نام انجام نشد لطفا دوباره سعی کنید", null);
                    }
                });
            } else {
                done("رمز عبور و تکرار آن برابر نمیباشند لطفا به طور یکسان وارد کنید", null);
            }
        }

    })
}));