import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { createProduct } from './product-api';
import auth from './../auth/auth-jwt';

import Icon from '@mdi/react';
import { mdiUpload } from '@mdi/js';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            product: {
                name: '',
                description: '',
                category: '',
                price: '',
                quantity: '',
                image: ''
            },
            redirect: false
        }
    }

    handleChange = (name, event) => {
        let value = name == 'image' ? event.target.files[0] : event.target.value;

        this.setState(prevState => ({
            product: {
                ...prevState.product,
                [name]: value
            }
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newProduct = new FormData();
        this.state.product.name && newProduct.append("name", this.state.product.name)
        this.state.product.description && newProduct.append("description", this.state.product.description)
        this.state.product.category && newProduct.append("category", this.state.product.category)
        this.state.product.quantity && newProduct.append("quantity", this.state.product.quantity)
        this.state.product.price && newProduct.append("price", this.state.product.price)
        this.state.product.image && newProduct.append("image", this.state.product.image)

        //Based on the logged in user
        createProduct({ userId: auth.isAuthenticated().user._id }, { t: auth.isAuthenticated.token }, newProduct).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    redirect: true
                }))
            }
        })
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={'/users/' + this.props.match.params.userId} />
        }

        return (
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <h2 className="title is-3">Create New Product</h2>
                        <form className="box">
                            <div className="file is-primary has-name is-centered is-boxed">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="image" onChange={e => this.handleChange('image', e)}/>
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <Icon path={mdiUpload} size={1} color="#ffffff"/>
                                        </span>
                                        <span className="file-label">
                                            Upload Photo..
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        {this.state.product.image.name}
                                    </span>
                                </label>
                            </div>
                            <div className="field">
                                <label htmlFor="name" className="label">Name:</label>
                                <div className="control"> 
                                    <input className="input" type="text" name="name" id="name" onChange={e => this.handleChange('name', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="description" className="label">Description:</label>
                                <div className="control"> 
                                    <input className="input" type="text" name="description" id="description" onChange={e => this.handleChange('description', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="category" className="label">Category:</label>
                                <div className="control"> 
                                    <input className="input" type="text" name="category" id="category" onChange={e => this.handleChange('category', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="price" className="label">Price:</label>
                                <div className="control"> 
                                    <input className="input" type="text" name="price" id="price" onChange={e => this.handleChange('price', e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="quantity" className="label">Quantity:</label>
                                <div className="control"> 
                                    <input className="input" type="number" min="0" name="quantity" id="quantity" onChange={e => this.handleChange('quantity', e)} />
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-success" onClick={this.onSubmit}>Add Product</button>
                                </div>
                                <div className="control">
                                    <Link to='/' className="button is-link is-light">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProduct;
