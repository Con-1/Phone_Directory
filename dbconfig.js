const{Pool}=require("pg");
const connectionString ='postgresql://postgres:123@localhost:5432/Phone_Dir';
const pool=new Pool({
    connectionString:connectionString
});

module.exports={pool};