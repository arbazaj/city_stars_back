const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	role: {
		type: String,
		required: true
    },
    email: { 
        type: String,
        required: true
    },
	name: {
		type: String,
		required: true,
	},
	gender: {
		type: String
    },
    provider:{
        type: String,
        required: true
    },
	createdAt: {
		type: Date,
		default: new Date()
	},
	modifiedAt: {
		type: Date,
		default: new Date()
    },
    imageUrl:{
        type: String
    },
    accessToken:{
        type: String
    }
});

module.exports = mongoose.model("user", userSchema);
