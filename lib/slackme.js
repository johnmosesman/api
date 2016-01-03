// Slack Setup
const hookUrl = 'https://hooks.slack.com/services/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';
var Slack = require('node-slack');
var slack = new Slack(hookUrl, {});

module.exports = function slackme(text) {
  slack.send({
    text,
    channel: "#service",
    username: "HyphyBot"
  });
};
