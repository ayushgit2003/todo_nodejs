const mongoose = require("mongoose");
// const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/ToDoApp");
const connection = mongoose.createConnection("mongodb+srv://ayush123tripathimt:efPhpMJsPYm3Pg0k@cluster0.3h7hdo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

connection.on("open", () => {
	console.log("MongoDB Connected");
}).on("error", (error) => {
	console.error("MongoDB Connection Error:", error);
});
module.exports = connection;
