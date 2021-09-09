import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { emptyCart, getTotal } from '../actions/cartActions';
import auth from './../auth/auth-jwt';

import Icon from '@mdi/react';
import { mdiHome, mdiStore, mdiAccount, mdiAccountCircle, mdiCart, mdiShapeSquarePlus, mdiLogin } from '@mdi/js';

function NavBar({ history, emptyCart }) {
    
    // console.log(history)
    const handleLogOut = () => {
        emptyCart();
        auth.removeJWT(() => history.push('/'));
    }

    const getTotal = () => {
        if(localStorage.getItem('cart')) {
           return JSON.parse(localStorage.getItem('cart')).length || 0
        }

        return 0
    }

    return (
        
            <nav className="navbar is-green" role="navigation" aria-label="main navigation">

                <div id="navbarBasicExample" className="navbar-menu is-active">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            <span className="icon-text">
                                <span className="icon">
                                    <Icon path={mdiHome} size={1} color="#c1f0d0"/>
                                </span>
                                <Link to='/' className="has-text-white">Home</Link>
                            </span>
                        </div>
                        <div className="navbar-item">
                            <span className="icon-text">
                                <span className="icon">
                                    <Icon path={mdiStore} size={1} color="#c1f0d0"/>
                                </span>
                                <Link to='/shop' className="has-text-white">Shop</Link>
                            </span>
                        </div>
                        <div className="navbar-item">
                            <span className="icon-text">
                                <span className="icon">
                                    <Icon path={mdiCart} size={1} color="#c1f0d0"/>
                                </span>
                                <Link to='/cart' className="has-text-white">My Cart</Link>
                                <span className="badge">{getTotal()}</span>
                            </span>
                        </div>
                    </div>

                    {
                        !auth.isAuthenticated() && (
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <span className="icon-text">
                                    <span className="icon">
                                        <Icon path={mdiLogin} size={1} color="#c1f0d0"/>
                                    </span>
                                    <Link to='/login' className="has-text-white">Login</Link>  
                                    </span>   
                                </div>
                            </div>
                        )
                    }
                    {
                        auth.isAuthenticated() && (
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <Icon path={mdiShapeSquarePlus} size={1} color="#c1f0d0"/>
                                        </span>
                                        <Link to={'/users/' + auth.isAuthenticated().user._id + '/products/new'} className="has-text-white">
                                            Add New Product
                                        </Link>
                                    </span>
                                </div>
                               
                                <div className="navbar-item">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <Icon path={mdiAccount} size={1} color="#c1f0d0"/>
                                        </span>
                                        <Link to='/users' className="has-text-white">All Users</Link>
                                    </span>
                                </div>
                                <div className="navbar-item">
                                    <span className="icon-text">
                                        <span className="icon">
                                            <Icon path={mdiAccountCircle} size={1} color="#ffffff"/>
                                        </span>
                                        <Link to={'/users/' + auth.isAuthenticated().user._id} className="has-text-white">
                                            {auth.isAuthenticated().user.name}
                                        </Link>
                                    </span>
                                </div>
                                <div className="navbar-item">
                                    <button className="button is-danger" onClick={handleLogOut}>
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => dispatch(emptyCart())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
