import React, { useEffect, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Loader from "../Loader";
import Scenarios from "../Scenarios";
import './index.css';

function LandingPage() {
    let attentionCheckName;
    const [validated, setValidated] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)

    const sid = Math.floor(Math.random() * 3) + 1;
    const PROXY_URL = `https://cors-anywhere.herokuapp.com/`;
    const URL = PROXY_URL + `https://cryptic-headland-35693.herokuapp.com/getScenarioAndHouse?sid=${sid}`;

    async function getScenario() {
        try {
            let response = await fetch(URL, {method: "GET",
                headers: {
                "Access-Control-Allow-Origin": "*"
                }});
            response = await response.json();
            setData(response);
            setLoading(false);
        }
        catch(e) {
            console.log(e)
        }
    }

    useEffect( () => {
        getScenario()
    }, []);

    const handleSubmit = (event) => {
        if (!attentionCheckName || (attentionCheckName.toLowerCase() !== data.scenarioName.toLowerCase())) {
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
        loading ?
        <Loader />
        :
        <div className={"landingPageContainer"}>
            <div className="header">
                <h1>Find Your Perfect House</h1>
            </div>
            <div className={"contentWrapper"}>
                <Scenarios scenarioItem={data.description}/>
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
                                state: data
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
