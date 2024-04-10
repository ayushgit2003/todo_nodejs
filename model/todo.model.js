const db = require('../config/db');
const mongoose = require("mongoose");
const UserModel =require("../model/user.model")

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
    },
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
    },
    status: {
        type: Boolean,
        required: false,
    }
    
});

const TodoModel = db.model("todo", todoSchema);

module.exports = TodoModel;

