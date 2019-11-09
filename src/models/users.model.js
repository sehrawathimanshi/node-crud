const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { 
        type: String,
		required: true,
		unique: true
	},
	provider: {
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
	createdAt: {
		type: Date,
		default: new Date()
	},
	modifiedAt: {
		type: Date,
		default: new Date()
    },
    password:{
		type: String,
		required: true
    }
});

module.exports = mongoose.model("user", userSchema);
