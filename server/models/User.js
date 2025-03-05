const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Creating User Schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
});

// Pre-save Hook for Password Hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

module.exports = mongoose.model('User', userSchema);
