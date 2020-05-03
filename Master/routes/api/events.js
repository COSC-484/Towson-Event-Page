const express = require('express');
const router = express.Router();

//Item Model
const Event = require('../../models/event.model');

router.route('/').get(function (req, res) {
    Event.find(function (err, events) {
        if (err) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
});

router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Event.findById(id, function (err, event) {
        res.json(event);
    });
});


router.route('/add').post(function (req, res) {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({ 'event': 'event added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new event failed');
        });
});

router.route('/update/:id').post(function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (!event) {
            res.status(404).send("Event is not found");
        }
        else {
            event.event_name = req.body.event_name;
            event.event_date = req.body.event_date;
            event.event_timeStart = req.body.event_timeStart;
            event.event_timeEnd = req.body.event_timeEnd;
            event.event_location = req.body.event_location;
            event.event_description = req.body.event_description;
            event.event_hosts = req.body.event_hosts;
            event.event_attending = req.body.event_attending;
            event.event_numAttending = req.body.event_numAttending;

            event.save().then(event => {
                res.json('Event updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

router.route('/delete/:id').post(function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (!event) {
            res.status(404).send("data is not found");
        }
        else {
            event.remove().then(event => {
                res.json('Event deleted!');
            })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
        }
    });
});

router.route('/delete-all-events/:id').post(function (req, res) {
    console.log("worked");
    
    Event.find(function (err, event) {
        console.log(event);

        for(var i=0; i < event.length; i++)

        if (!event) {
            res.status(404).send("data is not found");
        }
        else {
            if(event.event_userId === req.params.id){
                console.log(event.event_name);
            }
        }
    });
});

module.exports = router;