import React, { useState } from 'react';
import './index.css';
import { Button, Form} from "react-bootstrap";
import scenariosData from '../../Data/scenarios.json';
import Scenarios from "../Scenarios";
import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";

function LandingPage(props) {
    const [validated, setValidated] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const scenarioItem = scenariosData[0];
    let attentionCheckName;

    const handleSubmit = (event) => {
        if (attentionCheckName.toLowerCase() !== scenarioItem.scenarioName) {
            event.preventDefault();
            event.stopPropagation();
            setErrorState(true);
            setValidated(false);
        }
        else {
            setValidated(true);
        }
    };

    return (
        <div className={"landingPageContainer"}>
            <div className={"contentWrapper"}>
                <Scenarios scenarioItem={scenarioItem}/>
                <div className={"attentionCheckWrapper"}>
                    <Form noValidate validated={validated} className={"form-group attention-check"} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>What is the name assigned to you in the above scenario?</Form.Label>
                            <Form.Control
                                required type={"text"}
                                placeholder={"Enter Name"}
                                isInvalid={errorState}
                                onChange={(e) => attentionCheckName = e.target.value}
                            />
                            { errorState &&
                                <Form.Control.Feedback
                                    type={"invalid"}>
                                    Please enter the correct name.
                                </Form.Control.Feedback>}
                        </Form.Group>
                        <div className="proceed-wrapper">
                            <Link to="/search" onClick={handleSubmit}>
                                <Button type={"submit"} size="lg" className="btn btn-green">
                                    Proceed <FaArrowRight className={"FaArrowRight"}/>
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
