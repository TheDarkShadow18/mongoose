const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
    .then(() => {
        console.log("Connection Successfull");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let chats = [{
    from: "John",
    to: "Wick",
    msg: "Send me Notes",
    created_at: new Date()
}, {
    from: "bob",
    to: "joe",
    msg: "Congrats bro",
    created_at: new Date()
}, {
    from: "alice",
    to: "bob",
    msg: "Help me with that",
    created_at: new Date()
}, {
    from: "john",
    to: "doe",
    msg: "This is my portfolio",
    created_at: new Date()
}, {
    from: "john",
    to: "alice",
    msg: "Are we done with assignments",
    created_at: new Date()
}]
Chat.insertMany(chats);