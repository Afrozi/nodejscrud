const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shardhamam")
.then(()=>{
   console.log('connected');
}).catch((err)=>{
    console.log(err);
});
const newschema = mongoose.Schema({
    form: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLenght: 50
    },
    created_at: {
        type: Date,
        required: true
    },
});

const chat = mongoose.model("chat",newschema);
let chats = ([
    {
    form: "neha",
    to: "priya",
    msg: "send your exam",
    created_at: new Date(),
},
    {
    form: "neha",
    to: "priya",
    msg: "send your exam",
    created_at: new Date(),
},
    {
    form: "neha",
    to: "priya",
    msg: "send your exam",
    created_at: new Date(),
},
    {
    form: "neha",
    to: "priya",
    msg: "send your exam",
    created_at: new Date(),
},
]);
chat.insertMany(chats);




const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const methodoverride = require("method-override");
app.set("views",path.join(__dirname,"../views"));
app.set("view engine","ejs");
require("./db/connect");
const chat = require("./model/model");
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
//index route
app.get("/chats", async (req,res)=>{
    let chats = await chat.find();
    // console.log(chats);
    res.render("index",{chats});
})

//new Route
app.get("/chats/new",(req,res)=>{
    res.render("insert");
})

// create route
app.post("/chats",(req,res)=>{
  let {form,to,msg} = req.body;
  let newchat = new chat({
    form:form,
    to:to,
    msg:msg,
    created_at:new Date()
  });
  newchat.save().then(()=>{
    console.log("chat was saved");
  }).catch((err)=>{
    console.log(err);
  })
  res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chats = await chat.findById(id);
    res.render("edit",{chat});
})

// update route
app.put("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let { msg:newmsg } = req.body;
    console.log(newmsg);
    let updatedChat = await chat.findByIdAndUpdate(
        id,
        { msg: newmsg },
        { runValidators: true, new: true }
      );
      console.log(updatedChat);
      res.redirect("/chats");
  
})

app.get("/",(req,res)=>{
    res.send('hello world');
})
app.listen(port,(err)=>{
    console.log("connected");
});