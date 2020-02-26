
 
function checkBox(array){
  var chk = document.querySelector(".checkbox");
  var first = chk.firstElementChild;
  while (first) { 
    first.remove(); 
    first = chk.firstElementChild; 
} 
  for(let item of array){
      var box = document.createElement("input");
      var b = document.createElement("p");
     chk.appendChild(b);
      box.setAttribute("type", "checkbox"); 
      box.value = item;
      box.id = item.id;
      b.appendChild(box);
      var button = document.createElement("button");
      button.id = item.id;
      if(item.done===false){
      var text = document.createTextNode(item.value+"  ");
     b.appendChild(text)
     b.appendChild(button)
     var doneText = document.createTextNode("done");
     button.appendChild(doneText)
     button.addEventListener("click",function(){
      var doneArray ={done: []};
    doneArray.done.push(button.id)
        fetch("/done", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doneArray)
      }).then(getData());
      
       })
      }
      else{
        var str = document.createElement("strike");
        var strs = document.createTextNode(item.value+"  ");
        b.appendChild(str);
        str.appendChild(strs);
        b.appendChild(button)
        var undoneText = document.createTextNode("undone");
        button.appendChild(undoneText)
         button.addEventListener("click",function(){
      var undoneArray ={undone: []};
    undoneArray.undone.push(button.id)
        fetch("/undone", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(undoneArray)
      }).then(getData());
      
       })
      }
  }
   }
   var list;
  function getData() {
     fetch("/getpost").then((x)=>x.json()).then((x)=>{
       list = x;
       checkBox(list);
    })
  }
  getData();
   async function postData() {
    var input = document.querySelector("input");
    var list = {notes: input.value}
    const response = await fetch("/post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    }).then(input.value = "").then(getData());
  }
  async function delte(){
    var del ={delete: []};
    var checked = document.querySelector(".checkbox"); 
     for(let t=0; t<checked.children.length; t++){
       if(checked.children[t].firstChild.checked == true){
       del.delete.push(checked.children[t].firstChild.id)
     }
    }
     const response = await fetch("/delete", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(del)
    }).then(getData());
    
     }