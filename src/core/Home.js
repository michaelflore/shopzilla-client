import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

import { Link } from 'react-router-dom';

import { latestProducts } from './../product/product-api';

import Icon from '@mdi/react';
import { mdiCartPlus, mdiArrowLeftThick, mdiArrowRightThick, mdiChevronLeftCircle, mdiChevronRightCircle } from '@mdi/js';

import tech from './../../public/tech.jpg';
import fashion from './../../public/fashion.jpg';
import shop from './../../public/shop.jpg';
import holiday from './../../public/holiday.jpg';

import sale from './../../public/sale.jpg';
import productsImg from './../../public/products.jpg';

// import { url } from '../config';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            current: 0,
            slides: [
                {
                    name: "fashion",
                    src: fashion
                },
                {
                    name: "tech",
                    src: tech
                },
                {
                    name: "shop",
                    src: shop
                },
                {
                    name: "holiday",
                    src: holiday
                }
            ],
            latestProducts: [],
            page: 1,
            limit: 5,
            skip: 0
        }
    }

    abortController = new AbortController();

    handleAdd = (product) => {
        //buyQuantity of 1
        this.props.addToCart(product, 1)
    }

    //Slide show
    nextSlide = () => {
        let value = this.state.current == this.state.slides.length - 1 ? 0 : this.state.current + 1
        this.setState(prevState => ({
            ...prevState,
            current: value
        }))
    }

    prevSlide = () => {
        let value = this.state.current == 0 ? this.state.slides.length - 1 : this.state.current - 1
        this.setState(prevState => ({
            ...prevState,
            current: value
        }))
    }

    //Paginate
    nextPage = () => {
        let value = this.state.page == 4 ? 1 : this.state.page + 1
        let skip = this.state.skip == 15 ? 0 : this.state.skip + this.state.limit
        
        this.setState(prevState => ({
            ...prevState,
            skip: skip,
            page: value
        }))
    }
 
    prevPage = () => {
        
        let value = this.state.page == 1 ? 4: this.state.page - 1
        let skip = this.state.skip == 0 ? 15 : this.state.skip - this.state.limit

        this.setState(prevState => ({
            ...prevState,
            skip: skip,
            page: value
        }))
        
    }

    componentDidMount() {
        latestProducts({ limit: this.state.limit , skip: this.state.skip, page: this.state.page }, this.abortController.signal).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    latestProducts: data.products
                }))
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.page != this.state.page) {
            latestProducts({ limit: this.state.limit , skip: this.state.skip, page: this.state.page }, this.abortController.signal).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        latestProducts: data
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
            <div className="container is-fluid p-0">
                <div className="columns">
                    <div className="column p-0">
                        <div className="slider">
                            {
                                this.state.slides.map((slide, i)=> {
                                    return (
                                        <div key={i} className="slide">
                                            {
                                                i === this.state.current && (
                                                    <div className="slide-img-container">
                                                        <img src={slide.src} className="slider-img" alt={slide.name}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                            <button className="button left-arrow" onClick={this.prevSlide}>
                                <Icon path={mdiArrowLeftThick} size={1} color="#000000"/>
                            </button>
                            <button className="button right-arrow" onClick={this.nextSlide}>
                                <Icon path={mdiArrowRightThick} size={1} color="#000000"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="columns is-centered has-background-light">
                    <div className="column">
                        <h2 className="title is-2">Latest Products</h2>
                        <div className="is-flex">
                            <button className="button is-align-self-center is-light" onClick={this.prevPage}>
                                <Icon path={mdiChevronLeftCircle} size={1} color="#000000"/>
                            </button>
                            <div className="columns is-flex-grow-4">
                                {
                                    this.state.latestProducts.map(product => {
                                        return (
                                            <div className="column" key={product._id}>
                                                <div className="card card-equal-height">
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
                                                            <div>Price: ${product.price}</div>
                                                            <div>
                                                                Sold By: <Link to={'/users/' + product.owner._id}>{product.owner.name}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer">
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
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className="button is-align-self-center is-light" onClick={this.nextPage}>
                                <Icon path={mdiChevronRightCircle} size={1} color="#000000"/>
                            </button> 
                        </div>
                    </div>
                </div>
                <div className="columns is-vcentered has-background-beige">
                    <div className="column is-half has-text-centered p-0">
                        <div className="img-container">
                            <img src={sale} className="img" />
                        </div>
                    </div>
                    <div className="column is-half has-text-centered">
                        <h4 className="title is-4 is-vcentered">Select items on sale!</h4>
                        <p><Link to="/shop" className="button is-link">Shop Now</Link></p>
                    </div>
                </div>
                <div className="columns is-vcentered has-background-beige">
                    <div className="column is-half has-text-centered">
                        <h4 className="title is-4 is-vcentered">Browse through different categories!</h4>
                    </div>
                    <div className="column is-half has-text-centered p-0">
                        <div className="img-container">
                            <img src={productsImg} className="img" />
                        </div>
                    </div>
                </div>
                <div className="columns is-centered has-background-light py-6">
                    <div className="column is-half has-text-centered">
                        <h4 className="title is-4">Interested in selling your own products?</h4>
                        <p className="is-underlined"><Link to="/signup">Create An Account</Link></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
