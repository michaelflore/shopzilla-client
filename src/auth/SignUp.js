import React, { Component } from 'react';

import { Redirect, Link } from 'react-router-dom';

import { signup } from './api-auth';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {
                name: "",
                email: "",
                password: "",
                error: "",
                open: false
            },
            redirect: false
        }
    }

    handleChange = (name, event) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: event.target.value
            }
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.values.name || undefined,
            email: this.state.values.email || undefined,
            password: this.state.values.password || undefined
        }

        signup(newUser).then(data => {
            if(data.error) {
                this.setState(prevState => ({
                    ...prevState,
                    values: {
                        ...prevState.values,
                        error: data.error
                    }
                }))
            } else {
                this.setState({
                    values: {
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        open: true
                    },
                    redirect: true
                })
            }
        })
    }

    handleClose = () => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                open: false
            }
        }))
    }

    render() {
        // if(this.state.redirect) {
        //     return <Redirect to='/login'/>
        // }
        return (
            <div className="container is-fullhd">
                <div className="columns is-centered mb-0 py-6"> 
                    <div className="column is-half">
                        <div className="py-3">
                            <Link to="/">Back to ShopZilla</Link>
                        </div>
                        <h2 className="title is-3">Sign Up</h2>
                        <form className="box">
                            <div className="field">
                                <label htmlFor="full-name" className="label">Full Name:</label>
                                <div className="control">
                                    <input className="input" type="text" name="fullName" id="full-name" value={this.state.values.name}
                                        onChange={e => this.handleChange('name', e) }/>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label">Email:</label>
                                <div className="control">
                                    <input className="input" type="text" name="email" id="email" value={this.state.values.email}
                                        onChange={e => this.handleChange('email', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="password" className="label">Password:</label>
                                <div className="control">
                                    <input className="input" type="text" name="password" id="password" value={this.state.values.password}
                                        onChange={e => this.handleChange('password', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button onClick={this.onSubmit} className="button is-link">Sign Up</button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Already have an account? <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    this.state.values.open && (
                        <div className="overlay">
                            <div className="modal-content">
                                <h2 className="title is-3">Account Created!</h2>
                                <p className="content">You can now login.</p>
                                <div className="buttons">
                                    <Link to="/login" className="button is-success">
                                        Login
                                    </Link>
                                    <button className="button is-danger" onClick={this.handleClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default SignUp;
