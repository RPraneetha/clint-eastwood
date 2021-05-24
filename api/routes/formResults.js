const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/*const WorkerIdAndCode = require('../models/workerIdAndCode')*/

const mongoDBUriDev = "mongodb://127.0.0.1:27017/local";
const mongoDBUri = process.env.MONGODB_URI || mongoDBUriDev;
mongoose.connect(mongoDBUri, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.post('/log-ati', async(req, res) => {

    console.log(req.body)
    let data = {
        workerId: req.body.workerId,
        startTime: req.body.startTime,
        stopTime: req.body.stopTime,
        interface: "web",
        condition: req.body.condition,
        stage: req.body.stage,
        accuracy: req.body.accuracy,
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
        q7: req.body.q7,
        q8: req.body.q8,
        q9: req.body.q9
    };
    db.collection("atiResponses").insertOne(data, function (err, res) {
        if (err) throw err;
        console.log("1 ati response inserted");
    });
    res.send(true)
});

router.post('/log-exit',async (req, res) => {

    let data = {
        workerId: req.body.workerId,
        startTime: req.body.startTime,
        stopTime: req.body.stopTime,
        interface: "web",
        condition: req.body.condition,
        stage: req.body.stage,
        accuracy: req.body.accuracy,
        scenarioId: req.body.sid,
        quality_q1: req.body.quality_q1,
        quality_q2: req.body.quality_q2,
        quality_q3: req.body.quality_q3,
        interaction_q1: req.body.interaction_q1,
        interaction_q2: req.body.interaction_q2,
        interface_q1: req.body.interface_q1,
        interface_q2: req.body.interface_q2,
        interface_q3: req.body.interface_q3,
        easeOfUse_q1: req.body.easeOfUse_q1,
        easeOfUse_q2: req.body.easeOfUse_q2,
        easeOfUse_q3: req.body.easeOfUse_q3,
        usefulness_q1: req.body.usefulness_q1,
        usefulness_q2: req.body.usefulness_q2,
        control_q1: req.body.control_q1,
        control_q2: req.body.control_q2,
        attitudes_q1: req.body.attitudes_q1,
        attitudes_q2: req.body.attitudes_q2,
        attitudes_q3: req.body.attitudes_q3,
        attitudes_q4: req.body.attitudes_q4,
        attitudes_q5: req.body.attitudes_q5,
        intentions_q1: req.body.intentions_q1,
        intentions_q2: req.body.intentions_q2,
        intentions_q3: req.body.intentions_q3,
        intentions_q4: req.body.intentions_q4,
        intentions_q5: req.body.intentions_q5,
        intentions_q6: req.body.intentions_q6
    };

    db.collection("exitFormResponses").insertOne(data, function (err, res) {
        if (err) throw err;
        if (err) alert(err);
        console.log("1 exit form response inserted");
    });
    res.send(true)
})
module.exports = router;