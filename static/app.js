
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
      b.appendChild(box);
      var text = document.createTextNode(item);
     b.appendChild(text)
  }
   }
   var list;
  function getData() {
     fetch("/getpost").then((x)=>x.json()).then((x)=>{
       list = x.note;
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
       del.delete.push(checked.children[t].firstChild.value)
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