function checkBox(array){
    var chk = document.querySelector(".checkbox");
      var box = document.createElement("input");
      var b = document.createElement("p");
     chk.appendChild(b);
      box.setAttribute("type", "checkbox"); 
      box.value = array;
      b.appendChild(box);
      var text = document.createTextNode(array);
     b.appendChild(text)
   }
   
   class TodoList {
     constructor(){
       this.output=[];
     }
     add(){
       var input = document.querySelector("input");
       if(this.output.filter((x)=>x===input.value).length==0){
       this.output.push(input.value);
      checkBox(input.value);
         input.value="";
       }
       
     }
     delete(){ 
       var del = [];
      var checked = document.querySelector(".checkbox"); 
       for(let t=0; t<checked.children.length; t++){
         if(checked.children[t].firstChild.checked == true){
         del.push(t)
       } 
       }
     var k;
        for(let z=0; z<del.length; z++){
       if(z==0){
         k=del[0]
       }
          else{
            k=del[z]-z
          }
      this.output = this.output.filter((y)=>y!==checked.children[k].firstChild.value);       checked.children[k].remove();
        }
      
     }  
   }
   var array = new TodoList();
   
   