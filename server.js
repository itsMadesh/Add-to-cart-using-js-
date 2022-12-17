const express = require("express")
const app = express();
const MongoDBClient = require("./MongoDBClient")
const { ObjectID } = require("bson");


app.use(express.static("public"));

app.use(express.json());

app.post("/add",async (req,res)=>{
    try{
        console.log("data:",req.body);
        const result = await MongoDBClient.items().insertOne(req.body);
        res.json({message:"Item added successfully"});
    }
    catch(e){
        console.log(e);
        res.status(401).json({message:"Unexpected error occured"});
    }
});


app.get("/items",async (req,res)=>{
    try{
        const result = await MongoDBClient.items().find({}).toArray();
        console.log(result);
        res.status(200).json(result);
    }
    catch(e){
        console.log(e);
        res.status(401).json({message:"Unexpected error occured"});
    }
});

app.get("/user/cart",async (req,res)=>{
    try{
        const result = await MongoDBClient.users().find({}).project({_id:0,cart:1}).toArray();
        res.status(200).json(result[0].cart);
    }
    catch(e){
        console.log(e);
        res.status(401).json({message:"Unexpected error occured"});
    }
});


app.post("/user/cart",async (req,res)=>{
    try{
        const user_id="639c951b447e99e542b255a5"
        console.log(req.body.cart);
        const result = await MongoDBClient.users().updateOne({"_id":ObjectID(user_id)},{$set:{cart:req.body.cart}});
        console.log(result);
        res.status(200).json(result);
    }
    catch(e){
        console.log(e);
        res.status(401).json({message:"Unexpected error occured"});
    }
});


(async function () {
    await MongoDBClient.connect();
    const port = 9000;
    app.listen(port, async function (err) {
        if (err) throw (err);
        console.log(`App running in http://localhost:${port}`);
    })

})();