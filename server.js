const express = require('express');
const app = express();
const port = 8000;

app.get('/',(req,res)=>{
  res.sendFile('./templates/index.html',{root: __dirname})
})
app.use('/static', express.static(__dirname+'/static'));
app.use('/templates', express.static(__dirname+'/templates'));
app.listen(port, ()=>console.log(`Server is listening: ${port}`))