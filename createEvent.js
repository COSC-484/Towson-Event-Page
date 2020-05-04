import React, { Component } from 'react';

class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      // Initial vlaues of input fields
      this.state = {
          EventName: '',
          EventDescription:'',
          EventLocation:'',
          EventDataAndTime:'',
          Hosts:'',
          EventTags:''
        };
      
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventDate = this.onChangeEventDate.bind(this);
        this.onChangeEventTimeStart = this.onChangeEventTimeStart.bind(this);
        this.onChangeEventTimeEnd = this.onChangeEventTimeEnd.bind(this);
        this.onChangeEventLocation = this.onChangeEventLocation.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventHosts = this.onChangeEventHosts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
         
          <label>
            Event Name:
            <input name="name" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Event Description:
            <textarea name="description" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Event Location:
            <input name="location" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Event Date:
            <input name="date" type="date" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Event Time:
            <input name="time" type="time" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Event Host:
            <input name="hosts" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Event Tags:
            <input name="tags" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
