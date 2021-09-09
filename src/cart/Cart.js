import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateCartItem } from '../actions/cartActions';

import {Link} from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

// import { url } from '../config';

class Cart extends Component {

    getCartTotal = () => {
        return this.props.cart.reduce((total, item) => {
            return total + (item.quantity * item.product.price)
        }, 0)
    }

    //Change quantity handler
    handleChange = (event, index) => {
        this.props.updateCartItem(index, event.target.value)
        // cart.updateCart(index, event.target.value)
    }

    render() {
        return (
            <div className="container is-fluid">
                <h3 className="title is-3">My Cart</h3>
                <div className="columns is-flex is-flex-direction-column">
                    {
                        this.props.cart.map((item, i) => {
                            return (
                                <div key={item.product._id} className="column">
                                    <div className="card is-flex is-justify-content-space-between is-align-items-center">
                                        
                                        <div className="card-content">
                                            {/* <Link to={'/product/' + item.product._id}> */}
                                                <div style={{ width: '10rem', height: '10rem'}}>
                                                    <img src={
                                                        item.product._id ?
                                                            '/api/product/image/' + item.product._id + '?' + new Date().getTime()
                                                            : '/api/product/defaultphoto'} alt="Product Image" className="img" />
                                                </div>
                                            {/* </Link> */}
                                        </div>
                                             

                                            <div className="card-content">
                                                <h1 className="title is-5">{ item.product.name }</h1>
                                                <p>Description: { item.product.description }</p>
                                                <p>
                                                    Sold By: <Link to={'/users/' + item.product.owner._id}>{item.product.owner.name}</Link>
                                                </p>
                                            </div>

                                       
                                            <div className="card-content">
                                                <div className="has-text-weight-bold">Price: ${ item.product.price }</div>
                                                <div className="field is-flex has-align-items-center">
                                                    <div className="label">Quantity: </div>
                                                    <div className="control">
                                                        <div className="select is-primary">
                                                            <select value={item.quantity} onChange={e => this.handleChange(e, i)}>
                                                                {
                                                                    [...new Array(item.product.quantity).keys()].map(num => {
                                                                        return <option value={num + 1} key={num}>{num + 1}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>Item Total: ${ item.quantity * item.product.price }</div>
                                            </div>

                                            <div className="card-content">
                                                <button className="button is-danger" onClick={() => this.props.removeFromCart(i)}>
                                                    <span className="icon-text">
                                                    <span className="icon">
                                                        <Icon path={mdiDelete} size={1} color="#ffffff"/>
                                                    </span>
                                                    <span>Remove Item</span>
                                                </span>
                                                </button>
                                            </div>
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="columns">
                    <div className="column">
                        <h5 className="title is-5">Cart Total: ${this.getCartTotal()}</h5>
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
        updateCartItem: (index, value) => dispatch(updateCartItem(index, value)),
        removeFromCart: (index) => dispatch(removeFromCart(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
