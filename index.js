const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const hookUrl = 'https://hooks.slack.com/services/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';
var Slack = require('node-slack');
var slack = new Slack(hookUrl, {});

const app = express();

app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/contacts', function(req, res) {
  const contact = req.body.contact;
  if (contact.email && contact.message) {
    slack.send({
      "text": `MAIL CALL! ${JSON.stringify(req.body)}`,
      channel: "#service",
      username: "HyphyBot"
    });

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

app.listen(3399, function() {
  console.log('booting dat api on http://localhost:3399');
});

