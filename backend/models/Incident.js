const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
{
    location: {
        type: String,
        required: true
    },

    threatType: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    flagged: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Incident", incidentSchema);