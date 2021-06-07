import * as React from 'react';
import {times} from 'lodash';
import { Button, Col, InputGroup, Form, FormControl, Row } from "react-bootstrap";
import SearchResults from "../SearchResults";
import Scenarios from "../Scenarios";
import './index.css';
import WorkerIdContext from "../WorkerIdContext";
import Loader from "../Loader";

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters : {
                "duration": -1,
                "maxRent": -1,
                "houseType": -1,
                "supermarkets": false,
                "maxCommuteTime": -1,
                "registration": false
            },
            addPreferences: false,
            formElementIndex: 0,
            isSubmitted: false,
            loading: true
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.logger.info(new Date() + ": Search Page started by WorkerId: " + this.context.workerId)
        setTimeout(function() {
            this.setState({ loading: false })
        }.bind(this), 2000)
    }

    handleInputChange = (event) => {
        const target = event.target;
        let filters = Object.assign({}, this.state.filters);
        filters[target.id] = target.type === "checkbox" ? target.checked : target.value;
        console.log("filters", filters, target.id, filters[target.id])
        this.setState({filters}, function (){
            this.props.logger.info(new Date() + ": " + target.id + " set to " + filters[target.id] + " on Search Page started by WorkerId: " + this.context.workerId)
            console.log(this.state.filters)
            this.setState({ isSubmitted: false}) //When user comes back to the search after submitting, state needs to be reversed
        });
    }

    formSubmitHandler = () => {
        this.props.logger.info(new Date() + ": Form on Search Page submitted by WorkerId: " + this.context.workerId)
        this.props.logger.info(new Date() + ": WorkerId: " + this.context.workerId + " Constraints List")
        for (const [key, value] of Object.entries(this.state.filters)) {
            this.props.logger.info(new Date() + ": WorkerId: " + this.context.workerId + " Constraints List Filter " + `${key}: ${value}`);
        }
        this.setState({isSubmitted: true})
    }

    resetFilter = () => {
        this.formRef.current.reset();
        window.myLogger.info(new Date() + ": Search Filters have been reset by WorkerId: " + this.context.workerId);
        this.setState({addPreferences: false, isSubmitted: false});
    }

    render() {
        return (
            this.state.loading ?
                <Loader/>
                :
                <div className="contentWrapper">
                    <div className="header">
                        <h1>Find Your House</h1>
                    </div>
                    <div className="selectBarWrapper">
                        <Scenarios scenarioItem={this.props.history.location.state.description} />
                        <div className="requirements">
                            <h2>Please Enter Your Requirements to Find Your House!</h2>
                        </div>
                        <Form ref={this.formRef} className="search-panel">
                            <Form.Group controlId="houseType" className={"form-control-select"}>
                                <Form.Control as="select" onChange={this.handleInputChange}>
                                    <option selected={true} value={-1}>House Type</option>
                                    <option key="studio">Studio</option>
                                    <option key="apartment">Apartment</option>
                                    <option key="private-room">Private room</option>
                                    <option key="shared-room">Sharing</option>
                                </Form.Control>
                            </Form.Group>
                            {
                                this.state.addPreferences &&
                                <React.Fragment>
                                    <Form.Group controlId="duration" className={"form-control-select"}>
                                        <Form.Control as="select"  onChange={this.handleInputChange}>
                                            <option selected={true} value={-1}>Duration (in months)</option>\n
                                            {times(24, i => <option key={i}>{i + 1}</option>)}
                                        </Form.Control>
                                        <span className={"optional"}>Optional</span>
                                    </Form.Group>
                                    <Form.Group controlId="maxRent" className={"form-control-select"}>
                                        <InputGroup className="input-group">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text
                                                    id="basic-addon1"
                                                    className="input-group-addon"
                                                >
                                                    €
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                id={"maxRent"}
                                                className="form-control price"
                                                type="number"
                                                placeholder="Max. Rent"
                                                aria-label="Max. Rent"
                                                onChange={this.handleInputChange}
                                                min={0}
                                            />
                                            <span className={"optional"}>Optional</span>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="maxCommuteTime" className={"form-control-select"}>
                                        <InputGroup className="input-group">
                                            <FormControl
                                                id={"maxCommuteTime"}
                                                className="form-control"
                                                type="number"
                                                placeholder="Max. Commute Time"
                                                aria-label="Max. Commute Time"
                                                onChange={this.handleInputChange}
                                                min={0}
                                            />
                                        </InputGroup>
                                        <span className={"optional"}>Optional</span>
                                    </Form.Group>
                                    <Form.Group as={Row} className={"form-group-checkbox"}>
                                        <Form.Check
                                            onChange={this.handleInputChange}
                                            custom
                                            inline
                                            className={"custom-checkbox"}
                                            type="checkbox"
                                            id="supermarkets"
                                            label="Proximity to supermarkets"
                                        />
                                        <Form.Check
                                            onChange={this.handleInputChange}
                                            custom
                                            inline
                                            className={"custom-checkbox"}
                                            type="checkbox"
                                            id="registration"
                                            label="Registration allowed"
                                        />
                                    </Form.Group>
                                </React.Fragment>
                            }
                            <Form.Group as={Row}>
                                {
                                    !this.state.addPreferences &&
                                    <Col>
                                        <Button className={"search"} id={"add"} size={"md"} onClick={
                                            () => {
                                                this.props.logger.info(new Date() + ": New Element on Search Page displayed by WorkerId: " + this.context.workerId)
                                                this.setState({addPreferences: true})
                                            }
                                        }>
                                            Add more filters
                                        </Button>
                                    </Col>
                                }
                                <Col>
                                    <Button id={"submit"} size={"md"} onClick={this.formSubmitHandler}>
                                        Submit preferences
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="searchPageWrapper">
                        {this.state.isSubmitted && (
                                <SearchResults
                                    filters={this.state.filters}
                                    scenario={this.props.history.location.state}
                                    resetFilter={this.resetFilter}/>
                            )}
                    </div>
                </div>
        );
    }
}

SearchPage.contextType = WorkerIdContext;

export default SearchPage;