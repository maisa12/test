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
  todoList.push({id: id, value: req.body.notes})
  id++;
})
app.post('/delete', jsonParser, function (req, res) {
  for(let d of req.body.delete){
  for(let i = 0; i < todoList.length; i++){
    if(d==todoList[i].id)todoList.splice(i,1)
  }
  }
})
app.use('/static', express.static(__dirname+'/static'));
app.use('/templates', express.static(__dirname+'/templates'));
app.listen(port, ()=>console.log(`Server is listening: ${port}`))