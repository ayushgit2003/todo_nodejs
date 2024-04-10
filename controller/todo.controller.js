const TodoService = require('../services/todo.services');
const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {
	try {
		const { userId, title, description, status } = req.body;
        const successRes = await TodoService.createTodo(userId, title, description, status);
		res.json({ success: "TodoList created Successfully", successRes});
		console.log("TodoList created Successfully");
	} catch (error) {
			// Other errors, send internal server error response
			console.error("Error registering user:", error);
			res.status(500).json({
				error: "Internal Server Error",
			});
		 
	}
};