import * as React from 'react';
import {times} from 'lodash';
import './index.css';
import { Button, Col, InputGroup, Form, FormControl, Row } from "react-bootstrap";
import SearchResults from "../SearchResults";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters : {
        "duration": 0,
        "maxRent": 9999999,
        "houseType": null,
        "interiorType": null,
        "supermarkets": false,
        "uni": false,
        "dutch": false,
        "registration": false,
        "couples": false,
        "pets": false
      },
      isSubmitted: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let filters = this.state.filters;
    filters[target.id] = target.type === "checkbox" ? target.checked : target.value;
    this.setState(filters)
  }

  formSubmitHandler() {
    this.setState({isSubmitted: true})
  }

  render() {
    return (
        <div className="contentWrapper">
          <div className="selectBarWrapper">
            <div className="search-panel">
              <Form className="form-inline">
                <Form.Group controlId="duration" className={"form-control-select"}>
                  <Form.Control as="select"  onChange={this.handleInputChange}>
                    <option selected={true} disabled="disabled">Duration (in months)</option>
                    {times(24, i => <option key={i}>{i + 1}</option>)}
                  </Form.Control>
                </Form.Group>
                <div className="form-group">
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
                </div>
                <Form.Group controlId="houseType" className={"form-control-select"}>
                  <Form.Control as="select" onChange={this.handleInputChange}>
                    <option selected={true} disabled="disabled">House Type</option>
                    <option key="studio">Studio</option>
                    <option key="apartment">Apartment</option>
                    <option key="private-room">Private room</option>
                    <option key="shared-room">Shared room</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="interiorType" className={"form-control-select"}>
                  <Form.Control as="select"  onChange={this.handleInputChange}>
                    <option selected={true} disabled="disabled">Interior Type</option>
                    <option key="furnished">Furnished</option>
                    <option key="unfurnished">Unfurnished</option>
                    <option key="upholstered">Upholstered</option>
                  </Form.Control>
                </Form.Group>
                <div className={"form-group-checkbox"}>
                  <Form.Group as={Row}>
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
                          id="uni"
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
                </div>
                <div className="form-group">
                  <Button id={"submit"} size={"lg"} onClick={this.formSubmitHandler}>
                    Search
                  </Button>
                </div>
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
        </div>
    );
  }
}

export default SearchPage;