const app = require('./app.js');
const db = require('./config/db.js');
const UserModel = require('./model/user.model.js');
const TodoModel = require('./model/todo.model.js');

const port = 3000;

app.get('/',(req,res)=>{
     res.send("Hello World!!!")
})

app.listen(port,()=>{
     console.log(`Server Listening on Port http://localhost:${port}`);
})