import * as React from 'react';
import equal from 'fast-deep-equal'
import SingleHouse from '../SingleHouse';
import Loader from "../Loader";
import './index.css';
import WorkerIdContext from "../WorkerIdContext";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const CONSTRAINTS_URL = PROXY_URL + "https://cryptic-headland-35693.herokuapp.com/checkConstraints";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            house: {},
            constraintsCheck: false,
            isLoading: true,
            logs: []
        }
    }

    componentDidMount() {
        this.getHouse();
        let log = [new Date() + ": Search Result displayed to WorkerId: " + this.context];
        this.setState({ logs: this.state.logs.concat(log) });
    }

    componentDidUpdate(prevProps) {
        let log = [new Date() + ": Search Filters have been updated by WorkerId: " + this.context];
        if(!equal(this.props.filters, prevProps.filters)) {
            this.setState({isLoading: true})
            this.getHouse();
            this.setState({ logs: this.state.logs.concat(log) });
        }
    }

    setIntermediateLogs = (newLogs) => {
        let logs = this.state.logs;
        this.setState({logs: logs.concat(newLogs)});
        this.props.setLogs(this.state.logs);
    }

    async getHouse() {
        let log = [new Date() + ": Search Constraints are being checked for by WorkerId: " + this.context];
        await this.checkConstraints();
        log.push(new Date() + ": Search Constraints are " + this.state.constraintsCheck + " for WorkerId: " + this.context);

        if(this.state.constraintsCheck === "true") {
            this.setState({house: this.props.data.correctHouse})
            this.setState({isLoading: false})
            log.push(new Date() + ": Correct House with houseId " + this.props.data.correctHouse["_id"] + " given to WorkerId: " + this.context);
        }
        else {
            await this.getIncorrectHouses();
            log.push(new Date() + ": Incorrect House with houseId " + this.state.house["_id"] + " given to WorkerId: " + this.context);
        }
        this.setState({ logs: this.state.logs.concat(log) });
    }

    async checkConstraints() {
        const filters = this.props.filters;
        const requestBody = JSON.stringify({
            "inputConstraints": {
                "duration": {
                    "value": parseInt(filters.duration),
                    "unit": "mo"
                },
                "maxRent": parseInt(filters.maxRent),
                "typeOfAccomodation": filters.houseType,
                "nearSupermarkets": filters.supermarkets,
                "municipalityRegistration": filters.registration,
                "commuteTime": parseInt(filters.maxCommuteTime)
            },
            "sid": this.props.data.id
        });
        await fetch(CONSTRAINTS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: requestBody
            })
            .then(response => response.text())
            .then((response) => {
                this.setState({constraintsCheck: response})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async getIncorrectHouses() {
        const INCORRECTHOUSES_URL = PROXY_URL + `https://cryptic-headland-35693.herokuapp.com/getIncorrectHouses?hid=${this.props.data.correctHouse["_id"]}`;
        await fetch(INCORRECTHOUSES_URL, { method: "GET" })
            .then(response => response.json())
            .then ((response) => {
                const incorrectHouseNumber = Math.floor(Math.random() * response.length);
                this.setState({house: response[incorrectHouseNumber]});
                this.setState({isLoading: false});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            this.state.isLoading ?
                <Loader />
                :
            <div className="searchForm">
                <div className="resultTable">
                    <div className="resultBody">
                        <div className="resultsList">
                            <div className="nohouses">
                                <h2>Select A House To Proceed!</h2>
                                <span>Click on the house to see additional information</span>
                            </div>
                            <div className="row">
                                {this.state.house ? (
                                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                            <SingleHouse house={this.state.house} logs={this.state.logs} setLogs={this.setIntermediateLogs}/>
                                        </div>
                                    )
                                    :
                                    <span className="nohouses">
                            <h1>Sorry, there are no houses matching your requirements.</h1>
                        </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchResults.contextType = WorkerIdContext;

export default SearchResults;