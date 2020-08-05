import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./LandingPage";
import {HashRouter as Router, Route} from 'react-router-dom';
import Form from "./Form";
import SearchPage from "./SearchPage";

class App extends React.Component {
    render() {
        const entryFormUrl = "https://fs11.formsite.com/V9PQWO/8wbymhd8h7/index.html";
        const exitFormUrl = "https://fs11.formsite.com/V9PQWO/hnvnvvqayi/index.html";
        return (
            <div className="globalContainer">
                <div className="dashboard">
                    <div className="bodyWrapper">
                        <Router>
                            {/*<Route exact path="/" render={(props) => <Form {...props} url={entryFormUrl} />} />*/}
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/search" component={SearchPage} />
                            {/*<Route exact path="/exitForm" render={(props) => <Form {...props} url={exitFormUrl} />}  />*/}
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
