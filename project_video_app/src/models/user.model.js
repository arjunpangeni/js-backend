import mongoose, { Schema } from 'mongoose'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const userSchema = new Schema(
    {
        userName: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,

        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullName: {
            type: String,
            require: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            require: true,
            unique: true,


        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        password: {
            type: String,
            require: [true, 'password is required']
        },
        refreshToken: {
            type: String
        }


    }, {
    timestamps: true
}
)

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next()
    user.password = bcrypt.hash(user.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        }, process.env.REFRESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model('user', userSchema)