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
      
      // Handler for submission and testing purposes 
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    // Sets value of input field upon change 
    handleChange(event) {
      this.setState({
        EventNameValue: '',
          EventDescription:'',
          EventLocation:'',
          EventDataAndTime:'',
          Hosts:'',
          EventTags:''
      });
    }
    
    // Submission verification
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
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