const express = require('express');
const Joi = require('joi');



const db = require('../db');
const messages = db.get('messages');


const schema = Joi.object().keys({
  FirstName: Joi.string().required(),
  LastName: Joi.string().required(),
  Report: Joi.string().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  date: Joi.date()
});


const router = express.Router();

router.get('/', (req, res) => {
  messages
  .find()
  .then(allMessages => {
    res.json(allMessages);
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
const result = Joi.validate(req.body, schema);
if (result.error === null) {
  const { FirstName, LastName, Report, latitude, longitude} = req.body;
const userMessage = {
    FirstName,
    LastName,
    Report,
    latitude,
    longitude,
    date: new Date()
    };
    messages
    .insert(userMessage)
    .then(insertedMessage => {
    res.json(insertedMessage);
    });
  } else {
    next(result.error);
  }
});


module.exports = router;
