const UserModel = require('../model/user.model');
const UserController = require('../controller/user.controller');
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(email, passwoord) {    
        try {
            const newUser = new UserModel({ email, password });
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch (error) {
            console.error("Error registering user:", error);
            throw error;      
        }
    }
    
    static async checkUser(email) {
        try {
            // const checkResult=await UserModel({ email });
            // const checkResult=await UserModel.findOne({ email });
            const checkResult= await UserModel.findOne({email}).select('_id');
            return checkResult;
        }
        catch (error) {
            console.error("Error registering user:", error);
            throw error; 
        }
    }
    
    static async generateToken(tokenData, secretKey, jwt_expire) {
        
        return await jwt.sign(tokenData,"secretKey", {expiresIn: jwt_expire});
    }

}
module.exports = UserService;


