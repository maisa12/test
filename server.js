const express = require('express');

const app = express();
const port = 8000;
var bodyParser = require('body-parser');
var id = 0;
var todoList = [];
var jsonParser = bodyParser.json();
app.get('/',(req,res)=>{
  res.sendFile('./templates/index.html',{root: __dirname})
})
app.get('/getpost',(req,res)=>{
  res.send(JSON.stringify(todoList))
})
app.post('/post', jsonParser, function (req, res) {
  todoList.push({id: id, value: req.body.notes, done: false})
  id++;
})
app.post('/delete', jsonParser, function (req, res) {
 todoList = todoList.filter(x=>req.body.delete.indexOf(x.id.toString())===-1)
})
app.post('/done', jsonParser, function (req, res) {
  todoList.filter(x=>req.body.done.indexOf(x.id.toString())!==-1).forEach(x=>x.done = true);
  })
 app.post('/undone', jsonParser, function (req, res) {
  todoList.filter(x=>req.body.undone.indexOf(x.id.toString())!==-1).forEach(x=>x.done = false);
})
 
app.use('/static', express.static(__dirname+'/static'));
app.use('/templates', express.static(__dirname+'/templates'));
app.listen(port, ()=>console.log(`Server is listening: ${port}`))