import React, { Component } from 'react';
import axios from 'axios';
import { formatDateMMddYYYY, adjustTimeZone, formatTime, formatDateYYYYmmDD } 
    from '../helpers.js';

export default class ViewEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event_name: '',
            event_date: '',
            event_timeStart: '',
            event_timeEnd: '',
            event_location: '',
            event_description: '',
            event_hosts: '',
            event_tags: '',
            event_attending: false,
            event_numAttending: 0,
            attendingButtonText: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/events/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    event_name: response.data.event_name,
                    event_date: formatDateMMddYYYY(adjustTimeZone(response.data.event_date)),
                    event_timeStart: response.data.event_timeStart,
                    event_timeEnd: response.data.event_timeEnd,
                    event_location: response.data.event_location,
                    event_description: response.data.event_description,
                    event_hosts: response.data.event_hosts,
                    event_tags: response.data.event_tags,
                    event_attending: response.data.event_attending,
                    event_numAttending: response.data.event_numAttending,
                    attendingButtonText: this.setValueAttendingButton(response.data.event_attending)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/api/events/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    event_name: response.data.event_name,
                    event_date: formatDateMMddYYYY(adjustTimeZone(response.data.event_date)),
                    event_timeStart: response.data.event_timeStart,
                    event_timeEnd: response.data.event_timeEnd,
                    event_location: response.data.event_location,
                    event_description: response.data.event_description,
                    event_hosts: response.data.event_hosts,
                    event_tags: response.data.event_tags,
                    event_attending: response.data.event_attending,
                    event_numAttending: response.data.event_numAttending,
                    attendingButtonText: this.setValueAttendingButton(response.data.event_attending)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    setValueAttendingButton(attending) {
        if (attending) {
            return "No Longer Attend";
        }
        else {
            return "Attend";
        }
    }

    changeAttending(newText) {
        var change;
        
        if (this.state.event_attending === true) {
            change = -1;
        }
        else {
            change = 1;
        }

        const obj = {
            event_name: this.state.event_name,
            event_date: formatDateYYYYmmDD(this.state.event_date),
            event_timeStart: this.state.event_timeStart,
            event_timeEnd: this.state.event_timeEnd,
            event_location: this.state.event_location,
            event_description: this.state.event_description,
            event_hosts: this.state.event_hosts,
            event_tags: this.state.event_tags,
            event_attending: !this.state.event_attending,
            event_numAttending: this.state.event_numAttending + change
        };

        console.log(obj);
        axios.post('http://localhost:4000/api/events/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.setState({
            attendingButtonText: newText
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">View Event</h3>
                <div className="form-group">
                    <label class='boldLabel'>Name: </label>
                    <label>{this.state.event_name}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Date: </label>
                    <label>{this.state.event_date}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Start Time: </label>
                    <label>{formatTime(this.state.event_timeStart)}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>End Time: </label>
                    <label>{formatTime(this.state.event_timeEnd)}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Location: </label>
                    <label>{this.state.event_location}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Description: </label>
                    <label>{this.state.event_description}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Hosts: </label>
                    <label>{this.state.event_hosts}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Tags: </label>
                    <label>{this.state.event_tags}</label>
                </div>
                <div className="form-group">
                    <label class='boldLabel'>Number Attending: </label>
                    <label>{this.state.event_numAttending}</label>
                </div>
                <br />
                <div className="form-group">
                    <button onClick={() => this.changeAttending()} className="btn btn-primary"> {this.state.attendingButtonText}</button>
                </div>
            </div>
        )
    }
}