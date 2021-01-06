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
            loading: true
        }
    }

    componentDidMount() {
        Promise.all([this.getHouse()]).then(() => {
            this.setState({
                loading: false
            });
        });
        window.myLogger.info(new Date() + ": Search Result displayed to WorkerId: " + this.context.workerId);
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.filters, prevProps.filters)) {
            window.myLogger.info(new Date() + ": Search Filters have been updated by WorkerId: " + this.context.workerId);
            this.setState({isLoading: true})
            Promise.all([this.getHouse()]).then(() => {
                this.setState({
                    loading: false
                });
            });
        }
    }

    async getHouse() {
        window.myLogger.info(new Date() + ": Search Constraints are being checked for by WorkerId: " + this.context.workerId);
        await this.checkConstraints();
        window.myLogger.info(new Date() + ": Search Constraints are " + this.state.constraintsCheck + " for WorkerId: " + this.context.workerId);

        if(this.state.constraintsCheck === "true") {
            this.setState({house: this.props.scenario.correctHouse})
            window.myLogger.info(new Date() + ": Correct House with houseId " + this.props.scenario.correctHouse["_id"] + " given to WorkerId: " + this.context.workerId);
        }
        else {
            await this.getIncorrectHouses();
            window.myLogger.info(new Date() + ": Incorrect House with houseId " + this.state.house["_id"] + " given to WorkerId: " + this.context.workerId);
        }
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
            "sid": this.props.scenario.id
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
                window.myLogger.error(error)
            })
    }

    async getIncorrectHouses() {
        const INCORRECTHOUSES_URL = PROXY_URL + `https://cryptic-headland-35693.herokuapp.com/getIncorrectHouses?hid=${this.props.scenario.correctHouse["_id"]}`;
        await fetch(INCORRECTHOUSES_URL, { method: "GET" })
            .then(response => response.json())
            .then ((response) => {
                const incorrectHouseNumber = Math.floor(Math.random() * response.length);
                this.setState({house: response[incorrectHouseNumber]});
                this.setState({isLoading: false});
            })
            .catch((error) => {
                window.myLogger.error(error);
            })
    }

    render() {
        return (
            this.state.loading ?
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
                                            <SingleHouse house={this.state.house} />
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