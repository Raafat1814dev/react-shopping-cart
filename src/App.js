import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import "./App.css";

// import the Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";

function App() {
  return (
    <React.Fragment>
      {/* we exclude the Navbar from the Switch because we want the Navbar to be present in all the pages  */}
      <Navbar />
      <Switch>
        {/* we add """"exact"""" to specify the route for the home page since all the other routs have the <<< / >>> in them */}
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      {/* the modal will not be inside the SWITCH, because we are
        going to do any Routing to it 
      */}
      <Modal />
    </React.Fragment>
  );
}

export default App;
