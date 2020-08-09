import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import SearchPage from "./SearchPage";
import ResQue from "./ResQue";
import ATI from "./ATI";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerIdContext from "./WorkerIdContext";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logs : []
        };
        this.setLogs = this.setLogs.bind(this)
    }

    componentDidMount() {
        let logs = this.state.logs;
        logs.push(new Date() + ": Session started by WorkerId: " +this.context)
        this.setState({logs: logs})
    }

    setLogs = newLogs => {
        console.log(newLogs)
        let logs = this.state.logs;
        this.setState({logs: logs.concat(newLogs)})
        console.log(this.state.logs)
    }

    render() {
        return (
                <div className="globalContainer">
                    <div className="dashboard">
                        <div className="bodyWrapper">
                            <Router>
                                <Route exact path="/" render={(props) => <ATI {...props} callbackFromParents= {this.setLogs} />} />
                                <Route exact path="/land" render={(props) => <LandingPage {...props} callbackFromParents= {this.setLogs} />} />
                                <Route exact path="/search" render={(props) => <SearchPage {...props} callbackFromParents= {this.setLogs} />} />
                                <Route exact path="/exitForm" render={(props) => <ResQue {...props} callbackFromParents= {this.setLogs} />} />
                            </Router>
                        </div>
                    </div>
                </div>
        );
    }
}

App.contextType = WorkerIdContext;

export default App;
