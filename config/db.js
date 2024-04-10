const mongoose = require("mongoose");
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/ToDoApp");

connection.on("open", () => {
	console.log("MongoDB Connected");
}).on("error", (error) => {
	console.error("MongoDB Connection Error:", error);
});
module.exports = connection;
