import React, { Component } from 'react';
import axios from 'axios';

export default class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            bio: ''
        }
    }

    componentDidMount() {
        document.body.style.backgroundImage = ""; //reset background

        axios.get('http://localhost:4000/api/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    bio: response.data.bio,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeBio(e) {
        this.setState({
            bio: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            bio: this.state.bio,
        };
        console.log(obj);
        axios.post('http://localhost:4000/api/users/update-profile/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Edit Profile</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.bio}
                            onChange={this.onChangeBio}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Profile" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}