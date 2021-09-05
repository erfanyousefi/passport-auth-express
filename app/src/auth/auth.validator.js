const { body } = require('express-validator')

class AuthValidator {
    login() {
        return [
            body('email').isEmail().withMessage('فرمت وارد شده ی ایمیل صحیح نمیباشد'),
            body('password').isLength({ min: 8, max: 16 }).withMessage("رمز عبور باید بین 8 الی 16 شناسه باشد")
        ]
    }
    register() {
        return [
            body("name").notEmpty().withMessage("نام و نام خانوادگی را وارد کنید"),
            body("email").normalizeEmail().isEmail().withMessage('فرمت وارد شده ی ایمیل صحیح نمیباشد'),
            body("password").isLength({ min: 6, max: 16 }).withMessage("رمز عبور باید بین 8 الی 16 شناسه باشد"),
            body("confirmpassword").custom((value, { req }) => {
                if (req.body.password !== value) {
                    throw new Error("رمز عبور و تکرار آن برابر نمیباشند")
                }
                return true
            }),
        ]
    }
}
module.exports = new AuthValidator();