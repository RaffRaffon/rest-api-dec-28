const http = require('http');
const url = require('url');
const fs = require('fs');
http.createServer((req, res) => {
    
    
    if (req.method === 'GET' && req.url.includes('/user')){
        const query = url.parse(req.url,true).query
        readFile((users) =>{
            // const users=JSON.parse(content)
            users.push(query.username)
            saveFile(users, ()=>{
                res.write('user created')
                res.end();
            })
        }); 
    }
     else if (req.method === 'GET' && req.url.includes('/show')){
        readFile((users) =>{
            res.write(JSON.stringify(users));
            res.write("lalala")
            res.end()
        });
    }

    if (req.method === 'GET' && req.url.includes('/delete')){
        const query = url.parse(req.url,true).query
        const userNameToDelete=query.username
        readFile((users) =>{
            // const users=JSON.parse(content)
            users.splice(users.indexOf(userNameToDelete),1)
            saveFile(users, ()=>{
                res.write('user deleted')
                res.end();
            })
        });
    }
    if (req.method === 'GET' && req.url.includes('/edit')){
        const query = url.parse(req.url,true).query
        const userNameToEdit=query.username
        const newUserName=query.newUsername
        readFile((users) =>{
            // const users=JSON.parse(content)
            // http://localhost:4000/edit?username=evyatar&newUsername=NEW_USERNAME
            users[users.indexOf(userNameToEdit)]=newUserName
            saveFile(users, ()=>{
                res.write('user edited')
                res.end();
            })
        });
    }
}).listen(4000);

function saveFile(content,cb){
    fs.writeFile('./src/db.json',JSON.stringify(content),cb)
}
function readFile(cb){
    fs.readFile('./src/db.json', {encoding: 'utf8'},(err, content) => {
        cb(JSON.parse(content))
    });
}

console.log('Listening on: http://localhost:4000'); 



// http://localhost:4000/delete?username=raphael