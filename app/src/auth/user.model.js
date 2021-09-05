const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const UserRole = require("app/src/auth/user.role")
const UserSchema = new Schema({
    name: { type: String, default: undefined },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: undefined },
    role: { type: String, default: UserRole.USER },
    token : {type : String, default : undefined}
})
UserSchema.methods.validPassword = async function(password) {
    return await bcrypt.compareSync(password, this.password)
}
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel