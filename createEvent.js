import React, { Component } from 'react';

class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      // Initial vlaues of input fields
      this.state = {
          EventName: '',
          EventDescription:'',
          EventLocation:'',
          EventTime:'',
          Hosts:'',
          EventTags:''
        };
      
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventDate = this.onChangeEventDate.bind(this);
        this.onChangeEventTimeStart = this.onChangeEventTimeStart.bind(this);
        this.onChangeEventLocation = this.onChangeEventLocation.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventHosts = this.onChangeEventHosts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChangeEventName(e) {
        this.setState({
            EventName: e.target.value
        });
    }
    onChangeTags(e){
        this.setState({
            EventTags: e.target.value
        })
    }

    onChangeEventDate(e) {
        var EventDate = formatDateYYYYmmDD(adjustTimeZone(e.target.value));
        console.log(eventDate);
        
        this.setState({
            EventDate: eventDate
        });
    }

    onChangeEventTimeStart(e) {
        this.setState({
            EventTime: e.target.value,
        });

        console.log(e.target.value);
    }



    onChangeEventLocation(e) {
        this.setState({
            EventLocation: e.target.value
        });
    }

    onChangeEventDescription(e) {
        this.setState({
            EventDescription: e.target.value
        });
    }

    onChangeEventHosts(e) {
        this.setState({
            EventHosts: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newEvent = {
            EventName: this.state.event_name,
            EventDate: this.state.event_date,
            EvenTimeStart: this.state.event_timeStart,
            EventLocation: this.state.event_location,
            EventDescription: this.state.event_description,
            EventHosts: this.state.event_hosts,
        }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
         
          <label>
            Event Name:
            <input name="name" type="text" value={this.state.value} onChange={this.onChangeEventName} />
          </label>

          <label>
            Event Description:
            <textarea name="description" type="text" value={this.state.value} onChange={this.onChangeEventLocation} />
          </label>

          <label>
            Event Location:
            <input name="location" type="text" value={this.state.value} onChange={this.onChangeEventLocation} />
          </label>

          <label>
            Event Date:
            <input name="date" type="date" value={this.state.value} onChange={this.onChangeEventDate} />
          </label>

          <label>
            Event Time:
            <input name="time" type="time" value={this.state.value} onChange={this.onChangeEventTimeStart} />
          </label>

          <label>
            Event Host:
            <input name="hosts" type="text" value={this.state.value} onChange={this.onChangeEventHosts} />
          </label>

          <label>
            Event Tags:
            <input name="tags" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      );
    }
  }
