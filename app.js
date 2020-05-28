const express=require("express");
const path=require("path"); 
const pg=require('pg');
const {pool}=require("./dbconfig");
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"Views")));
app.get("/",(req,res)=>{
    // pool.query('SELECT * FROM tab',(err,result)=>{
    //     if (err) {
    //         console.log("Error Happened"+err);
    //       }
    //       console.log(result.rows.length);
    //     }
    // );
    res.render('index');
});
app.get("/add",(req,res)=>{
    res.render('add');
});

app.listen(4000,()=>{
    console.log("Started");
});