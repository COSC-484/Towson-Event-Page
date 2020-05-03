const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
    event_userId: {
        type: String
    },
    event_name: {
        type: String
    },
    event_date: {
        type: String
    },
    event_timeStart: {
        type: String
    },
    event_timeEnd: {
        type: String
    },
    event_location: {
        type: String
    },
    event_description: {
        type: String
    },
    event_hosts: {
        type: String
    },
    event_attending: [
       { type: String }
    ],
    event_numAttending: {
        type: Number
    }
});

module.exports = Event = mongoose.model('Event', EventSchema);