import React from 'react';
import log4javascript from 'log4javascript';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import LandingPage from "./LandingPage";
import SearchPage from "./SearchPage";
import ResQue from "./ResQue";
import ATI from "./ATI";
import Loader from "./Loader";
import ThankYou from "./ThankYou";
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
        const ajaxAppender = new log4javascript.AjaxAppender("/storeLogs");
        ajaxAppender.setBatchSize(10); // send in batches of 10
        ajaxAppender.setSendAllOnUnload(true); // send all remaining messages on window.beforeunload()
        window.myLogger.addAppender(ajaxAppender);

        window.onerror = function(message, url, lineNumber) {
            const errorMsg = "Console error - " + url + " : " + lineNumber + ": " + message;
            window.myLogger.error(errorMsg);
            return true;
        };

        window.myLogger.info(new Date() + ": Session started by WorkerId: " + this.context.workerId +
                            " With condition: " + this.context.condition + " and at Stage: " + this.context.stage);
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
                                    this.context.stage === "1" ?
                                        <Route exact path="/" render={(props) => <ATI {...props} logger={this.state.logger}  />} />
                                    :
                                        <Redirect to="/land" push />

                                }
                                <Route exact path="/land" render={(props) => <LandingPage {...props} />} />
                                <Route exact path="/search" render={(props) => <SearchPage {...props} logger={this.state.logger} />} />
                                <Route exact path="/exitForm" render={(props) => <ResQue {...props} logger={this.state.logger} />} />
                                <Route exact path="/ty" render={(props) => <ThankYou {...props} />} />
                            </Router>
                        </div>
                    </div>
                </div>
        );
    }
}

App.contextType = WorkerIdContext;

export default App;
