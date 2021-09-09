import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { getAllUsers } from './user-api';

import Icon from '@mdi/react';
import { mdiAccountBox, mdiEmail } from '@mdi/js';

class UserBoard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            users: []
        }
    }

    abortController = new AbortController()

    componentDidMount() {
        getAllUsers(this.abortController.signal).then(data => {
            if(data.error) {
                console.log(error)
            } else {
                this.setState(() => ({
                    users: data
                }))
            }
        })
    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {
        return (
            <div className="container">
                <h2 className="title is-3">Users</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <span className="icon-text">
                                    <span className="icon">
                                        <Icon path={mdiAccountBox} size={1} color="#000000"/>
                                    </span>
                                    <span>Profile</span>
                                </span>
                            </th>
                            <th>
                                <span className="icon-text">
                                    <span className="icon">
                                        <Icon path={mdiEmail} size={1} color="#000000"/>
                                    </span>
                                    <span>Email</span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>
                                        <Link to={'/users/' + user._id}>{ user.name }</Link>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserBoard;

