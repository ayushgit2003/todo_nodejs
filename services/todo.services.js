const TodoModel = require('../model/todo.model.js');

class TodoService{
    static async createTodo(userId, title, description, status) {
        try {
            const newtodotask = new TodoModel({ userId, title, description, status });
            const savedtodotask = await newtodotask.save();
            return savedtodotask;
        }
        catch(error){
             console.error("Error creating todo Task:", error);
            throw error; 
        }
    }


}
module.exports = TodoService;