const mongoose = require("mongoose");
const db = require("../config/db.js");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});
// userSchema.pre('save', async function () {
// 	try {
// 		var user = this;
// 		const salt = await bcrypt.genSalt(10);
// 		const hashpass = await bcrypt.hash(user.password, salt);
// 		user.password = hashpass;

// 	}
// 	catch (error) {
// 		throw error;
// 	}
// });
async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}
// Middleware function to hash the password before saving
userSchema.pre("save", async function (next) {
	try {
		this.password = await hashPassword(this.password);
		next();
	} catch (error) {
		next(error); // Pass the error to the next middleware/error handler
		throw error;
	}
});

userSchema.methods.comparePassword = async function (userPassword) {
	try {
		const isMatch = await bcrypt.compare(userPassword, this.password);
		return isMatch;
	}
	catch (error) {
	
	}

}

const UserModel = db.model("user", userSchema);

module.exports = UserModel;
