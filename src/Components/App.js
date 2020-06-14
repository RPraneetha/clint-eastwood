import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from "./SearchPage";
import {HashRouter as Router, Route} from 'react-router-dom';
import Form from "./Form";
import exitForm from "./ExitForm";

class App extends React.Component {

    render() {
        return (
            <div className="globalContainer">
                <div className="dashboard">
                    <div className="bodyWrapper">
                        <Router>
                            <Route exact path="/" component={Form}/>
                            <Route exact path="/search" component={SearchPage} />
                            <Route exact path="/exitForm" component={exitForm} />
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
