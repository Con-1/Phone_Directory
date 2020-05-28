const express=require("express");
const path=require("path"); 
const flash = require("express-flash");
const session = require("express-session");
const pg=require('pg');
const {pool}=require("./dbconfig");
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"Views")));
app.get("/",(req,res)=>{
    pool.query('SELECT * FROM phonebook',(err,result)=>{
        if (err) {
            console.log("Error Happened"+err);
          }
          console.log(result.rows.length);
        }
    );
    res.render('index');
});
app.get("/add",(req,res)=>{
    res.render('add');
});
app.get("/phone_dic",(req,res)=>{
    res.render('phone_dic');
});
app.get("/us",(req,res)=>{
    res.render('us');
});
app.post("/add",(req,res )=>{
    let{name,dob,ph1,ph2,ph3,ph4,ph5,em1,em2,em3}=req.body;
    console.log("OK");
    console.log({
        name,dob,ph1,ph2,ph3,ph4,em1,em2,em3
    });
    let errors = [];
    if(ph1==ph2 || ph1==ph3 || ph1==ph4 || ph1==ph5){
        errors.push({message: "You are saving Phone No. 1 Twice"})
    }
    else if(ph2!='' && ph2==ph3 || ph2==ph4 || ph2==ph5){
        errors.push({message: "You are saving Phone No. 2 Twice"})
    }
    else if(ph3!='' && ph3==ph4 || ph3==ph5){
        errors.push({message: "You are saving Phone No. 3 Twice"})
    }
    else if(ph4!='' && ph4==ph5){
        errors.push({message: "You are saving Phone No. 4 Twice"})
    }
    if(em1!='' && em1==em2 || em1==em3){
        errors.push({message: "You are saving Emaiil ID. 1 Twice"})
    }
    else if(em2!='' && em2==em3){
        errors.push({message: "You are saving Email ID. 2 Twice"})
    } 
    if(errors.length>0){
        res.render("add",{errors});
    }
    else{
        pool.query('SELECT * FROM phonebook WHERE Ph1 = $1 OR Ph1 =$2 OR Ph1=$3 OR Ph1 =$4 OR Ph1 =$5 OR Ph2 = $1 OR Ph2 =$2 OR Ph2=$3 OR Ph2 =$4 OR Ph2 =$5 OR Ph3 = $1 OR Ph3 =$2 OR Ph3=$3 OR Ph3 =$4 OR Ph3 =$5 OR Ph4 = $1 OR Ph4 =$2 OR Ph4=$3 OR Ph4 =$4 OR Ph4 =$5 OR Ph5 = $1 OR Ph5 =$2 OR Ph5=$3 OR Ph5 =$4 OR Ph5 =$5 OR Em1 =$6 OR Em1=$7 OR Em1=$8 Em2 =$6 OR Em2=$7 OR Em2=$8 OR Em3 =$6 OR Em3=$7 OR Em3=$8' ,[ph1,ph2,ph3,ph4,ph5,em1,em2,em3],(err,results)=>{
            if(err){
                throw err
            }
            if(results.rows.length>0){
                errors.push({message:"Phone No. Or Email already in Database"})
                res.render("add",{errors});
            }
            else{
                pool.query('INSERT INTO phonebook (Name,DOB,Ph1,Ph2,Ph3,Ph4,Ph5,Em1,Em2,Em3) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING Name',[name,dob,ph1,ph2,ph3,ph4,ph5,em1,em2,em3],(err,results)=>{
                    if(err){
                        throw err;
                    }                       
                        res.redirect("add");
                });
            }
        });
    }
});

app.listen(4000,()=>{
    console.log("Started");
});