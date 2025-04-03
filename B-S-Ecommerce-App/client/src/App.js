import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar component for site navigation
import Home from './pages/Home'; // Home page where products are listed
import Cart from './pages/Cart'; // Cart page where users review items in their cart
import Checkout from './pages/Checkout'; // Checkout page to enter shipping details and payment
import Success from './pages/Success'; // Success page after a successful payment
import Error from './pages/Error'; // Error page for failed payments or errors

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar for navigation */}
        <Navbar />

        {/* Main content */}
        <div className="main-content">
          <Switch>
            {/* Define routes */}
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/success" component={Success} />
            <Route path="/error" component={Error} />

            {/* Redirect to Error page for undefined routes */}
            <Route path="*" component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

