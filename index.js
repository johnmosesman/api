const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const slackme = require('./lib/slackme');

const app = express();

app.set('port', (process.env.PORT || 3399));

// Main Middleware
app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/contacts', function(req, res) {
  const contact = req.body.contact;
  if (contact.email && contact.message) {
    slackme(`MAIL CALL! ${JSON.stringify(req.body)}`);

    res.send(contact);
  } else {
    const errors = {};

    if (!contact.email) {
      errors.email = "Please provide an email so we can contact you";
    }

    if (!contact.message) {
      errors.message = "Please provide a message to help use better understand your needs";
    }
    res.status(422).send({errors});
  }
});

app.get('/heartbeat', function(req, res) {
  console.log("Heartbeat");
  res.status(200).json({"status": "ok"});
});

app.listen(app.get('port'), function() {
  console.log(`booting dat api on http://localhost:${app.get('port')}`);
});

