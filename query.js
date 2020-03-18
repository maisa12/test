const {Client} = require('pg');

let paperList = async function(){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
         await client.connect();
         console.log("successful");
        const result = await client.query("SELECT * FROM paper");
        return result.rows;    
    }
    catch(e){
        console.log("somthing went wrong")
    }
    finally{
        await client.end()
    }
    return arr;
}
let noteList = async function(paperId){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
        await client.connect();
        console.log("successful");
       const result = await client.query("SELECT * FROM note WHERE paper_id=$1", [paperId]);
       return result.rows;    
   }
   catch(e){
       console.log(e)
   }
   finally{
       await client.end()
   }
}
let deletePaper = async function(id){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
        await client.connect();
        console.log("successful");
        await client.query("DELETE FROM note WHERE paper_id=$1", [id])
        await client.query("DELETE FROM paper WHERE id=$1", [id]);  
   }
   catch(e){
       console.log("something went wrong")
   }
   finally{
       await client.end()
   }

}
let deleteNote = async function(noteid, paperid){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
        await client.connect();
        console.log("successful");
       const result = await client.query("DELETE FROM note WHERE id=$1 AND paper_id=$2", [noteid, paperid]); 
   }
   catch(e){
       console.log("Can't delete this note")
   }
   finally{
       await client.end()
   }
}
let done = async function(noteid, paperid){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
        await client.connect();
        console.log("done");
        const result = await client.query("SELECT done FROM note WHERE id=$1 AND paper_id=$2", [noteid, paperid]);
        await client.query("UPDATE note SET done=$3 WHERE id=$1 AND paper_id=$2", [noteid, paperid, !result.rows[0].done]);
   }
   catch(e){
       console.log("Something went wrong")
   }
   finally{
       await client.end()
   }
}
let addPaper = async function(name){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
        await client.connect();
        console.log("Add paper");
        const result = await client.query("INSERT INTO paper (paper_name) VALUES ($1)", [name]);
   }
   catch(e){
       console.log("Something went wrong")
   }
   finally{
       await client.end()
   } 
}
let addNote = async function(paperid, value){
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'test1'
    });
    try{
        await client.connect();
        console.log("Add paper");
        const result = await client.query("INSERT INTO note (done, note, paper_id) VALUES (false, $1, $2);", [value, paperid]);
   }
   catch(e){
       console.log("Something went wrong")
   }
   finally{
       await client.end()
   } 
}

module.exports.paperList=paperList;
module.exports.noteList=noteList;
module.exports.deletePaper=deletePaper;
module.exports.deleteNote=deleteNote;
module.exports.done=done;
module.exports.addPaper=addPaper;
module.exports.addNote =addNote;