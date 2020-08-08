import * as React from 'react';
import {times} from 'lodash';
import { Button, Col, InputGroup, Form, FormControl, Row } from "react-bootstrap";
import SearchResults from "../SearchResults";
import Scenarios from "../Scenarios";
import './index.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters : {},
            displayFormElements: [
                <Form.Group controlId="houseType" className={"form-control-select"}>
                    <Form.Control as="select" onChange={this.handleInputChange}>
                        <option selected={true} value={-1}>House Type</option>
                        <option key="studio">Studio</option>
                        <option key="apartment">Apartment</option>
                        <option key="private-room">Private room</option>
                        <option key="shared-room">Sharing</option>
                    </Form.Control>
                </Form.Group>
            ],
            formElementIndex: 0,
            isSubmitted: false
        }
        this.filters = {
            "duration": -1,
            "maxRent": -1,
            "houseType": -1,
            "supermarkets": false,
            "maxCommuteTime": -1,
            "registration": false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.filters[target.id] = target.type === "checkbox" ? target.checked : target.value;
        this.setState({isSubmitted: false}) //When user comes back to the search after submitting, state needs to be reversed
    }

    formSubmitHandler = () => {
        this.setState({filters: this.filters})
        this.setState({isSubmitted: true})
    }

    displayNewElement = (formElement) => {
        let formElements = this.state.displayFormElements;
        formElements.push(formElement)
        this.setState({displayFormElements: formElements});
        this.setState({formElementIndex: this.state.formElementIndex + 1})
        this.setState({isSubmitted: false})
    }

    render() {
        const data = this.props.history.location.state;
        const scenarioItem = data.description;

        const formElements = [
            <Form.Group controlId="duration" className={"form-control-select"}>
                <Form.Control as="select"  onChange={this.handleInputChange}>
                    <option selected={true} value={-1}>Duration (in months)</option>\n
                    {times(24, i => <option key={i}>{i + 1}</option>)}
                </Form.Control>
            </Form.Group>,
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
                </InputGroup>
            </Form.Group>,
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
            </Form.Group>,
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
        ];

        return (
            <div className="contentWrapper">
                <div className="header">
                    <h1>Find Your Perfect House</h1>
                </div>
                <div className="selectBarWrapper">
                    <Scenarios scenarioItem={scenarioItem} />
                    <Form className="search-panel">
                        {
                            this.state.displayFormElements.map((formElement) => {
                                return formElement;
                            })
                        }
                        <Form.Group as={Row}>
                            {
                                this.state.formElementIndex <= formElements.length - 1 &&
                                <Col>
                                    <Button id={"add"} size={"md"} onClick={
                                        () => this.displayNewElement(formElements[this.state.formElementIndex])
                                    }>
                                        Add more constraints
                                    </Button>
                                </Col>
                            }
                            <Col>
                                <Button id={"submit"} size={"md"} onClick={this.formSubmitHandler}>
                                    Submit
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <div className="searchPageWrapper">
                    {this.state.isSubmitted ? (
                            <SearchResults filters={this.state.filters} data={data}/>
                        )
                        :
                        (
                            <div className="searchForm">
                                <div className="resultTable">
                                    <div className="requirements">
                                        <h1>Please Enter Your Requirements to Find Your Perfect House!</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default SearchPage;