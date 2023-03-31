const moment = require('moment')

function formatMessage(sender, message) {
    return {
        from:sender,
        message:message,
        time: moment().format('h:mm a')
        }
    }

module.exports = formatMessage