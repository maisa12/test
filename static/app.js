
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
      if(item.done===false){
      var text = document.createTextNode(item.value);
     b.appendChild(text)
      }
      else{
        var str = document.createElement("strike");
        var strs = document.createTextNode(item.value);
        b.appendChild(str);
        str.appendChild(strs);
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
     async function done(){
      var doneArray ={done: []};
      var checked = document.querySelector(".checkbox"); 
       for(let t=0; t<checked.children.length; t++){
         if(checked.children[t].firstChild.checked == true){
        doneArray.done.push(checked.children[t].firstChild.id)
       }
      }
       const response = await fetch("/done", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doneArray)
      }).then(getData());
      
       }
       async function undone(){
        var undoneArray ={undone: []};
        var checked = document.querySelector(".checkbox"); 
         for(let t=0; t<checked.children.length; t++){
           if(checked.children[t].firstChild.checked == true){
          undoneArray.undone.push(checked.children[t].firstChild.id)
         }
        }
         const response = await fetch("/undone", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(undoneArray)
        }).then(getData());
        
         }