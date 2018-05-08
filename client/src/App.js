import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/pages/landingPage.js";
import Domroutes from "./components/appContentContainer.js";

// Entire app is wrapped in Router
// Routes are children of Router
// Router is listening for when to showcase different routes

const App = () =>
    <Router>
      <div>

          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Domroutes} />

      </div>
    </Router>;


export default App;
