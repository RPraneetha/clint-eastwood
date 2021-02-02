import React from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Loader from "../Loader";
import Scenarios from "../Scenarios";
import WorkerIdContext from "../WorkerIdContext";
import './index.css';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attentionCheckName: "",
            validated: false,
            errorState: false,
            scenario: {},
            loading: true

        }
    }

    componentDidMount() {
        Promise.all([ this.getScenario() ]).then(() => {
            this.setState({
                loading: false
            });
        });
        window.myLogger.info(new Date() + ": Attention check started by WorkerId: " + this.context.workerId);
    }

    async getScenario() {
        const PROXY_URL = `https://infinite-plateau-04823.herokuapp.com/`;
        const URL = PROXY_URL + `https://cryptic-headland-35693.herokuapp.com/getScenarioAndHouse?sid=${this.context.scenarioId}`;
        try {
            let response = await fetch(URL, {method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }});
            response = await response.json();
            this.setState({scenario: response, loading: false})
        }
        catch(e) {
            window.myLogger.error(await JSON.stringify(e))
        }
    }

    handleSubmit = (event) => {
        if (!this.state.attentionCheckName || (this.state.attentionCheckName.toLowerCase() !== this.state.scenario.scenarioName.toLowerCase())) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({errorState: true, validated: false})

            window.myLogger.info(new Date() + ": Attention check failed by WorkerId: " + this.context.workerId);
        }
        else {
            window.myLogger.info(new Date() + ": Attention check passed by WorkerId: " + this.context.workerId);
            this.setState({validated: true})
        }
    };

    render() {
        return (
            this.state.loading ?
                <Loader />
                :
                <div className={"landingPageContainer"}>
                    <div className="header">
                        <h1>Find Your Perfect House</h1>
                    </div>
                    <div className={"contentWrapper"}>
                        <Scenarios scenarioItem={this.state.scenario.description}/>
                        <div className={"attentionCheckWrapper"}>
                            <Form noValidate validated={this.state.validated} className={"form-group attention-check"} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>What is the name assigned to you in the above scenario?</Form.Label>
                                    <Form.Control
                                        required type={"text"}
                                        placeholder={"Enter Name"}
                                        isInvalid={this.state.errorState}
                                        onChange={(e) => this.setState({attentionCheckName: e.target.value})}
                                    />
                                    { this.state.errorState &&
                                    <Form.Control.Feedback
                                        type={"invalid"}>
                                        Please enter the correct name.
                                    </Form.Control.Feedback>
                                    }
                                </Form.Group>
                                <div className="proceed-wrapper">
                                    <Link to={{
                                        pathname: "/search",
                                        state: this.state.scenario
                                    }}
                                          onClick={this.handleSubmit}>
                                        <Button type={"submit"} size="lg" className="btn-green btn">
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
}

LandingPage.contextType = WorkerIdContext;

export default LandingPage;
