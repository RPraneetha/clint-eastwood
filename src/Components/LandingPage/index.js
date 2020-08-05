import React, { useState } from 'react';
import './index.css';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import scenariosData from '../../Data/scenarios.json';
import Scenarios from "../Scenarios";

function LandingPage(props) {
    const [validated, setValidated] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [scenario, setScenario] = useState(scenariosData[0]);
    let attentionCheckName;

    const handleSubmit = (event) => {
        if (!attentionCheckName || (attentionCheckName.toLowerCase() !== scenario.scenarioName)) {
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
            <div className="header">
                <h1>Find Your Perfect House</h1>
            </div>
            <div className={"contentWrapper"}>
                <Scenarios scenarioItem={scenario}/>
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
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        <div className="proceed-wrapper">
                            <Link to={{
                                pathname: "/search",
                                state: scenario
                            }}
                                onClick={handleSubmit}>
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
