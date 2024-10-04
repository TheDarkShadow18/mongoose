const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js")
const methodOverride=require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("Connection Successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// let chat1=new Chat({
//     from:"Adarsh",
//     to:"Ayush",
//     msg:"Hello bro How are you?",
//     created_at: new Date()
// });
// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.log(err);
// })


app.get("/",(req,res)=>{
    res.send("On root node");
})
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    // res.send("Working!!!");
    res.render("index.ejs",{chats});
})
//New Route
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at: new Date()
    })
    newChat.save().then(res=>{
        console.log(newChat);
    }).catch(err=>{
        console.log(err);
    });
    res.redirect("/chats");
    
})

//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{
        runValidators:true,
        new:true
    });
    console.log(updatedChat);
    res.redirect("/chats"); 
})

//Destroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let delChat=await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
    
})
let port=8080;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
    
})