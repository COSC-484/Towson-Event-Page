import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDateMMddYYYY, adjustTimeZone, formatStartEndTime, timeToInt }
    from '../helpers.js';

const Event = props => (
    <tr>
        <td>{props.event.event_name}</td>
        <td>{formatDateMMddYYYY(adjustTimeZone(props.event.event_date))}</td>
        <td>{formatStartEndTime(props.event.event_timeStart, props.event.event_timeEnd)}</td>
        <td>{props.event.event_location}</td>
        <td>{props.event.event_description}</td>
        <td>{displayAttending(props.event.event_attending)}</td>
        <td>{props.event.event_numAttending}</td>
        <td>
            <Link to={"/view/" + props.event._id}>View</Link>
        </td>
        <td>
            <Link to={"/edit/" + props.event._id}>Edit</Link>
        </td>
    </tr>
)

function displayAttending(attending) {
    if (attending) {
        return 'Yes'
    }
    else {
        return 'No'
    }
}

function searchingFor(term) {
    return function (x) {
        var nameMatches = x.event_name.toLowerCase().includes(term.toLowerCase());
        var descriptionMatches = x.event_description.toLowerCase().includes(term.toLowerCase());

        // true if term is empty, name has a match, or description has a match
        return (term === '' || nameMatches || descriptionMatches)
    }
}

export default class EventsList extends Component {

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);

        this.state = {
            events: [],
            input: '',
            search: '',
            sort: 'dateAsc'
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/events/')
            .then(response => {
                this.setState({
                    events: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/events/')
            .then(response => {
                this.setState({
                    events: response.data,
                    //event_attending: displayAttending(response.data.event_attending)
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeSort(e) {
        console.log(e.target.value);
        
        this.setState({
            sort: e.target.value
        });
    }

    onChangeInput(e) {
        this.setState({
            input: e.target.value
        });
    }

    updateSearch() {
        this.setState({
            search: this.state.input
        });
    }

    handleKeyDown(event) {
        //console.log('Pressed button code: ' + event.keyCode);

        if (event.keyCode === 13) {
            this.updateSearch();
        }
    }

    sortDateEarliest(allEvents) {
        allEvents.sort((a, b) => {
            var dateA = new Date(a.event_date);
            var dateB = new Date(b.event_date);
            
            if (dateA.getDate() !== dateB.getDate()){
                //console.log(dateA.getDate() + ' - ' + dateB.getDate());
                return dateA - dateB;
            }
            else{
                //console.log('Same!   ' + timeToInt(a.event_timeStart) + ' - ' + timeToInt(b.event_timeStart));
                return timeToInt(a.event_timeStart) - timeToInt(b.event_timeStart);
            }
                
        });
    }

    sortDateLatest(allEvents) {
        allEvents.sort((a, b) => {
            var dateA = new Date(a.event_date);
            var dateB = new Date(b.event_date);
            
            if (dateA.getDate() !== dateB.getDate()){
                //console.log(dateA.getDate() + ' - ' + dateB.getDate());
                return dateB - dateA;
            }
            else{
                //console.log('Same!   ' + timeToInt(a.event_timeStart) + ' - ' + timeToInt(b.event_timeStart));
                return timeToInt(a.event_timeStart) - timeToInt(b.event_timeStart);
            }
                
        });
    }

    sortAttendMost(allEvents) {
        allEvents.sort((a, b) => { 
            return b.event_numAttending - a.event_numAttending;     
        });
    }

    sortAttendLeast(allEvents) {
        allEvents.sort((a, b) => { 
            return a.event_numAttending - b.event_numAttending;     
        });
    }

    eventsList() {
        var allEvents = [...this.state.events];

        if (this.state.sort === 'dateEarliest'){
            this.sortDateEarliest(allEvents);
        }
        else if (this.state.sort === 'dateLatest'){
            this.sortDateLatest(allEvents);
        }
        else if (this.state.sort === 'attendMost'){
            this.sortDateEarliest(allEvents);
            this.sortAttendMost(allEvents);
        }
        else if (this.state.sort === 'attendLeast'){
            this.sortDateEarliest(allEvents);
            this.sortAttendLeast(allEvents);
        }
        else{
            this.sortDateEarliest(allEvents);
        }

        return allEvents.filter(searchingFor(this.state.search)).map(function (currentEvent, i) {
            return <Event event={currentEvent} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Events List</h3>
                <input type="text"
                    onChange={this.onChangeInput}
                    onKeyDown={this.handleKeyDown}
                />
                <input type="button"
                    id="searchButton"
                    value="Search Event"
                    className="btn btn-primary"
                    onClick={this.updateSearch}
                />
                <label class="sortFilterLabels">Sort by:</label>
                <select id="sortingOptions" onChange={this.onChangeSort}>
                    <option value="dateEarliest" >Date - earliest</option>
                    <option value="dateLatest" >Date - latest</option>
                    <option value="attendMost" >Attending - most</option>
                    <option value="attendLeast" >Attending - least</option>
                </select>
                <label class="sortFilterLabels">Filter by Tags:</label>
                <select id="filteringOptions" onChange={this.onChangeSort}>
                    <option value="" >Tag #1</option>
                    <option value="" >Tag #2</option>
                    <option value="" >Tag #3</option>
                </select>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Attend</th>
                            <th>Size</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}