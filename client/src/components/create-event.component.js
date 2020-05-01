import React, { Component } from 'react';
import axios from 'axios';
import {formatDateYYYYmmDD, adjustTimeZone} 
    from '../helpers.js';


export default class CreateEvent extends Component {

    constructor(props) {
        super(props);

        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventDate = this.onChangeEventDate.bind(this);
        this.onChangeEventTimeStart = this.onChangeEventTimeStart.bind(this);
        this.onChangeEventTimeEnd = this.onChangeEventTimeEnd.bind(this);
        this.onChangeEventLocation = this.onChangeEventLocation.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventHosts = this.onChangeEventHosts.bind(this);
        this.onChangeEventTags = this.onChangeEventTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            event_name: '',
            event_date: '',
            event_timeStart: '',
            event_timeEnd: '',
            event_location: '',
            event_description: '',
            event_hosts: '',
            event_tags: '',
            event_attending: 'false',
            event_numAttending: 0,
        }
    }

    onChangeEventName(e) {
        this.setState({
            event_name: e.target.value
        });
    }

    onChangeEventDate(e) {
        var eventDate = formatDateYYYYmmDD(adjustTimeZone(e.target.value));
        console.log(eventDate);
        
        this.setState({
            event_date: eventDate
        });
    }

    onChangeEventTimeStart(e) {
        this.setState({
            event_timeStart: e.target.value
        });
    }

    onChangeEventTimeEnd(e) {
        this.setState({
            event_timeEnd: e.target.value
        });
    }

    onChangeEventLocation(e) {
        this.setState({
            event_location: e.target.value
        });
    }

    onChangeEventDescription(e) {
        this.setState({
            event_description: e.target.value
        });
    }

    onChangeEventHosts(e) {
        this.setState({
            event_hosts: e.target.value
        });
    }

    onChangeEventTags(e) {
        this.setState({
            event_tags: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`)
        console.log(`Event Name: ${this.state.event_name}`);
        console.log(`Event Date: ${this.state.event_date}`);
        console.log(`Event Time Start: ${this.state.event_timeStart}`);
        console.log(`Event Time End: ${this.state.event_timeEnd}`);
        console.log(`Event Location: ${this.state.event_location}`);
        console.log(`Event Description: ${this.state.event_description}`);
        console.log(`Event Hosts: ${this.state.event_hosts}`);
        console.log(`Event Tags: ${this.state.event_tags}`);
        console.log(`Event Attending: ${this.state.event_attending}`);
        console.log(`Event Number Attending: ${this.state.event_numAttending}`);

        //console.log('Type of event_date: ' + typeof this.state.event_date);

        const newEvent = { 
            event_name: this.state.event_name,
            event_date: this.state.event_date,
            event_timeStart: this.state.event_timeStart,
            event_timeEnd: this.state.event_timeEnd,
            event_location: this.state.event_location,
            event_description: this.state.event_description,
            event_hosts: this.state.event_hosts,
            event_tags: this.state.event_tags,
            event_attending: this.state.event_attending,
            event_numAttending: this.state.event_numAttending
        }

        axios.post('http://localhost:4000/api/events/add', newEvent)
            .then(res => console.log(res.data));

        this.setState({
            event_name: '',
            event_date: '',
            event_timeStart: '',
            event_timeEnd: '',
            event_location: '',
            event_description: '',
            event_hosts: '',
            event_tags: '',
            event_attending: false,
            event_numAttending: 0
        });
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_name}
                                onChange={this.onChangeEventName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.event_date}
                                onChange={this.onChangeEventDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Time: </label>
                        <input  type="time"
                                className="form-control"
                                value={this.state.event_timeStart}
                                onChange={this.onChangeEventTimeStart}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Time: </label>
                        <input  type="time"
                                className="form-control"
                                value={this.state.event_timeEnd}
                                onChange={this.onChangeEventTimeEnd}
                        />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_location}
                                onChange={this.onChangeEventLocation}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea  type="text"
                                className="form-control"
                                value={this.state.event_description}
                                onChange={this.onChangeEventDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Hosts: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_hosts}
                                onChange={this.onChangeEventHosts}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tags: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_tags}
                                onChange={this.onChangeEventTags}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Event" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}