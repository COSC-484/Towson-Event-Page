import React, { Component } from 'react';
import axios from 'axios';
import {formatDateYYYYmmDD, adjustTimeZone} 
    from '../helpers.js';
import testImg from "../testImage.jpg"
import { Container, Row, Col } from 'reactstrap';


    export default class viewProfile extends Component{
        

        constructor(props){
            super(props);
            //Temporailty putting data in these to see how it looks
            this.state= {
                Uname: 'SuprisedPika',
                name: 'Pikachu',
                email: 'fatPika@gmail.com',
                bio: 'I can not believe that just happened',
                createdEvents: '',
                attendEvetns: '',
                profilPic: ''

            }
        }

        //No idea what goes here
        //componentDidMount(){

        //}

     

       
        //User's Profile will become username's profile
        render(){
            return(
                <div class = "container-fluid" >

                    <div class = "row">
                        <div className="form-group">
                    
                            <label class = 'boldLabel'>{this.state.Uname}'s</label>
                            <label class='boldLabel'> Profile </label>
                        </div>
                
                    </div>
                    <div class = "row" >

                        <div class = "col-12 col-md-8 border border-dark"> 
                            Create Tables for Events Created/Attended
                        </div>
                         <div class = "col-6 col-md-4 border border-dark">
                            <div className = "pic" style = {{paddingTop:"10px"}}>
                                <img src = {testImg} style = {{width:'100%'}}/>
                             </div>
                             <div className="form-group">
                                <label class='boldLabel'>Name: </label>
                                <label>{this.state.name}</label>
                            </div>
                            <div className="form-group">
                                 <label class='boldLabel'>Email: </label>
                                  <label>{this.state.email}</label>
                            </div>
                            <div className="form-group">
                                <label class='boldLabel'>About Me: </label>
                                <label>{this.state.bio}</label>
                            </div>
                        </div>
                    </div>
                </div>

            )
            
        }

    }
    