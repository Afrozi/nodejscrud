const mongoose = require("mongoose");
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
module.exports = chat;