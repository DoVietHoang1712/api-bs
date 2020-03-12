const {mongoose} = require('../database/database');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // Truong tham chieu
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Author'}],
});

const User = mongoose.model('User', UserSchema);

const Register = async (name, email, password) => {
    try {
        let foundUser = await User.find({email}).exec();
        if(foundUser.length > 0){
            throw 'Email is existed';
        } else{
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = password;
            await newUser.save();
        }
    } catch (error) {
        throw error;
    }
}

const Login = async (email, password) => {
    try {
        let foundUser = await User.findOne({email}).exec();
        if(!foundUser){
            throw 'Email is not existed';
        } else{
            if(foundUser.password === password) {
                // DAng nhap thanh cong
                let object = {id: foundUser.id};
                let tokenKey = await jwt.sign(object, secret, {expiresIn: 84000});
                return tokenKey;
            }
        }
    } catch (error) {
        throw error;
    }
}

const Verify = async (tokenKey) => {
    try {
        let decoded = await jwt.verify(tokenKey, secret);
        if(Date.now() / 1000 > decoded.exp) {
            throw 'Token het han';
        }
        let foundUser = await User.findById(decoded.id);
        return foundUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {User, Register, Login, Verify};