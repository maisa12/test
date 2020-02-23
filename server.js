const express = require('express');
const app = express();
const port = 8000;

app.get('/',(req,res)=>{
  res.sendFile('./index.html',{root: __dirname})
})
app.use('/static', express.static(__dirname+'/static'));
app.listen(port, ()=>console.log(`Server is listening: ${port}`))