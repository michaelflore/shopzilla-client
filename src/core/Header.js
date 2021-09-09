import React, { Component } from 'react';

import bag from './../../public/green-bag.png';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <header className="hero">
                <div className="hero-body is-flex is-align-items-center">
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img src={bag} />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <h1 className="title is-1">ShopZilla</h1>
                            </div>
                        </div>
                        </article>
                </div>
            </header>
        )
    }
}

export default Header;