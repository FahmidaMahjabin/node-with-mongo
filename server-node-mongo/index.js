const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const objectId = require("mongodb").ObjectId;
console.log("ObjectId:", objectId)
// user = fahmidaMahjabin
// password = SO0hYMfpjX9WM0ti

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mongodbuser:vwXsfusnMDqyt2sY@cluster0.dfsqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    
    
    // const user = {"name": "eva", "email": "eva@gmail.com"};
    // const result =  userCollection.insertOne(user);
    // console.log("id of the user:", result.insertedId)
    async function run(){
      await client.connect();
      const userCollection = client.db("LogIn").collection("users");
      try{
        app.post("/users", async(req, res) =>{
          // console.log("req:", req)
          const newUser = req.body;
          console.log("new User in server:", newUser)
          const result = await userCollection.insertOne(newUser)
          res.send(result)
          console.log("came in  /users in post method")
          
        })

        app.get("/users", async (req, res) =>{
          const query = {};
          const searchedUsers = userCollection.find(query);
          res.send( await searchedUsers.toArray())
        })
        // delete user
        app.delete("/users/:id", async(req, res) =>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const updatedUsers = await  userCollection.deleteOne(query);
          res.send(updatedUsers)
        })

        // update user
        app.put("/users/:id", async(req, res) =>{
          const id = req.params.id;
          const updateUser = req.body;
          console.log(updateUser);
          const filter = {_id: ObjectId(id)};
          const result = await userCollection.updateOne(filter,{$set:updateUser}, {upsert: true} );
          res.send(result)
        })
      }
      finally{}
    
  }
  run().catch(console.dir)
    
app.get("/", (req, res) =>{
    res.send("It's mongoDB")
})
app.listen(port, ()=> console.log("port is running") )