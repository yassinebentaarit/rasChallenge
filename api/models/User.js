const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type:String,
        required: true,
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: ''
    }
},{timestamps:true});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;