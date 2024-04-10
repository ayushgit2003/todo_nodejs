const UserService = require("../services/user.services");
const UserModel = require("../model/user.model");
//  async function register(req, res, next)  {
//     try {
//         const { email, password } = req.body;
//         const successRes = await UserService.registerUser(email, password);
//         res.json({ success: "User Registered Succcessfully", });
//     }
//     catch (error) {
//         throw error;
//     }
// };
exports.register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const successRes = await UserService.registerUser(
			email,
			password
		);
		res.json({ success: "User Registered Successfully" });
		console.log("User Registered Succcessfully:", email);
	} catch (error) {
		if (
			error.name === "MongoServerError" &&
			error.code === 11000
		) {
			// Duplicate key error, handle it
			const duplicatedKey = error.keyValue.email;
			res.status(400).json({
				error: `Email '${duplicatedKey}' is already registered.`,
			});
			console.log(
				`User '${duplicatedKey}' is trying to register but already registered`
			);
		} else {
			// Other errors, send internal server error response
			console.error("Error registering user:", error);
			res.status(500).json({
				error: "Internal Server Error",
			});
		}
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await UserService.checkUser(email);
		console.log("------user----");
		console.log(user);

		if (!user) {
			const notExistError = new Error(
				"User don't exist"
			);
			console.error(
				"An error occurred:",
				notExistError
			);
			res.status(404).json({
				error: notExistError,
			});
		}
		const isMatch = await user.comparePassword(password);
		if (isMatch === false) {
			const invalidPasswordError = new Error(
				"Password Invalid"
			);
			console.error(
				"An error occurred:",
				invalidPasswordError
			);
			res.status(404).json({
				error: invalidPasswordError,
			});
		}

		let tokenData = { _id: user._id, email: user.email };

		const token = await UserService.generateToken(
			tokenData,
			"secretkey",
			"1h"
		);

		res.status(200).json({
			token: token,
			msg: "Logged in successfully",
		});
		console.log(email, ": Logged in Successfully");
	} catch (error) {
		// Other errors, send internal server error response
		console.error("Error logging user:", error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};
