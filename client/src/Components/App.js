import React from 'react';
import log4javascript from 'log4javascript';
import { HashRouter as Router, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import SearchPage from "./SearchPage";
import ResQue from "./ResQue";
import ATI from "./ATI";
import Loader from "./Loader";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerIdContext from "./WorkerIdContext";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            logger: null,
            loggerUpdated: false,
            scenarioIds: {},
            error: false
        }
    }

    componentDidMount() {
        window.myLogger = log4javascript.getLogger();
        // const ajaxAppender = new log4javascript.AjaxAppender("/storeLogs");
        const ajaxAppender = new log4javascript.AjaxAppender("http://localhost:9000/storeLogs");
        ajaxAppender.setBatchSize(50); // send in batches of 10
        ajaxAppender.setSendAllOnUnload(true); // send all remaining messages on window.beforeunload()
        window.myLogger.addAppender(ajaxAppender);

        window.onerror = function(message, url, lineNumber) {
            const errorMsg = "Console error - " + url + " : " + lineNumber + ": " + message;
            window.myLogger.error(errorMsg);
            return true;
        };

        window.myLogger.info(new Date() + ": Session started by WorkerId: " + this.context.workerId);
        this.setState({ logger: window.myLogger, loading: false })
    }

    render() {
        return (
                <div className="globalContainer">
                    <div className="dashboard">
                        <div className="bodyWrapper">
                            <Router>
                                {this.state.loading ?
                                    <Loader/>
                                    :
                                    <Route exact path="/" render={(props) => <ATI {...props} logger={this.state.logger}  />} />
                                }
                                <Route exact path="/land" render={(props) => <LandingPage {...props} />} />
                                <Route exact path="/search" render={(props) => <SearchPage {...props} logger={this.state.logger} />} />
                                <Route exact path="/exitForm" render={(props) => <ResQue {...props} />} />
                            </Router>
                        </div>
                    </div>
                </div>
        );
    }
}

App.contextType = WorkerIdContext;

export default App;