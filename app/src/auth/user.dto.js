module.exports = class AuthDTO {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password
    }
}