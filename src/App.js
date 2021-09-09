import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';

//Core
import Header from './core/Header';
import NavBar from './core/NavBar';
import Footer from './core/Footer';

import Home from './core/Home';
import Shop from './core/Shop';

//Product
import CreateProduct from './product/CreateProduct';
import Product from './product/Product';

//User
import UserBoard from './user/UserBoard';
import Profile from './user/Profile';

//Auth
import Login from './auth/Login';
import SignUp from './auth/SignUp';

//Cart
import Cart from './cart/Cart';

//404
import NotFound from './NotFound';

function App() {
    return (
        <Switch>

            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            <Fragment>
                <div className="App">
                    <Header />
                    <NavBar />

                    {/* Get all categories & Products by category */} 
                    <Route exact path="/" component={Home} />
                    <Route path="/shop" component={Shop} />

                    <Route path="/users/:userId/products/new" component={CreateProduct} />
                    {/* Get products by owner */}
                    <Route path="/users/:userId" component={Profile} />

                    <Route path="/users" component={UserBoard} />

                    <Route path="/cart" component={Cart} />
                    <Route path="/product/:productId" component={Product}/>

                    <Footer />
                </div>
            </Fragment>
            {/* 404 */}
            <Route component={NotFound} />
            
        </Switch>
    );
}

export default App;