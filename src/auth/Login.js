import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { login } from './api-auth';

import auth from './auth-jwt';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {
                email: "",
                password: "",
                error: "",
                redirectToRef: false
            }
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

        const currentUser = {
            email: this.state.values.email || undefined,
            password: this.state.values.password || undefined
        }

        login(currentUser).then(data => {
            console.log("Response back: " + data)
            auth.authenticate(data, () => {
                this.setState(prevState => ({
                    values: {
                        ...prevState.values,
                        redirectToRef: true
                    }
                }))
            })
        })
    }

    render() {

        if(this.state.values.redirectToRef) {
            return <Redirect to="/" />
        }

        return (
            <div className="container is-fullhd">
                <div className="columns is-centered mb-0 py-6">
                    <div className="column is-half">
                        <div className="py-3">
                            <Link to="/">Back to ShopZilla</Link>
                        </div>
                        <h2 className="title is-3">Login</h2>
                        <form className="box">
                            <div className="field">
                                <label htmlFor="email" className="label">Email:</label>
                                <div className="control"> 
                                    <input className="input" type="text" name="email" id="email" onChange={e => this.handleChange('email', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="password" className="label">Password:</label>
                                <div className="control">
                                    <input className="input" type="password" name="password" id="password" onChange={e => this.handleChange('password', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button onClick={this.onSubmit} className="button is-link">Login</button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Dont have an account yet? <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
