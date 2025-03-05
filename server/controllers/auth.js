const User = require('../modles/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({msg: "User already exists"});
        }

        user = new User({name, email, password});
        await user.save();

        const payload = { userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token})
    } catch (error){
        res.status(500).json({msg: 'Server Error'});
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({msg: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

        const payload = {userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token})
    }catch (err){
        res.status(500).json({msg: 'Server Error.'})
    }
}