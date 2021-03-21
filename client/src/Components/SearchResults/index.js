import * as React from 'react';
import equal from 'fast-deep-equal';
import { Button, CardDeck, Form, Row } from "react-bootstrap";
import SingleHouse from '../SingleHouse';
import Loader from "../Loader";
import './index.css';
import WorkerIdContext from "../WorkerIdContext";

const PROXY_URL = `https://infinite-plateau-04823.herokuapp.com/`;
const CONSTRAINTS_URL = PROXY_URL + "https://cryptic-headland-35693.herokuapp.com/checkConstraints";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            house: {},
            constraintsCheck: false,
            loading: true,
            showAllHouses: false,
            incorrectHousesList: []
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
        await this.getIncorrectHouses();  
        if (this.state.constraintsCheck === "true" && this.context.scenarioType === 1) {
            this.setState({house: this.props.scenario.correctHouse})
            window.myLogger.info(new Date() + ": Correct House with houseId " + this.props.scenario.correctHouse["_id"] + " given to WorkerId: " + this.context.workerId);
        }
        else {
            const incorrectHouseNumber = Math.floor(Math.random() * this.state.incorrectHousesList.length);
            this.setState({ house: this.state.incorrectHousesList[incorrectHouseNumber]});
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
                this.setState({
                    incorrectHousesList: response,
                    isLoading: false
                });
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
                <div className="house-heading">
                    <h2>Select A House To Proceed!</h2>
                </div>
                <div className="row">
                    <CardDeck>
                        <SingleHouse house={this.state.house} resetFilter={this.props.resetFilter}/>
                        {
                            this.state.showAllHouses &&
                                this.state.incorrectHousesList.map(house => {
                                    return(
                                        <SingleHouse house={house} key={house["_id"]} resetFilter={this.props.resetFilter}/>
                                    )
                                })
                        }
                    </CardDeck>
                </div>
                <Form.Group as={Row}>
                    <Button variant="danger" onClick={() => this.setState({showAllHouses: !this.state.showAllHouses})}>
                        {
                            !this.state.showAllHouses ?
                                "Show all available houses"
                            :
                                "Show initial house"
                        }
                    </Button>
                </Form.Group>
            </div>
        );
    }
}

SearchResults.contextType = WorkerIdContext;

export default SearchResults;