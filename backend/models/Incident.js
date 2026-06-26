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
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Incident", incidentSchema);