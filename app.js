const express=require("express")
const app=express()
const path=require("path");
app.use(express.static(path.join(__dirname,"Template")));
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"Template","index.html"));
});
app.listen(3000,function(){
    console.log("UP and Runnig..")
});
// const http =require('http');
// const fs = require('fs');

// const server=http.createServer((req,res)=>{
//     if(req.url==='/'){
//         // res.write("Hello");
//         // res.end();
//         fs.readFile('./index.html',null,function(error,data){
//             if(error){
//                 res.write("Erorr");
//             }
//             else{
//                 res.write(data)
//             }
//             res.end();
//         });
//     }
// });
// server.listen(3000);
// console.log('Server Up');