import * as React from 'react';
import {times} from 'lodash';
import './index.css';
import { Button, Col, InputGroup, Form, FormControl, Row } from "react-bootstrap";
import SearchResults from "../SearchResults";
import Scenarios from "../Scenarios";

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters : {
                "duration": -1,
                "maxRent": -1,
                "houseType": -1,
                "interiorType": -1,
                "supermarkets": -1,
                "university": -1,
                "dutch": -1,
                "registration": -1,
                "couples": -1,
                "pets": -1
            },
            displayFormElements: [
                <Form.Group controlId="houseType" className={"form-control-select"}>
                    <Form.Control as="select" onChange={this.handleInputChange}>
                        <option selected={true} value={-1}>House Type</option>
                        <option key="studio">Studio</option>
                        <option key="apartment">Apartment</option>
                        <option key="private-room">Private room</option>
                        <option key="shared-room">Shared room</option>
                    </Form.Control>
                </Form.Group>
            ],
            formElementIndex: 0,
            isSubmitted: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        let filters = this.state.filters;
        filters[target.id] = target.type === "checkbox" ? target.checked : target.value;
        this.setState(filters)
    }

    formSubmitHandler = () => {
        this.setState({isSubmitted: true})
    }

    displayNewElement = (formElement) => {
        let formElements = this.state.displayFormElements;
        formElements.push(formElement)
        this.setState({displayFormElements: formElements});
        this.setState({formElementIndex: this.state.formElementIndex + 1})
    }

    render() {
        const scenarioItem = this.props.history.location.state;

        const formElements = [
            <Form.Group controlId="duration" className={"form-control-select"}>
                <Form.Control as="select"  onChange={this.handleInputChange}>
                    <option selected={true} value={-1}>Duration (in months)</option>\n
                    {times(24, i => <option key={i}>{i + 1}</option>)}
                </Form.Control>
            </Form.Group>,
            <Form.Group controlId="rent" className={"form-control-select"}>
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
                        id={"rent"}
                        className="form-control price"
                        type="number"
                        placeholder="Max. Rent"
                        aria-label="Max. Rent"
                        onChange={this.handleInputChange}
                        min={0}
                    />
                </InputGroup>
            </Form.Group>,
            <Form.Group controlId="interiorType" className={"form-control-select"}>
                <Form.Control as="select"  onChange={this.handleInputChange}>
                    <option selected={true} value={-1}>Interior Type</option>
                    <option key="furnished">Furnished</option>
                    <option key="unfurnished">Unfurnished</option>
                    <option key="upholstered">Upholstered</option>
                </Form.Control>
            </Form.Group>,
            <Form.Group as={Row} className={"form-group-checkbox"}>
                <Col sm={20}>
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
                        id="university"
                        label="Proximity to University"
                    />
                </Col>
                <Col sm={20}>
                    <Form.Check
                        onChange={this.handleInputChange}
                        custom
                        inline
                        className={"custom-checkbox"}
                        type="checkbox"
                        id="pets"
                        label="Pets allowed"
                    />
                    <Form.Check
                        onChange={this.handleInputChange}
                        custom
                        inline
                        className={"custom-checkbox"}
                        type="checkbox"
                        id="dutch"
                        label="Dutch speaking"
                    />
                </Col>
                <Col sm={20}>
                    <Form.Check
                        onChange={this.handleInputChange}
                        custom
                        inline
                        className={"custom-checkbox"}
                        type="checkbox"
                        id="registration"
                        label="Registration allowed"
                    />
                    <Form.Check
                        onChange={this.handleInputChange}
                        custom
                        inline
                        className={"custom-checkbox"}
                        type="checkbox"
                        id="couples"
                        label="Suitable for couples"
                    />
                </Col>
            </Form.Group>
        ];

        return (
            <div className="contentWrapper">
                <div className="header">
                    <h1>Find Your Perfect House</h1>
                </div>
                <div className="selectBarWrapper">
                    {/*<Scenarios scenarioItem={scenarioItem} />*/}
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
                            <SearchResults filters={this.state.filters}/>
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