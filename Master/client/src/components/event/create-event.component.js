import React, { Component } from 'react';
import axios from 'axios';
import {formatDateYYYYmmDD, adjustTimeZone, getUserId} 
    from '../../utils/helpers.js';


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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            event_userId: getUserId(),
            event_name: '',
            event_date: '',
            event_timeStart: '',
            event_timeEnd: '',
            event_location: '',
            event_description: '',
            event_hosts: '',
            event_attending: [] ,
            event_numAttending: 0
        }
    }

    componentDidMount() {
        document.body.style.backgroundImage = ""; //reset background

        axios.get('http://localhost:4000/api/users/' + this.state.event_userId)
            .then(response => {
                this.setState({
                    user_createdEvents: response.data.CreateEvent
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
            event_timeStart: e.target.value,
        });

        console.log(e.target.value);
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

    onSubmit(e) {
        e.preventDefault();

        const newEvent = {
            event_userId: this.state.event_userId, 
            event_name: this.state.event_name,
            event_date: this.state.event_date,
            event_timeStart: this.state.event_timeStart,
            event_timeEnd: this.state.event_timeEnd,
            event_location: this.state.event_location,
            event_description: this.state.event_description,
            event_hosts: this.state.event_hosts,
            event_attending: [ this.state.event_userId ],
            event_numAttending: 1,
        }

        axios.post('http://localhost:4000/api/events/add', newEvent)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/');
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
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.event_date}
                                onChange={this.onChangeEventDate}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Time: </label>
                        <input  type="time"
                                className="form-control"
                                value={this.state.event_timeStart}
                                onChange={this.onChangeEventTimeStart}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Time: </label>
                        <input  type="time"
                                className="form-control"
                                value={this.state.event_timeEnd}
                                onChange={this.onChangeEventTimeEnd}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_location}
                                onChange={this.onChangeEventLocation}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_description}
                                onChange={this.onChangeEventDescription}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label>Hosts: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.event_hosts}
                                onChange={this.onChangeEventHosts}
                                required
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