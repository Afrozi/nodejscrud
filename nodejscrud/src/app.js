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
    res.render("edit",{chats});
})

// update route
app.put("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let { msg:newmsg } = req.body;
    console.log(newmsg);
    let updateChat =  await chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators: true, new: true});
    console.log(updateChat);
    res.redirect("/chats");
})

//destroy router

app.delete("/chats/:id", async(req, res) => {
    let { id } = req.params;
    let chatDelete = await chat.findByIdAndDelete(id);
    console.log(chatDelete);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send('hello world');
})
app.listen(port,(err)=>{
    console.log("connected");
});