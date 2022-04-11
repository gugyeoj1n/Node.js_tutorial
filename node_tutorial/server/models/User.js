const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 20
    },
    email: {
        type: String,
        trim: true, // 공백 제거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 20
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function ( next ) {
    // save 전에 하는 작업
    const user = this

    if ( user.isModified('password') ) {
        bcrypt.genSalt(saltRounds, function ( err, salt ) {
            if ( err ) return next(err)
            bcrypt.hash(user.password, salt, function ( err, hash ) {
                if ( err ) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, ( err, isMatch ) => {
        if ( err ) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.gerToken = function(cb) {
    const user = this
    const token = jwt.sign(user._id.toHexString(), '1234')

    user.token = token
    user.save(( err, user ) => {
        if ( err ) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    const user = this
    jwt.verify(token, '1234', ( err, decoded ) => {
        user.findOne({ "_id": decoded, "token": token}, ( err, user) => {
            if ( err ) return cb( err )
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }