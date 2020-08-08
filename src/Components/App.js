import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./LandingPage";
import { HashRouter as Router, Route } from 'react-router-dom';
import Form from "./Form";
import SearchPage from "./SearchPage";
import ResQue from "./ResQue";
import ATI from "./ATI";

class App extends React.Component {
    render() {
        const entryFormUrl = "https://fs11.formsite.com/V9PQWO/8wbymhd8h7/index.html";
        const exitFormUrl = "https://fs11.formsite.com/V9PQWO/hnvnvvqayi/index.html";
        return (
            <div className="globalContainer">
                <div className="dashboard">
                    <div className="bodyWrapper">
                        <Router>
                            <Route exact path="/entryForm" component={ATI} />
                            <Route exact path="/" component={LandingPage} />
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
