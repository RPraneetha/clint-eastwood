import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./LandingPage";
import { HashRouter as Router, Route } from 'react-router-dom';
import SearchPage from "./SearchPage";
import ResQue from "./ResQue";
import ATI from "./ATI";

class App extends React.Component {
    render() {
        return (
            <div className="globalContainer">
                <div className="dashboard">
                    <div className="bodyWrapper">
                        <Router>
                            <Route exact path="/" component={ATI} />
                            <Route exact path="/land" component={LandingPage} />
                            <Route exact path="/search" component={SearchPage} />
                            <Route exact path="/exitForm" component={ResQue} />
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
