import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

import { Link } from 'react-router-dom';

import { read } from './product-api';

import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';

// import { url } from '../config';

//Individual Product View
class Product extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            product: {
                owner: {}
            },
            buyQuantity: 1,
            error: ''
        }
    }

    abortController = new AbortController();

    handleAdd = () => {
        this.props.addToCart(this.state.product, this.state.buyQuantity)
    }

    //Change quantity handler
    handleChange = (event) => {
        this.setState(state => ({
            ...state,
            buyQuantity: parseInt(event.target.value)
        }))
    }

    componentDidMount() {

        //Read an individual product api
        read({ productId: this.props.match.params.productId }, this.abortController.signal).then((data) => {
            if (data.error) {
                this.setState(state => ({
                    ...state,
                    error: data.error
                }))
            } else {
                this.setState(state => ({
                    ...state,
                    product: data
                }))
            }
        })
    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {
 
        return (
            <div className="container is-fluid">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="card">
                                <p className="card-header-title">Name: {this.state.product.name}</p>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                    <img src={
                                        this.state.product._id ?
                                            '/api/product/image/' + this.props.match.params.productId + '?' + new Date().getTime()
                                            : '/api/product/defaultphoto'} alt="Product Image" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <div>Description: {this.state.product.description}</div>
                                        <div className="has-text-weight-bold">Price: ${this.state.product.price}</div>
                                        <div>Category: {this.state.product.category}</div>
                                        <div>{this.state.product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
                                        <div className="field is-flex is-align-items-center">
                                            <div className="label">Quantity: </div>
                                            <div className="control">
                                                <div className="select is-primary">
                                                    <select value={this.state.buyQuantity} onChange={this.handleChange}>
                                                        {
                                                            [...new Array(this.state.product.quantity).keys()].map(num => {
                                                                return <option value={num + 1} key={num}>{num + 1}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            Sold By: <Link to={'/users/' + this.state.product.owner._id}>{this.state.product.owner.name}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-primary" onClick={this.handleAdd}>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <Icon path={mdiCartPlus} size={1} color="#ffffff"/>
                                                </span>
                                                <span>Add To Cart</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//Takes state in our cart reducer and passes in as props to our component
const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product, quantity) => {
            dispatch(addToCart(product, quantity))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
