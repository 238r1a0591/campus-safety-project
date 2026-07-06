const express = require("express");
const router = express.Router();

const Incident = require("../models/Incident");

// GET all incidents

router.get("/", async (req, res) => {
    try {

        const incidents = await Incident.find();

        res.status(200).json(incidents);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

// CREATE incident

router.post("/", async (req, res) => {

    try {

        const { location, threatType, description } = req.body;

        const incident = new Incident({
            location,
            threatType,
            description
        });

        await incident.save();

        res.status(201).json({
            success: true,
            data: incident
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

module.exports = router;