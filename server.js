const express = require('express');

const app = express();
const port = 8000;
var bodyParser = require('body-parser');
var todoList = {note: ["test1", "test2", "test3"]};
var jsonParser = bodyParser.json();
app.get('/',(req,res)=>{
  res.sendFile('./templates/index.html',{root: __dirname})
})
app.get('/getpost',(req,res)=>{
  res.send(JSON.stringify(todoList))
})
app.post('/post', jsonParser, function (req, res) {
  todoList.note.push(req.body.notes)
})
app.post('/delete', jsonParser, function (req, res) {
  for(let d of req.body.delete){
  todoList.note=todoList.note.filter((x)=>x!==d);
  }
})
app.use('/static', express.static(__dirname+'/static'));
app.use('/templates', express.static(__dirname+'/templates'));
app.listen(port, ()=>console.log(`Server is listening: ${port}`))