import React from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { concat } from "lodash";
import Loader from "../Loader";
import Scenarios from "../Scenarios";
import WorkerIdContext from "../WorkerIdContext";
import './index.css';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attentionCheckName: "",
            logs: [],
            validated: false,
            errorState: false,
            data: {},
            loading: true

        }
    }

    componentDidMount() {
        this.getScenario();
        let log = [new Date() + ": Scenario started by WorkerId: " + this.context];
        this.setState({logs: concat(this.state.logs, log)});
    }

    componentWillUnmount() {
        this.props.callbackFromParents(this.state.logs);
    }

    async getScenario() {
        const sid = Math.floor(Math.random() * 3) + 1;
        const PROXY_URL = `https://cors-anywhere.herokuapp.com/`;
        const URL = PROXY_URL + `https://cryptic-headland-35693.herokuapp.com/getScenarioAndHouse?sid=${sid}`;
        try {
            let response = await fetch(URL, {method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }});
            response = await response.json();
            this.setState({data: response, loading: false})
        }
        catch(e) {
            console.log(await JSON.stringify(e))
        }
    }

    handleSubmit = (event) => {
        if (!this.state.attentionCheckName || (this.state.attentionCheckName.toLowerCase() !== this.state.data.scenarioName.toLowerCase())) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({errorState: true, validated: false})

            let log = [new Date() + ": Attention Check failed by WorkerId: " + this.context];
            this.setState({logs: concat(this.state.logs, log)})
        }
        else {
            let log = [new Date() + ": Attention Check passed by WorkerId: " + this.context];
            this.setState({logs: concat(this.state.logs, log)})
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
                        <Scenarios scenarioItem={this.state.data.description}/>
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
                                        state: this.state.data
                                    }}
                                          onClick={this.handleSubmit}>
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
}

LandingPage.contextType = WorkerIdContext;

export default LandingPage;
