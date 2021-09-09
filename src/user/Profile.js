import React, { Component } from 'react';

import { Redirect, Link } from 'react-router-dom';

import { getUser, getUsersProducts, removeUser } from './user-api';

import { removeProduct } from './../product/product-api';

import auth from './../auth/auth-jwt';

import Icon from '@mdi/react';
import { mdiCardAccountDetails, mdiAccountRemove, mdiEmail, mdiDelete } from '@mdi/js';

// import { url } from '../config';

class Profile extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: {},
            products: [],
            redirect: false
        }
    }

    abortController = new AbortController();

    deleteProduct = (product) => {

        removeProduct({ userId: this.props.match.params.userId, productId: product._id }, { t: auth.isAuthenticated().token }).then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                //Delete product from state
                let updatedProducts = [...this.state.products];
                let index = updatedProducts.indexOf(product);

                updatedProducts.splice(index, 1);

                this.setState(prevState => ({
                    ...prevState,
                    products: updatedProducts
                }))
            }
        })
    }

    deleteAccount = () => {
        removeUser({ userId: this.state.user._id }, { t: auth.isAuthenticated().token }).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {

                auth.removeJWT(() => console.log('DELETED!'))
                this.setState(prevState => ({
                    ...prevState,
                    redirect: true
                }))
            }
        })
    }

    componentDidMount() {
        getUser({ userId: this.props.match.params.userId }, this.abortController.signal).then(data => {
            if(data.error) {
                console.log(error)
            } else {
                this.setState(() => ({
                    user: data
                }))
            }
        })

        getUsersProducts({ userId: this.props.match.params.userId }, this.abortController.signal).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    products: data
                }))
            }
        })

    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.userId != this.props.match.params.userId) {
            getUser({ userId: this.props.match.params.userId }, this.abortController.signal).then(data => {
                if(data.error) {
                    console.log(error)
                } else {
                    this.setState(() => ({
                        user: data
                    }))
                }
            })

            getUsersProducts({ userId: this.props.match.params.userId }, this.abortController.signal).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        products: data
                    }))
                }
            })
        }
    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to='/'/>
        }
        return (
            <div className="container is-fluid">

                    <div className="coulmns">
                        <div className="column">
                            <h3 className="title is-3">Profile</h3>
                            <div className="card">
                                <div className="card-header-title">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <Icon path={mdiCardAccountDetails} size={1} color="#000000"/>
                                        </span>
                                        <div>User: { this.state.user.name }</div>
                                    </span>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="icon-text">
                                            <span className="icon">
                                                <Icon path={mdiEmail} size={1} color="#000000"/>
                                            </span>
                                            <div>Email: { this.state.user.email }</div>
                                        </span>
                                    </div>
                                    <div className="content">
                                    {
                                        auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id && (
                                            <button className="button is-danger" onClick={this.deleteAccount}>
                                                <span className="icon-text">
                                                    <span className="icon">
                                                        <Icon path={mdiAccountRemove} size={1} color="#ffffff"/>
                                                    </span>
                                                    <span>Delete Account</span>
                                                </span>
                                            </button>
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <h3 className="title is-3">{ this.state.user.name }'s Products</h3>
                            <div className="columns is-multiline">
                            {
                                this.state.products.map(product => {
                                    return (
                                        <div key={product._id} className="column is-3">
                                            <div className="card">
                                                <div className="card-header">
                                                    <Link to={'/product/' + product._id}>
                                                        <p className="product-title">                                  
                                                            {product.name}
                                                        </p>         
                                                    </Link>
                                                </div>

                                                <div className="card-image">
                                                    <Link to={'/product/' + product._id}>
                                                        <figure className="image is-4by3">
                                                        <img src={
                                                            product._id ?
                                                                '/api/product/image/' + product._id + '?' + new Date().getTime()
                                                                : '/api/product/defaultphoto'} alt="Product Image" />
                                                        </figure>
                                                    </Link>
                                                </div>

                                                <div className="card-content">
                                                    <div className="content">
                                                        <div>Category: {product.category}</div>
                                                        <div>Quantity: {product.quantity}</div>
                                                        <div>Price: ${product.price}</div>
                                                    </div>
                                                </div>
                                                <div className="card-footer-item">
                                                    {
                                                        auth.isAuthenticated() && auth.isAuthenticated().user._id == product.owner._id && (
                                                            <button className="button is-danger" onClick={() => this.deleteProduct(product)}>
                                                                <span className="icon-text">
                                                                    <span className="icon">
                                                                        <Icon path={mdiDelete} size={1} color="#ffffff"/>
                                                                    </span>
                                                                    <span>Remove</span>
                                                                </span>
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>

            </div>
        )
    }
}

export default Profile;
