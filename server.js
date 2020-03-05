const express = require('express');

const app = express();
const port = 8000;
var bodyParser = require('body-parser');
var id = 0;
var todoList = [];
const papers =[
  {
      name: 'Paper N1',
      id:1,
      notes: [{value:"test1", id:0, done: true, check:false}, {value:"test2", id:1, done: false, check:false}]
  },
  {
      name: 'Paper N2',
      id:2,
      notes: [{value:"test1", id:0, done: true, check:false}, {value:"test2", id:1, done: false, check:false}]
  }
] 
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
app.get('/papers',(req,res)=>{
  var array = [];
  papers.map(x=>array.push({name:x.name, id:x.id}))
  res.send(array)
})
app.get('/papers/:id',(req,res)=>{
  var note = papers.filter(x=>x.id===Number(req.params.id));
  if(note.length===0){
    res.send("This paper doesn't exist")
  }
  else{
  res.send(note[0].notes)
  }
})
app.post('/delete', jsonParser, function (req, res) {
 todoList = todoList.filter(x=>req.body.delete.indexOf(x.id.toString())===-1)
})
app.post('/done', jsonParser, function (req, res) {
  todoList.filter(x=>req.body.done.indexOf(x.id)!==-1).forEach(x=>x.done = true);
 })
 app.post('/undone', jsonParser, function (req, res) {
  todoList.filter(x=>req.body.undone.indexOf(x.id)!==-1).forEach(x=>x.done = false);
})
 
app.use('/static', express.static(__dirname+'/static'));
app.use('/templates', express.static(__dirname+'/templates'));
app.listen(port, ()=>console.log(`Server is listening: ${port}`))