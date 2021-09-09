import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

import { listCategories, listAllProductsQuery } from './../product/product-api';
import { getAllUsers } from './../user/user-api';

import {Link} from 'react-router-dom';

// import { url } from '../config';

// import Icon from '@mdi/react';
// import { mdiCartPlus } from '@mdi/js';

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            sellers: [],
            value: "",
            category: "All",
            seller: "",
            min: 0,
            max: 800
        }
    }

    abortController = new AbortController();

    handleAdd = (product) => {
        this.props.addToCart(product)
    }

    //sort
    handleChange = (event) => {
        this.setState(prevState => ({
            ...prevState,
            value: event.target.value
        }))
    }

    //price
    handlePriceChange = (field, e) => {
        this.setState(prevState => ({
            ...prevState,
            [field]: parseInt(e.target.value)
        }))
        // listAllProductsQuery({ max_price: max, min_price: min }, this.abortController.signal).then(data => {
        //     if(data.error) {
        //         console.log(data.error)
        //     } else {
        //         this.setState(prevState => ({
        //             ...prevState,
        //             products: data
        //         }))
        //     }
        // })
    }

    //category
    listByCategory = (name, e) => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            category: name
        }))
        // let value = this.state.value == 'Price: low to high' ? "price_low" : "price_high";

        // listAllProductsQuery({ category: name, sort: value }, this.abortController.signal).then(data => {
        //     if(data.error) {
        //         console.log(data.error)
        //     } else {
        //         this.setState(prevState => ({
        //             ...prevState,
        //             products: data,
        //             category: name
        //         }))
        //     }
        // })
    }

    //seller
    sellersProducts = (e, id) => {
        e.preventDefault();

        this.setState(prevState => ({
            ...prevState,
            seller: id
        }))

        // listAllProductsQuery({ seller: id }, this.abortController.signal).then(data => {
        //     if(data.error) {
        //         console.log(data.error)
        //     } else {
        //         this.setState(prevState => ({
        //             ...prevState,
        //             products: data,
        //             seller: id
        //         }))
        //     }
        // })
    }

    allProducts = (e) => {
        e.preventDefault();

        this.setState(prevState => ({
            ...prevState,
            category: "All",
            seller: ""
        }))

        // listAllProducts(this.abortController.signal).then(data => {
        //     if(data.error) {
        //         console.log(data.error)
        //     } else {
        //         this.setState(prevState => ({
        //             ...prevState,
        //             products: data
        //         }))
        //     }
        // })
    }

    componentDidMount() {
        //List Categories
        listCategories(this.abortController.signal).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    categories: data
                }))
            }
        })

        //List owners
        getAllUsers(this.abortController.signal).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    sellers: data
                }))
            }
        })

        //All Products
        listAllProductsQuery({ category: this.state.category }, this.abortController.signal).then(data => {
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

    componentDidUpdate(prevProps, prevState) {
        console.log("called")
        if( prevState.category !== this.state.category || prevState.value !== this.state.value 
            || prevState.max !== this.state.max || prevState.min !== this.state.min || prevState.seller !== this.state.seller) {
            
            let query = {}

            if(prevState.value !== this.state.value || this.state.value) {
                let value = this.state.value == "Price: low to high" ? "price_low" : "price_high";
                query.sort = value
            }

            if((prevState.category !== this.state.category) || this.state.category) {
                query.category = this.state.category
            }

            if(prevState.max !== this.state.max || this.state.max) {
                query.max_price = this.state.max
            }

            if(prevState.min !== this.state.min || this.state.min) {
                query.min_price = this.state.min
            }

            if(prevState.min !== this.state.min || this.state.min) {
                query.min_price = this.state.min
            }

            if(prevState.seller !== this.state.seller || this.state.seller) {
                query.seller = this.state.seller
            }

            listAllProductsQuery(query, this.abortController.signal).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    // console.log(data)
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
 
        return (
            <div className="container is-fluid">
                <div className="columns is-mobile mb-0">
                    <div className="column is-one-quarter" style={{ borderRight: '2px solid #ccc', padding: 0 }}>
                        <div className="box-noshadow">
                            <h3 className="title is-3">Category</h3>
                            <div className="buttons">
                                <button className="button is-primary" onClick={e => this.allProducts(e)}>All Products</button>
                                {
                                    this.state.categories.map((cat, i) => {
                                        return (
                                            
                                            <button key={i} className="button is-info" onClick={e => this.listByCategory(cat, e)}>{ cat }</button>
                                            
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="box-noshadow">
                            <h3 className="title is-3">Price</h3>
                            <div className="is-flex is-justify-content-space-between">
                                <div className="control">
                                    <label className="label">Min</label>
                                    <input type="number" className="input is-primary" min="0" value={this.state.min} onChange={e => this.handlePriceChange("min", e)} />
                                </div>
                                <div className="control">
                                    <label className="label">Max</label>
                                    <input type="number" className="input is-primary" max="800" value={this.state.max} onChange={e => this.handlePriceChange("max", e)} />
                                </div>
                            </div>
                        </div>
                        <div className="box-noshadow">
                            <h3 className="title is-3">Seller</h3>
                            <div className="buttons">
                                {
                                    this.state.sellers.map((owner, i) => {
                                        return (
                                            <button key={i} className="button is-light" onClick={e => this.sellersProducts(e, owner._id)}>{ owner.name }</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="column is-three-quarters" style={{ padding: ' 1rem 2rem' }}>
                        <div className="is-flex is-justify-content-space-between">
                            <h3 className="title is-3">Products</h3>
                            <div className="is-flex">
                                <div className="is-flex is-align-items-center">
                                    <div className="label">Sort By | </div>
                                    <div className="control">
                                        <div className="select is-primary">
                                            <select value={this.state.value} onChange={this.handleChange}>
                                                <option value=""></option>
                                                <option value="Price: low to high">Price: low to high</option>
                                                <option value="Price: high to low">Price: high to low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns is-multiline">
                            {
                                this.state.products.map(product => {
                                    return (
                                        <div key={product._id} className="column is-3">
                                            <div className="card-noshadow card-equal-height">
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
                                                        <div>{product.quantity > 0 ? 'Quantity: ' + product.quantity : 'Out of Stock'}</div>
                                                        <div className="has-text-weight-bold">Price: ${product.price}</div>
                                                        <div>
                                                            Sold By: <Link to={'/users/' + product.owner._id}>{product.owner.name}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="card-footer">
                                                    <div className="card-footer-item">
                                                        <button className="button is-primary" onClick={() => this.handleAdd(product)}>
                                                            <span className="icon-text">
                                                                <span className="icon">
                                                                    <Icon path={mdiCartPlus} size={1} color="#ffffff"/>
                                                                </span>
                                                                <span>Add To Cart</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div> */}
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

//Takes state in our cart reducer and passes in as props to our component
const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => {
            dispatch(addToCart(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);