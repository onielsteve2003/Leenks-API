const { Schema, model } = require('mongoose')

// Link schema
const linkSchema = Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    url: {
        type: String,
        required: true
    },
    timesClicked: {
        type: Number,
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = model("Link", linkSchema);