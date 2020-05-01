import React, { Component } from 'react';
import axios from 'axios';
import {formatDateMMddYYYY} 
    from '../helpers.js';
import testImg from "../testImage.jpg"
import { Container, Row, Col } from 'reactstrap';


    export default class viewProfile extends Component{
        

        constructor(props){
            super(props);
            //Temporailty putting data in these to see how it looks
            this.state= {
                firstName: '',
                lastName: '',
                email: '',
                userName: '',
                date: '',
                bio: 'Everyone loves Joe Shmoe',
                createdEvents: '',
                attendEvetns: '',
                profilPic: null

            }
            this.fileSelectedHandler = this.fileSelectedHandler.bind(this);

        }

        fileSelectedHandler = event => {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
              })
        }

       

        componentDidMount() {
            axios.get('http://localhost:4000/api/users/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        userName: response.data.userName,
                        date: response.data.date,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        componentDidUpdate() {
            axios.get('http://localhost:4000/api/users/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        userName: response.data.userName,
                        date: response.data.date,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

     

       
        //User's Profile will become username's profile
        render(){
            return(
                <div class = "container-fluid" >

                    <div class = "row">
                        <div className="form-group">
                    
                            <label class = 'boldLabel'>{this.state.userName}'s</label>
                            <label class='boldLabel'> Profile </label>
                        </div>
                
                    </div>
                    <div class = "row" >

                        <div class = "col-12 col-md-8 border border-dark">
                            <div className="form-group"> 
                                <label>Will show the events they created here:</label>
                            </div>
                            <hr className = "moveDown"></hr>
                            <div className="form-group"> 
                                <label>Will the events they are attending here:</label>
                            </div>
                        </div>
                         <div class = "col-6 col-md-4 border border-dark">
                            <div className = "pic" style = {{paddingTop:"10px"}}>
                                <img src = {this.state.file} style = {{width:'100%'}}/>
                             </div>
                             <div className="form-group">
                                <label class='boldLabel'>Name: </label>
                                <label>{this.state.firstName + ' ' + this.state.lastName}</label>
                            </div>
                            <div className="form-group">
                                 <label class='boldLabel'>Email: </label>
                                  <label>{this.state.email}</label>
                            </div>
                            <div className="form-group">
                                <label class='boldLabel'>About Me: </label>
                                <label>{this.state.bio}</label>
                            </div>
                            <div className="form-group">
                                <label class='boldLabel'>Joined: </label>
                                <label>{formatDateMMddYYYY(this.state.date)}</label>
                            </div>
                            <div className="form-group">
                                <label>Upload Profile Picture: </label>
                                <input type="file" onChange={this.fileSelectedHandler}/>
                            </div>
                        </div>
                    </div>
                </div>

            )
            
        }

    }