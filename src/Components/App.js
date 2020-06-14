import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from "./SearchPage";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {  Route } from 'react-router-dom';
import Form from "./Form";

class App extends React.Component {

    render() {
        return (
            <div className="globalContainer">
                <div className="dashboard">
                    <div className="bodyWrapper">
                        <Router>
                            <Route exact path="/" component={Form}/>
                            <Route exact path="/search" component={SearchPage} />
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
